const express = require("express");
const puppeteer = require("puppeteer");
const axios = require("axios");
const cheerio = require("cheerio");
const cron = require("node-cron");

const app = express();
const PORT = process.env.PORT || 3000;

let cachedJP = [];
let cachedEN = [];

async function fetchFreeProxy() {
  try {
    const { data } = await axios.get("https://free-proxy-list.net/");
    const $ = cheerio.load(data);
    const proxies = [];

    $("#proxylisttable tbody tr").each((_, el) => {
      const tds = $(el).find("td");
      const ip = $(tds[0]).text();
      const port = $(tds[1]).text();
      const https = $(tds[6]).text() === "yes";
      if (https) proxies.push(`${ip}:${port}`);
    });

    return proxies[Math.floor(Math.random() * proxies.length)];
  } catch (err) {
    console.error("Failed to fetch proxy:", err);
    return null;
  }
}

async function scrapeNews(language = "jp", proxy = null) {
  const url = `https://wutheringwaves.kurogames.com/${language}/main/news`;
  const launchOptions = {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  };

  if (proxy) launchOptions.args.push(`--proxy-server=${proxy}`);

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle0" });
  await page.waitForSelector("div.artical.show");

  const news = await page.$$eval("div.artical.show", (items) =>
    items.map((item) => {
      const title = item.querySelector("p.text")?.innerText.trim();
      const type = item.querySelector(".text-type")?.innerText.trim();
      const date = item.querySelector(".time-row")?.innerText.trim();
      return { title, type, date };
    })
  );

  await browser.close();
  return news;
}

cron.schedule("0 * * * *", async () => {
  console.log("[CRON] Updating cache...");
  const proxy = await fetchFreeProxy();
  cachedJP = await scrapeNews("jp", proxy);
  cachedEN = await scrapeNews("en", proxy);
  console.log(`[OK] JP: ${cachedJP.length}, EN: ${cachedEN.length}`);
});

(async () => {
  const proxy = await fetchFreeProxy();
  cachedJP = await scrapeNews("jp", proxy);
  cachedEN = await scrapeNews("en", proxy);
})();

app.get("/api/news", (req, res) => {
  res.json({
    status: "cached",
    language: "jp",
    updated: new Date().toISOString(),
    count: cachedJP.length,
    news: cachedJP,
  });
});

app.get("/api/news/en", (req, res) => {
  res.json({
    status: "cached",
    language: "en",
    updated: new Date().toISOString(),
    count: cachedEN.length,
    news: cachedEN,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API server ready: http://localhost:${PORT}`);
});

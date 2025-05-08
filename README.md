# Wuthering News API

A lightweight REST API that periodically scrapes official news for [Wuthering Waves](https://wutheringwaves.kurogames.com) (鳴潮), with support for both Japanese and English versions.

## 🌟 Features

- 📰 Fetches official news titles, categories, and dates
- 🌐 Supports Japanese and English news
- 🔁 Uses cached results updated every hour
- 🧩 Built with Node.js, Express, Puppeteer, and Proxy rotation
- 🚀 Ready for deployment on Railway, Render, or any Node.js host

---

## 📦 Installation

```bash
git clone https://github.com/your-username/wuthering-news-api.git
cd wuthering-news-api
npm install
node index.js
```

## 🔌 API Endpoints

| Route          | Description                  |
| -------------- | ---------------------------- |
| `/api/news`    | Returns cached Japanese news |
| `/api/news/en` | Returns cached English news  |

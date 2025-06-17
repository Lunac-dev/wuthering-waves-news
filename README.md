> [!IMPORTANT]
> The Railway hosting period has expired, so https://wuthering-waves-news.up.railway.app is no longer available. We apologize for the inconvenience and kindly ask that you host it yourself if needed.
# Wuthering News API

A lightweight REST API that periodically scrapes official news for [Wuthering Waves](https://wutheringwaves.kurogames.com) (鳴潮), with support for both Japanese and English versions.

## 🌟 Features

- 📰 Fetches official news titles, categories, and dates
- 🌐 Supports Japanese and English news
- 🔁 Uses cached results updated every hour
- 🧩 Built with Node.js, Express, Puppeteer, and Proxy rotation
- 🚀 Ready for deployment on Railway, Render, or any Node.js host

## 📦 Installation

```bash
git clone https://github.com/your-username/wuthering-news-api.git
cd wuthering-news-api
npm install
node index.js
```

## 🔌 API Endpoints

Base URL: https://wuthering-waves-news.up.railway.app

| Route          | Description                  |
| -------------- | ---------------------------- |
| `/api/news`    | Returns cached Japanese news |
| `/api/news/en` | Returns cached English news  |

## ⚠️ Disclaimer

This project is not affiliated with Kuro Games or Wuthering Waves.
Please use responsibly and in accordance with [wutheringwaves.kurogames.com](https://wutheringwaves.kurogames.com/)'s terms of service.

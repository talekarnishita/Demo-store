# Scrapy (web scraping)

Python Scrapy project for scraping data. Use it to feed Strapi (e.g. products from external sites) or for one-off data collection. See **docs/07-scrapy-integration.md** for BMAD-style context and Strapi integration.

## Setup

```bash
cd scraper
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## Run example spider

```bash
scrapy crawl example -o output.json
```

Output: `output.json` with scraped items. Example spider uses [quotes.toscrape.com](https://quotes.toscrape.com) (safe test site).

## Add a new spider

Create `scraper/spiders/your_spider.py`; keep one spider per file for context window. Run: `scrapy crawl your_spider -o out.json`.

## Optional: push to Strapi

See docs/07-scrapy-integration.md for a pipeline that POSTs items to Strapi. Set `STRAPI_URL` and `STRAPI_API_TOKEN` in env or in `scraper/settings.py`.

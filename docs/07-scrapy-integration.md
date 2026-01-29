# Scrapy Integration (web scraping)

## Role in the project

**Scrapy** is a Python framework for web scraping. In this repo it sits alongside:

- **Strapi** – content and API (you can push scraped data into Strapi as products or other content).
- **React + Vercel** – frontend; scraped data appears after it’s in Strapi (or another store).

Use Scrapy when you need to:

- Ingest products or content from external sites.
- Do one-off or scheduled scrapes and store results (e.g. in Strapi via API).

## Context window: keep Scrapy modular

- **One spider per file** in `scraper/scraper/spiders/` so Cursor can work on a single spider without loading the whole project.
- **Items** in `scraper/scraper/items.py` – define fields that match your use case (e.g. Strapi Product: name, slug, price, description).
- **Pipelines** in `scraper/scraper/pipelines.py` – post-process or send to Strapi (see below).

When asking Cursor to add or change a spider, open only:

- `docs/07-scrapy-integration.md` (this file)
- `scraper/scraper/spiders/` (or the specific spider file)

## Optional: push scraped items to Strapi

1. **Define item fields** to match Strapi (e.g. in `items.py`: `name`, `slug`, `price`, `description`).
2. **Add a pipeline** in `pipelines.py` that, for each item, calls Strapi:
   - `POST {STRAPI_URL}/api/products` with a valid API token in the `Authorization` header.
3. **Configure** `STRAPI_URL` and `STRAPI_API_TOKEN` in env or in `scraper/settings.py` (do not commit tokens).

Then run: `scrapy crawl your_spider` and items will be created in Strapi (add deduplication in the pipeline if needed).

## Where Scrapy lives

| Path | Purpose |
|------|--------|
| `scraper/scraper/spiders/` | One spider per file (context window). |
| `scraper/scraper/items.py` | Item models (shape of scraped data). |
| `scraper/scraper/pipelines.py` | Post-processing; optional Strapi POST. |
| `scraper/scraper/settings.py` | Crawl settings; optional Strapi URL/token. |

## Quick commands

```bash
cd scraper
source .venv/bin/activate
scrapy crawl example -o output.json
```

See **scraper/README.md** for setup and adding new spiders.

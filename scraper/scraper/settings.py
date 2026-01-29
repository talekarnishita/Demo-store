# Scrapy settings for scraper
# See https://docs.scrapy.org/en/stable/topics/settings.html

BOT_NAME = "scraper"
SPIDER_MODULES = ["scraper.spiders"]
NEWSPIDER_MODULE = "scraper.spiders"

ROBOTSTXT_OBEY = True
REQUEST_FINGERPRINTER_IMPLEMENTATION = "2.7"
TWISTED_REACTOR = "twisted.internet.asyncioreactor.AsyncioSelectorReactor"
FEED_EXPORT_ENCODING = "utf-8"

# Optional: send items to Strapi (set STRAPI_URL + API_TOKEN in env)
# STRAPI_URL = "http://localhost:1337"
# STRAPI_API_TOKEN = ""

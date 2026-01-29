# Define item models for scraped data
import scrapy


class ScraperItem(scrapy.Item):
    """Generic scraped item; extend for your use case (e.g. product-like fields for Strapi)."""
    title = scrapy.Field()
    url = scrapy.Field()
    content = scrapy.Field()
    # Add fields to match Strapi Product if you push to API: name, slug, price, description, etc.

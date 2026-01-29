"""
Example spider – scrapes quotes from quotes.toscrape.com (safe test site).
Run: scrapy crawl example -o output.json
"""
import scrapy
from scraper.items import ScraperItem


class ExampleSpider(scrapy.Spider):
    name = "example"
    allowed_domains = ["quotes.toscrape.com"]
    start_urls = ["https://quotes.toscrape.com/"]

    def parse(self, response):
        for quote in response.css("div.quote"):
            item = ScraperItem()
            item["title"] = quote.css("span.text::text").get()
            item["url"] = response.url
            item["content"] = quote.css("small.author::text").get()
            yield item

        next_page = response.css("li.next a::attr(href)").get()
        if next_page:
            yield response.follow(next_page, self.parse)

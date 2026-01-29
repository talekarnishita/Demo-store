# Pipelines: process items (e.g. dedupe, push to Strapi)
# See docs/07-scrapy-integration.md

class ScraperPipeline:
    def process_item(self, item, spider):
        return item

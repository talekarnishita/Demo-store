# Middlewares (optional)
# https://docs.scrapy.org/en/stable/topics/downloader-middleware.html

class ScraperMiddleware:
    def process_request(self, request, spider):
        return None

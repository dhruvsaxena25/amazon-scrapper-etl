# Amazon Scraping Pipelines

Two independent pipelines for scraping Amazon products:

## 1. URL Pipeline (url_pipeline.py)

Collects product URLs from Amazon search results.

### Usage:

```python
from url_pipeline import AmazonUrlScrapingPipeline

# Initialize and run
pipeline = AmazonUrlScrapingPipeline(
    search_terms=['laptop pc', 'wireless mouse'],
    target_links=[5, 3],  # 5 laptops, 3 mice
    headless=False
)

url_artifact = pipeline.run()
print(f"URLs saved to: {url_artifact.url_file_path}")
```

### Parameters:
- `search_terms`: list[str] or str - Product search terms
- `target_links`: int or list[int] - URLs to scrape per term (default: 5)
- `headless`: bool - Run browser in headless mode (default: False)
- `wait_timeout`: int - Element wait timeout in seconds (default: 5)
- `page_load_timeout`: int - Page load timeout in seconds (default: 15)

### Run standalone:
```bash
python url_pipeline.py
```

---

## 2. Product Pipeline (product_pipeline.py)

Scrapes detailed product information from a JSON file of URLs.

### Usage:

```python
from product_pipeline import AmazonProductScrapingPipeline

# Initialize with URL file path
pipeline = AmazonProductScrapingPipeline(
    url_file_path="Artifacts/2024_11_30_22_15_30/UrlData/urls.json",
    headless=False
)

product_artifact = pipeline.run()
print(f"Products saved to: {product_artifact.product_file_path}")
print(f"Success: {product_artifact.scraped_count}")
```

### Parameters:
- `url_file_path`: str or Path - Path to JSON file with URLs (required)
- `headless`: bool - Run browser in headless mode (default: False)
- `wait_timeout`: int - Element wait timeout in seconds (default: 10)
- `page_load_timeout`: int - Page load timeout in seconds (default: 20)

### Run standalone:
```bash
# Edit the url_file_path in main() first
python product_pipeline.py
```

---

## Complete Workflow

### Option 1: Run together programmatically

```python
from url_pipeline import AmazonUrlScrapingPipeline
from product_pipeline import AmazonProductScrapingPipeline

# Step 1: Scrape URLs
url_pipeline = AmazonUrlScrapingPipeline(
    search_terms=['gaming laptop', 'wireless keyboard'],
    target_links=[10, 5],
    headless=True
)
url_artifact = url_pipeline.run()

# Step 2: Scrape products using the URL file
product_pipeline = AmazonProductScrapingPipeline(
    url_file_path=url_artifact.url_file_path,
    headless=True
)
product_artifact = product_pipeline.run()

print(f"URLs: {url_artifact.url_file_path}")
print(f"Products: {product_artifact.product_file_path}")
```

### Option 2: Run independently

```bash
# Day 1: Collect URLs
python url_pipeline.py

# Output: URLs saved to: Artifacts/2024_11_30_22_15_30/UrlData/urls.json

# Day 2: Edit product_pipeline.py with the correct path, then run
python product_pipeline.py
```

---

## Output Structure

```
Artifacts/
└── <timestamp>/                    # Timestamp directory
    ├── UrlData/
    │   └── urls.json               # Product URLs
    └── ProductData/
        └── products.json           # Detailed product data
```

---

## Key Benefits

1. **Flexibility** - Run each pipeline independently
2. **Reusability** - Reuse URL files without re-scraping searches
3. **Error Recovery** - Retry failed stages without repeating successful ones
4. **Testing** - Test product scraping with sample URL files
5. **Scalability** - Deploy pipelines on different machines

---

## Requirements

Make sure your project has the following structure:

```
project/
Artifacts/
│   └── <timestamp_folder>/
│       (your generated artifact files here)

logs/
│   ├── *.log
│   └── (all your log files)

main.py

scrapper/
├── config/
│   ├── urls_locators.yaml
│   └── product_locators.yaml
├── constant/
│   └── configuration.py
├── entity/
│   ├── artifact_entity.py
│   ├── config_entity.py
│   ├── product_locator_entity.py
│   └── url_locator_entity.py
├── exception/
│   └── custom_exception.py
├── logger/
│   └── logging.py
├── pipeline/
│   ├── main_pipeline.py
│   ├── url_pipeline.py
│   └── prodcut_pipeline.py
├── router/
│   └── api.py
├── src/
│   ├── multi_product_scrapper.py
│   ├── multi_url_scrapper.py
│   └── url_scrapper.py
└── util/
    └── main_utils.py

```

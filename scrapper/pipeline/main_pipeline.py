import os
import sys
from pathlib import Path
from datetime import datetime

# Add the project root to the Python path
project_root = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(project_root))

from scrapper.entity.config_entity import DataConfig 
from scrapper.entity.artifact_entity import UrlDataArtifact, ProductDataArtifact
from scrapper.src.multi_url_scrapper import AmazonUrlScraper
from scrapper.src.multi_product_scrapper import AmazonProductScraper
from scrapper.logger import GLOBAL_LOGGER as log
from scrapper.exception.custom_exception import CustomException


class AmazonScrapingPipeline:
    """
    Orchestrates the complete Amazon scraping pipeline:
    1. URL Scraping - Collects product URLs from search results
    2. Product Scraping - Extracts detailed information from each product page
    
    Artifacts are saved in timestamped directories:
    - Artifacts/<timestamp>/UrlData/urls.json
    - Artifacts/<timestamp>/ProductData/products.json
    """
    
    def __init__(
        self,
        search_terms: list[str] | str,
        target_links: int | list[int] = 5,
        headless: bool = False
    ):
        """
        Initialize the scraping pipeline.
        
        Args:
            search_terms: Single term or list of product search terms
            target_links: Number of URLs to scrape per term (int or list)
            headless: Run browsers in headless mode (default: False)
        """
        self.search_terms = search_terms
        self.target_links = target_links
        self.headless = headless
        
        # Pipeline artifacts
        self.data_config: DataConfig = None
        self.url_artifact: UrlDataArtifact = None
        self.product_artifact: ProductDataArtifact = None
    
    def _log_stage_header(self, stage_name: str, stage_number: int):
        """Log formatted stage header."""
        log.info(f"\n{'='*80}")
        log.info(f"STAGE {stage_number}: {stage_name}")
        log.info(f"{'='*80}\n")
    
    def _log_stage_complete(self, stage_name: str):
        """Log stage completion."""
        log.info(f"\n{'✓'*80}")
        log.info(f"✅ {stage_name} - COMPLETED")
        log.info(f"{'✓'*80}\n")
    
    def start_url_scraping(self) -> UrlDataArtifact:
        """
        Stage 1: Scrape product URLs from Amazon search results.
        
        Returns:
            UrlDataArtifact containing path to urls.json
        """
        self._log_stage_header("URL SCRAPING", 1)
        
        try:
            # Initialize configuration with timestamp
            self.data_config = DataConfig(timestamp=datetime.now())
            
            log.info(f"📂 Artifact directory: {self.data_config.SAVED_DATA_DIR}")
            log.info(f"🔍 Search terms: {self.search_terms}")
            log.info(f"🎯 Target links: {self.target_links}")
            log.info(f"👁️ Headless mode: {self.headless}\n")
            
            # Initialize URL scraper
            url_scraper = AmazonUrlScraper(
                data_config=self.data_config,
                search_terms=self.search_terms,
                target_links=self.target_links,
                headless=self.headless,
                wait_timeout=5,
                page_load_timeout=15
            )
            
            # Run URL scraping
            self.url_artifact = url_scraper.run()
            
            log.info(f"✅ URLs saved to: {self.url_artifact.url_file_path}")
            self._log_stage_complete("URL SCRAPING")
            
            return self.url_artifact
            
        except Exception as e:
            log.error("❌ URL scraping stage failed", exc_info=True)
            raise CustomException(e, sys)
    
    def start_product_scraping(self) -> ProductDataArtifact:
        """
        Stage 2: Scrape detailed product information from collected URLs.
        
        Returns:
            ProductDataArtifact containing path to products.json and statistics
        """
        self._log_stage_header("PRODUCT SCRAPING", 2)
        
        try:
            if not self.url_artifact:
                raise ValueError("URL artifact not found. Run start_url_scraping() first.")
            
            log.info(f"📂 Loading URLs from: {self.url_artifact.url_file_path}")
            log.info(f"👁️ Headless mode: {self.headless}\n")
            
            # Initialize product scraper
            product_scraper = AmazonProductScraper(
                data_config=self.data_config,
                url_data_artifact=self.url_artifact,
                headless=self.headless,
                wait_timeout=10,
                page_load_timeout=20
            )
            
            # Run product scraping
            self.product_artifact = product_scraper.run()
            
            log.info(f"✅ Products saved to: {self.product_artifact.product_file_path}")
            self._log_stage_complete("PRODUCT SCRAPING")
            
            return self.product_artifact
            
        except Exception as e:
            log.error("❌ Product scraping stage failed", exc_info=True)
            raise CustomException(e, sys)
    
    def run_pipeline(self) -> tuple[UrlDataArtifact, ProductDataArtifact]:
        """
        Execute the complete pipeline: URL scraping → Product scraping.
        
        Returns:
            Tuple of (UrlDataArtifact, ProductDataArtifact)
        """
        try:
            log.info(f"\n{'#'*80}")
            log.info(f"🚀 STARTING AMAZON SCRAPING PIPELINE")
            log.info(f"{'#'*80}\n")
            
            pipeline_start = datetime.now()
            
            # Stage 1: URL Scraping
            url_artifact = self.start_url_scraping()
            
            # Stage 2: Product Scraping
            product_artifact = self.start_product_scraping()
            
            # Pipeline completion summary
            pipeline_end = datetime.now()
            duration = (pipeline_end - pipeline_start).total_seconds()
            
            self._log_pipeline_summary(duration)
            
            return url_artifact, product_artifact
            
        except Exception as e:
            log.error("❌ Pipeline execution failed", exc_info=True)
            raise CustomException(e, sys)
    
    def _log_pipeline_summary(self, duration: float):
        """Log pipeline execution summary."""
        log.info(f"\n{'#'*80}")
        log.info(f"🎉 PIPELINE COMPLETED SUCCESSFULLY")
        log.info(f"{'#'*80}")
        log.info(f"\n📊 PIPELINE SUMMARY:")
        log.info(f"├── Timestamp: {self.data_config.timestamp}")
        log.info(f"├── Duration: {duration:.2f} seconds")
        log.info(f"├── URLs file: {self.url_artifact.url_file_path}")
        log.info(f"└── Products file: {self.product_artifact.product_file_path}")
        
        if hasattr(self.product_artifact, 'scraped_count'):
            log.info(f"\n📈 SCRAPING STATISTICS:")
            log.info(f"├── Successfully scraped: {self.product_artifact.scraped_count}")
            log.info(f"├── Failed: {self.product_artifact.failed_count}")
            total = self.product_artifact.scraped_count + self.product_artifact.failed_count
            success_rate = (self.product_artifact.scraped_count / total * 100) if total > 0 else 0
            log.info(f"└── Success rate: {success_rate:.2f}%")
        
        log.info(f"\n{'#'*80}\n")


# ==================== MAIN EXECUTION ====================

def main():
    """Main entry point for the pipeline."""
    try:
        # Configure pipeline parameters
        pipeline = AmazonScrapingPipeline(
            search_terms=['laptop pc', 'wireless mouse'],
            target_links= [1, 2],  # 5 laptops, 3 mice, 4 keyboards
            headless= True  # Set to False to see browser
        )
        
        # Execute complete pipeline
        url_artifact, product_artifact = pipeline.run_pipeline()
        
        # Access results
        print(f"\n✅ Pipeline completed!")
        print(f"📁 URLs: {url_artifact.url_file_path}")
        print(f"📁 Products: {product_artifact.product_file_path}")
        
    except Exception as e:
        log.error(f"Pipeline execution failed: {e}", exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    main()

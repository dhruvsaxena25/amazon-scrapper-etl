import os
import sys
from pathlib import Path
from datetime import datetime


# Add the project root to the Python path
project_root = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(project_root))


from scrapper.entity.config_entity import DataConfig 
from scrapper.entity.artifact_entity import UrlDataArtifact
from scrapper.src.multi_url_scrapper import AmazonUrlScraper
from scrapper.logger import GLOBAL_LOGGER as log
from scrapper.exception.custom_exception import CustomException



class AmazonUrlScrapingPipeline:
    """
    URL Scraping Pipeline: Collects product URLs from Amazon search results.

    Artifacts are saved in timestamped directories:
    - Artifacts/<timestamp>/UrlData/urls.json
    """

    def __init__(
        self,
        search_terms: list[str] | str,
        target_links: int | list[int] = 5,
        headless: bool = False,
        wait_timeout: int = 5,
        page_load_timeout: int = 15
    ):
        """
        Initialize the URL scraping pipeline.

        Args:
            search_terms: Single term or list of product search terms
            target_links: Number of URLs to scrape per term (int or list)
            headless: Run browsers in headless mode (default: False)
            wait_timeout: Element wait timeout in seconds (default: 5)
            page_load_timeout: Page load timeout in seconds (default: 15)
        """
        self.search_terms = search_terms
        self.target_links = target_links
        self.headless = headless
        self.wait_timeout = wait_timeout
        self.page_load_timeout = page_load_timeout

        # Pipeline artifacts
        self.data_config: DataConfig = None
        self.url_artifact: UrlDataArtifact = None

    def _log_stage_header(self, stage_name: str):
        """Log formatted stage header."""
        log.info(f"\n{'='*80}")
        log.info(f"{stage_name}")
        log.info(f"{'='*80}\n")

    def _log_stage_complete(self, stage_name: str):
        """Log stage completion."""
        log.info(f"\n{'✓'*80}")
        log.info(f"✅ {stage_name} - COMPLETED")
        log.info(f"{'✓'*80}\n")

    def run(self) -> UrlDataArtifact:
        """
        Execute URL scraping pipeline.

        Returns:
            UrlDataArtifact containing path to urls.json
        """
        self._log_stage_header("🚀 AMAZON URL SCRAPING PIPELINE")

        try:
            pipeline_start = datetime.now()

            # Initialize configuration with timestamp
            self.data_config = DataConfig(timestamp=pipeline_start)

            log.info(f"📂 Artifact directory: {self.data_config.SAVED_DATA_DIR}")
            log.info(f"🔍 Search terms: {self.search_terms}")
            log.info(f"🎯 Target links: {self.target_links}")
            log.info(f"👁️ Headless mode: {self.headless}")
            log.info(f"⏱️ Wait timeout: {self.wait_timeout}s")
            log.info(f"⏱️ Page load timeout: {self.page_load_timeout}s\n")

            # Initialize URL scraper
            url_scraper = AmazonUrlScraper(
                data_config=self.data_config,
                search_terms=self.search_terms,
                target_links=self.target_links,
                headless=self.headless,
                wait_timeout=self.wait_timeout,
                page_load_timeout=self.page_load_timeout
            )

            # Run URL scraping
            self.url_artifact = url_scraper.run()

            # Calculate duration
            pipeline_end = datetime.now()
            duration = (pipeline_end - pipeline_start).total_seconds()

            # Log summary
            self._log_pipeline_summary(duration)

            return self.url_artifact

        except Exception as e:
            log.error("❌ URL scraping pipeline failed", exc_info=True)
            raise CustomException(e, sys)

    def _log_pipeline_summary(self, duration: float):
        """Log pipeline execution summary."""
        log.info(f"\n{'#'*80}")
        log.info(f"🎉 URL SCRAPING PIPELINE COMPLETED")
        log.info(f"{'#'*80}")
        log.info(f"\n📊 PIPELINE SUMMARY:")
        log.info(f"├── Timestamp: {self.data_config.timestamp}")
        log.info(f"├── Duration: {duration:.2f} seconds")
        log.info(f"└── URLs file: {self.url_artifact.url_file_path}")
        log.info(f"\n{'#'*80}\n")



# ==================== MAIN EXECUTION ====================


def main():
    """Main entry point for the URL scraping pipeline."""
    try:
        # Configure pipeline parameters
        pipeline = AmazonUrlScrapingPipeline(
            search_terms=['laptop pc', 'wireless mouse'],
            target_links=[1, 2],  # 1 laptop, 2 mice
            headless=False,  # Set to True to hide browser
            wait_timeout=5,
            page_load_timeout=15
        )

        # Execute pipeline
        url_artifact = pipeline.run()

        # Access results
        print(f"\n✅ URL scraping completed!")
        print(f"📁 URLs saved to: {url_artifact.url_file_path}")
        print(f"\n💡 Use this file path in the Product Scraping Pipeline")

    except Exception as e:
        log.error(f"URL scraping pipeline failed: {e}", exc_info=True)
        sys.exit(1)



if __name__ == "__main__":
    main()

import os
import sys
from pathlib import Path
from datetime import datetime


# Add the project root to the Python path
project_root = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(project_root))


from scrapper.entity.config_entity import DataConfig 
from scrapper.entity.artifact_entity import UrlDataArtifact, ProductDataArtifact
from scrapper.src.multi_product_scrapper import AmazonProductScraper
from scrapper.logger import GLOBAL_LOGGER as log
from scrapper.exception.custom_exception import CustomException



class AmazonProductScrapingPipeline:
    """
    Product Scraping Pipeline: Extracts detailed product information from URLs.

    Takes a JSON file containing product URLs and scrapes detailed information.
    Artifacts are saved in the same timestamped directory as the input URLs:
    - Artifacts/<timestamp>/ProductData/products.json
    """

    def __init__(
        self,
        url_file_path: str | Path,
        headless: bool = False,
        wait_timeout: int = 10,
        page_load_timeout: int = 20
    ):
        """
        Initialize the product scraping pipeline.

        Args:
            url_file_path: Path to the JSON file containing product URLs
            headless: Run browsers in headless mode (default: False)
            wait_timeout: Element wait timeout in seconds (default: 10)
            page_load_timeout: Page load timeout in seconds (default: 20)
        """
        self.url_file_path = Path(url_file_path)
        self.headless = headless
        self.wait_timeout = wait_timeout
        self.page_load_timeout = page_load_timeout

        # Pipeline artifacts
        self.data_config: DataConfig = None
        self.url_artifact: UrlDataArtifact = None
        self.product_artifact: ProductDataArtifact = None

        # Validate input file
        self._validate_url_file()

    def _validate_url_file(self):
        """Validate that the URL file exists."""
        if not self.url_file_path.exists():
            raise FileNotFoundError(
                f"URL file not found: {self.url_file_path}\n"
                f"Please run the URL scraping pipeline first."
            )

        if not self.url_file_path.suffix == '.json':
            raise ValueError(
                f"Expected JSON file, got: {self.url_file_path.suffix}\n"
                f"File path: {self.url_file_path}"
            )

    def _extract_timestamp_from_path(self) -> datetime:
        """
        Extract timestamp from the URL file path.
        Expected structure: Artifacts/<timestamp>/UrlData/urls.json
        """
        try:
            # Navigate up to timestamp directory
            timestamp_dir = self.url_file_path.parents[1].name

            # Parse timestamp (format: YYYY_MM_DD_HH_MM_SS)
            timestamp = datetime.strptime(timestamp_dir, "%Y_%m_%d_%H_%M_%S")

            log.info(f"📅 Extracted timestamp: {timestamp}")
            return timestamp

        except (ValueError, IndexError) as e:
            log.warning(f"⚠️ Could not extract timestamp from path, using current time")
            return datetime.now()

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

    def run(self) -> ProductDataArtifact:
        """
        Execute product scraping pipeline.

        Returns:
            ProductDataArtifact containing path to products.json and statistics
        """
        self._log_stage_header("🚀 AMAZON PRODUCT SCRAPING PIPELINE")

        try:
            pipeline_start = datetime.now()

            # Extract timestamp from URL file path
            timestamp = self._extract_timestamp_from_path()

            # Initialize configuration with extracted timestamp
            self.data_config = DataConfig(timestamp=timestamp)

            # Create URL artifact from file path
            self.url_artifact = UrlDataArtifact(
                url_file_path=str(self.url_file_path)
            )

            log.info(f"📂 Artifact directory: {self.data_config.SAVED_DATA_DIR}")
            log.info(f"📥 Input URL file: {self.url_file_path}")
            log.info(f"👁️ Headless mode: {self.headless}")
            log.info(f"⏱️ Wait timeout: {self.wait_timeout}s")
            log.info(f"⏱️ Page load timeout: {self.page_load_timeout}s\n")

            # Initialize product scraper
            product_scraper = AmazonProductScraper(
                data_config=self.data_config,
                url_data_artifact=self.url_artifact,
                headless=self.headless,
                wait_timeout=self.wait_timeout,
                page_load_timeout=self.page_load_timeout
            )

            # Run product scraping
            self.product_artifact = product_scraper.run()

            # Calculate duration
            pipeline_end = datetime.now()
            duration = (pipeline_end - pipeline_start).total_seconds()

            # Log summary
            self._log_pipeline_summary(duration)

            return self.product_artifact

        except Exception as e:
            log.error("❌ Product scraping pipeline failed", exc_info=True)
            raise CustomException(e, sys)

    def _log_pipeline_summary(self, duration: float):
        """Log pipeline execution summary."""
        log.info(f"\n{'#'*80}")
        log.info(f"🎉 PRODUCT SCRAPING PIPELINE COMPLETED")
        log.info(f"{'#'*80}")
        log.info(f"\n📊 PIPELINE SUMMARY:")
        log.info(f"├── Timestamp: {self.data_config.timestamp}")
        log.info(f"├── Duration: {duration:.2f} seconds")
        log.info(f"├── Input file: {self.url_file_path}")
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
    """Main entry point for the product scraping pipeline."""
    try:
        # Configure pipeline parameters
        # Replace this path with the output from URL scraping pipeline
        url_file_path = "./example_url.json"

        pipeline = AmazonProductScrapingPipeline(
            url_file_path=url_file_path,
            headless=False,  # Set to True to hide browser
            wait_timeout=10,
            page_load_timeout=20
        )

        # Execute pipeline
        product_artifact = pipeline.run()

        # Access results
        print(f"\n✅ Product scraping completed!")
        print(f"📁 Products saved to: {product_artifact.product_file_path}")

        if hasattr(product_artifact, 'scraped_count'):
            print(f"\n📊 Results:")
            print(f"  • Successful: {product_artifact.scraped_count}")
            print(f"  • Failed: {product_artifact.failed_count}")

    except Exception as e:
        log.error(f"Product scraping pipeline failed: {e}", exc_info=True)
        sys.exit(1)



if __name__ == "__main__":
    main()

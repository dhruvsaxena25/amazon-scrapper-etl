import time
import numpy as np
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import undetected_chromedriver as uc
from webdriver_manager.chrome import ChromeDriverManager


user_input = input("Press Enter Product...")

# ----- SCRAPING THE DATA -----
def wait_for_page_to_load(driver, wait):
	title = driver.title
	try:
		wait.until(
			lambda d: d.execute_script("return document.readyState") == "complete"
		)
	except:
		print(f"The webpage \"{title}\" did not get fully laoded.\n")
	else:
		print(f"The webpage \"{title}\" did get fully laoded.\n")
  

# This code does not detect captchas
options = uc.ChromeOptions()
options.add_argument("--no-sandbox")
options.add_argument("--disable-blink-features=AutomationControlled")
options.add_argument("--incognito")
options.add_argument("--ignore-certificate-errors")
options.add_argument("--enable-features=NetworkServiceInProcess")
options.add_argument("--disable-features=NetworkService")


driver = uc.Chrome(
    driver_executable_path=ChromeDriverManager().install(),
    options=options,
    use_subprocess=True
)
driver.maximize_window()

# explicit wait
wait = WebDriverWait(driver, 5)

# accessing the target webpage
url = "https://www.amazon.in/"
driver.get(url)
wait_for_page_to_load(driver, wait)



# identify and enter text into search bar
try:
    search_bar = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="twotabsearchtextbox"]')))

except:
    print("Timeout Exception: The search bar is not found.\n")
    
else:
    search_bar.clear()
    search_bar.send_keys(user_input)

time.sleep(1)

# click on Search button
try:
    search_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="nav-search-submit-button"]')))

except:
    print("Timeout Exception: The Search button is not found.\n")
    
else:
    search_button.click()
    wait_for_page_to_load(driver, wait)
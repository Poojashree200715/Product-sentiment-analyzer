from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import time

def scrape_flipkart_reviews(search_term):
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service)
    
    all_reviews = []
    
    search_url = f"https://www.flipkart.com/search?q={search_term}"
    driver.get(search_url)
    time.sleep(3)

    try:
        close_btn = driver.find_element(By.XPATH, "//button[contains(text(),'✕')]")
        close_btn.click()
    except:
        pass

    from bs4 import BeautifulSoup
    soup = BeautifulSoup(driver.page_source, "html.parser")
    product_links = soup.select("a.CGtC98") or soup.select("a[href*='/p/']")
    product_url = "https://www.flipkart.com" + product_links[0]['href']

    driver.get(product_url)
    time.sleep(2)
    soup = BeautifulSoup(driver.page_source, "html.parser")
    try:
        product_name = soup.select_one("span.VU-ZEz").text.strip()
    except:
        product_name = search_term

    # 1) PRODUCT IMAGE
    image_url = "N/A"
    try:
        og_image = soup.select_one('meta[property="og:image"]')
        if og_image and og_image.get("content"):
            image_url = og_image.get("content")
        else:
            for candidate in soup.find_all("img"):
                src = candidate.get("src", "")
                if src.startswith("http") and "batman-returns" not in src and "logo" not in src.lower():
                    image_url = src
                    break
    except Exception:
        pass
    print("Image URL:", image_url)

    # 2) BASIC SPECS
    specs = {}
    try:
        spec_rows = soup.select("table tr")
        for row in spec_rows:
            cells = row.find_all("td")
            if len(cells) == 2:
                key = cells[0].get_text(strip=True)
                val = cells[1].get_text(strip=True)
                if key and val and len(key) < 40:
                    specs[key] = val
    except Exception:
        pass
    print("Specs found:", specs)

    reviews_url = product_url.replace("/p/", "/product-reviews/")
    driver.get(reviews_url)
    time.sleep(3)

    for _ in range(6):
        driver.execute_script("window.scrollBy(0, 1200);")
        time.sleep(1)

    review_elements = driver.find_elements(By.CSS_SELECTOR, "span.css-1jxf684")
    print(f"Found {len(review_elements)} review texts")

    for el in review_elements:
        text = el.text.strip()
        if text and len(text) > 10:
            all_reviews.append({
                "product_name": product_name,
                "review_text": text
            })

    driver.quit()
    return all_reviews, product_name, image_url, specs


if __name__ == "__main__":
    reviews, name, image_url, specs = scrape_flipkart_reviews("laptop")
    print("Image:", image_url)
    print("Specs:", specs)

    if reviews:
        df = pd.DataFrame(reviews)
        df = df.drop_duplicates(subset="review_text")
        df.to_csv("flipkart_reviews.csv", index=False)
        print(f"Saved {len(df)} reviews to flipkart_reviews.csv")
    else:
        print("No reviews found with this class - class name may be dynamic/session-specific")

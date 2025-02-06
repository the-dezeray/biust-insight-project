import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import re

def crawl_website(start_url, domain):
    visited = set()
    to_visit = [start_url]
    course_data = []
    link_data = []

    while to_visit:
        current_url = to_visit.pop(0)
        if current_url in visited:
            continue

        visited.add(current_url)
        print(f"Crawling: {current_url}")

        try:
            response = requests.get(current_url)
            soup = BeautifulSoup(response.text, 'html.parser')

            # Extract course names
            for td in soup.find_all('td', class_='bibInfoData'):
                text = td.get_text(strip=True)
                if re.match(r'MATH \d+ \(\d+\)', text):
                    course_data.append(text)

            # Extract link data
            for a in soup.find_all('a', href=True):
                href = a['href']
                text = a.get_text(strip=True)
                if href.startswith('/search?') and 'tmath++++++101' in href:
                    full_url = urljoin(current_url, href)
                    link_data.append((full_url, text))

            # Find new links to crawl
            for link in soup.find_all('a', href=True):
                href = link['href']
                full_url = urljoin(current_url, href)
                if urlparse(full_url).netloc == domain and full_url not in visited:
                    to_visit.append(full_url)

        except Exception as e:
            print(f"Error crawling {current_url}: {e}")

    return course_data, link_data

# Usage
start_url = 'https://biulms.biust.ac.bw/'  # Replace with the actual starting URL
domain = urlparse(start_url).netloc

courses, links = crawl_website(start_url, domain)

print("\nExtracted Course Names:")
for course in courses:
    print(course)

print("\nExtracted Links:")
for href, text in links:
    print(f"URL: {href}")
    print(f"Text: {text}")
    print()
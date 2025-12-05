from playwright.sync_api import sync_playwright, expect
import time

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        try:
            # 1. Home Page Verification
            print("Navigating to Home Page...")
            page.goto("http://localhost:3000")

            # Wait for the hero section to load (check for specific text)
            print("Waiting for Hero Section...")
            expect(page.get_by_role("heading", name="Master React from")).to_be_visible(timeout=60000)

            # Screenshot Home Page
            print("Taking screenshot of Home Page...")
            page.screenshot(path="/home/jules/verification/home_page.png", full_page=True)

            # 2. Course Layout / Sidebar Verification
            # Check if phases are visible (since we have collapsible sidebar)
            print("Checking Sidebar...")
            # On desktop sidebar should be visible. We use first() to avoid strict mode error if multiple exist
            expect(page.get_by_text("JavaScript Fundamentals").first).to_be_visible()

            # 3. Day Page Verification
            print("Navigating to Day 1...")
            # Click "Start Learning Free" or navigate directly
            page.goto("http://localhost:3000/day/1")

            # Wait for content to load
            expect(page.get_by_role("heading", name="Variables & Data Types")).to_be_visible(timeout=30000)

            # Check for new UI elements
            expect(page.get_by_text("Learning Goal:")).to_be_visible()

            # Screenshot Day Page
            print("Taking screenshot of Day Page...")
            page.screenshot(path="/home/jules/verification/day_page.png", full_page=True)

        except Exception as e:
            print(f"Error during verification: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()

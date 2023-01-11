import puppeteer, { Page } from "puppeteer";

export const initialPage = async (headless: boolean): Promise<Page> => {
  const browser = await puppeteer.launch({
    product: "chrome",
    headless,
  });

  return await browser.newPage();
};

export const navigateToWebsite = async (
  url: string,
  page: Page
): Promise<void> => {
  await page.goto(url, { waitUntil: "networkidle2" });
};

export const getPageTitle = async (page: Page): Promise<string> =>
  await page.title();

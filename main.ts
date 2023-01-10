import puppeteer, { Page } from "puppeteer";
import readline from "readline";

const isValidUrl = (s: string): string => {
  try {
    new URL(s);
    return s;
  } catch (e) {
    console.error("Invalid url");
    process.exit(128);
  }
};

const askQuestion = (question: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<string>((resolve) =>
    rl.question(question, (ans: string) => {
      rl.close();
      resolve(ans);
    })
  );
};

const getUrlFromUser = async (): Promise<string> => {
  const question: string =
    "Please specify valid url ( default https://www.google.com ):";
  const answer = await askQuestion(question);

  return answer === "" ? "https://www.google.com" : answer;
};

const getOptionFromUser = async (): Promise<boolean> => {
  const question: string = "Run in headless mode? (y/n):";
  const isHeadLess = await askQuestion(question);

  if (isHeadLess.toUpperCase() === "Y") return true;
  if (isHeadLess.toUpperCase() === "N") return false;
  else console.error("Invalid option");

  process.exit(128);
};

const initialPage = async (headless: boolean): Promise<Page> => {
  const browser = await puppeteer.launch({
    product: "chrome",
    headless,
  });

  return await browser.newPage();
};

const navigateToWebsite = async (url: string, page: Page): Promise<void> => {
  await page.goto(url, { waitUntil: "networkidle2" });
};

const getPageTitle = async (page: Page): Promise<string> => await page.title();

const start = async () => {
  const url = isValidUrl(await getUrlFromUser());
  const headless = await getOptionFromUser();
  const page = await initialPage(headless);

  await navigateToWebsite(url, page);
  const pageTitle = await getPageTitle(page);

  console.log(`page title: ${pageTitle}`);
};

start();

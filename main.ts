import { getOptionFromUser, getUrlFromUser, outputResult } from "./src/io";
import {
  getPageTitle,
  initialPage,
  navigateToWebsite,
} from "./src/pageControl";
import { isValidUrl } from "./src/validation";

const start = async () => {
  const inputUrl = isValidUrl(await getUrlFromUser());
  const headlessMode = await getOptionFromUser();
  const page = await initialPage(headlessMode);

  await navigateToWebsite(inputUrl, page);
  const pageTitle = await getPageTitle(page);

  outputResult({ pageTitle });
};

start();

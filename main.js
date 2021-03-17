const puppeteer = require('puppeteer');
// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });
var fundName = "";
if(process.argv.length >= 3){
  fundName = process.argv[2]
}else{
  console.error('Please sepecify fund name!')
  return
}
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  let selector = 'input[type="button"]'
  await page.goto('https://codequiz.azurewebsites.net/')
  await page.evaluate((selector) => document.querySelector(selector).click(), selector)
  // example: get innerHTML of an element
  await page.waitForNavigation()
  const data = await page.evaluate(() => {
    const ths = Array.from(document.querySelectorAll('table tr th'))
    const tds = Array.from(document.querySelectorAll('table tr td'))
    const result = {
      td: tds.map(td => td.innerText)
    }
    return result
  })
  let navIndex = data.td.indexOf(fundName)
  if( navIndex === -1 ){
    console.error('Please sepecify valid name!')
    await browser.close();
    return 
  }
  console.log(data.td[navIndex + 1])
  await browser.close()
})();
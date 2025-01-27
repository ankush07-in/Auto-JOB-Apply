const puppeteer = require('puppeteer');

async function applyJob(jobTitle, location) {
  const browser = await puppeteer.launch({ headless: false });
  // const page = await browser.newPage();
  await page.goto('https://www.indeed.com/');
  await page.waitForTimeout(5000);  // Manual login ke liye time
  
  await page.type('#text-input-what', jobTitle);
  await page.type('#text-input-where', location);
  await page.click('.yosegi-InlineWhatWhere-primaryButton');

  await page.waitForTimeout(5000);
  console.log('Job search executed');
  await browser.close();
}

module.exports = { applyJob };

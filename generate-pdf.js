const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Users/xavierce/.cache/puppeteer/chrome/mac_arm-147.0.7727.57/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  });
  const page = await browser.newPage();
  // Set viewport to match A2 landscape at 96dpi
  await page.setViewport({ width: 2245, height: 1587, deviceScaleFactor: 2 });
  const htmlPath = path.resolve(__dirname, 'crossword-print-a2.html');
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
  
  const pdfPath = path.resolve(__dirname, 'crossword-a2.pdf');
  await page.pdf({
    path: pdfPath,
    width: '594mm',
    height: '420mm',
    printBackground: true,
    pageRanges: '1',
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  
  await browser.close();
  console.log('PDF generated:', pdfPath);
})();

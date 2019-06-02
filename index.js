const puppeteer = require('puppeteer');
const chalk = require('chalk');
const figlet = require('figlet');

const DIRECTIONS_BUTTON = '#searchbox-directions';
const FROM_DESTINATION = '#sb_ifc51 > input';
const TO_DESTINATION = '#sb_ifc52 > input';
const SEARCH = '#directions-searchbox-1 > button.searchbox-searchbutton';
const FASTEST_ROUTE = '#section-directions-trip-0 > div.section-directions-trip-description > div:nth-child(1) > div.section-directions-trip-summary.section-directions-trip-secondary-text > span.renderable-component > span:nth-child(2) > span.renderable-component-text.renderable-component-text-not-line';
const JOURNEY_TIME = '#section-directions-trip-0 > div.section-directions-trip-description > div:nth-child(1) > div.section-directions-trip-numbers > div.section-directions-trip-duration.delay-light > span:nth-child(1)';

var FROM = (process.env.FROM) ? process.env.FROM:"L131HD";
var TO = (process.env.TO) ? process.env.TO:"BB31PR";

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: [
      '--window-size=1280,720',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ]
  });

  const page = await browser.newPage();

  await page.goto('https://www.google.co.uk/maps');
  
  await page.click(DIRECTIONS_BUTTON);
  await page.waitForNavigation();
  
  await page.click(FROM_DESTINATION);
  await page.keyboard.type(FROM);

  await page.click(TO_DESTINATION);
  await page.keyboard.type(TO);

  await page.click(SEARCH);
  await page.waitForNavigation();
  await page.waitForSelector(FASTEST_ROUTE, {visible: true})
  
  await page.waitForNavigation();
  await page.screenshot({ path: 'screenshots/route.png' });

  const timeElement = await page.$(JOURNEY_TIME);
  const  timeElementText = await page.evaluate(timeElement => timeElement.textContent, timeElement);
  
  if (FROM == 'L131HD' && TO == 'BB31PR') {
    console.log(chalk.blue("It's gonna take you "+ timeElementText + " to get home from work!"));
    console.log(
      chalk.yellow(
        figlet.textSync(timeElementText, { horizontalLayout: 'full' })
      ));
  }
  else {
    console.log(chalk.blue("It's gonna take you "+ timeElementText + " to get there!"));
    console.log(
      chalk.yellow(
        figlet.textSync(timeElementText, { horizontalLayout: 'full' })
      ));
  }

  browser.close();
}

run();
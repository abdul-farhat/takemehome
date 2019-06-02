const chalk = require('chalk');
const figlet = require('figlet');

async function output(FROM, TO, timeElementText) {
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
}

module.exports = output;


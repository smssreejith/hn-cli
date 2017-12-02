'use strict';

const hn = require('./src/');
const minimist = require('minimist');
const version = require('./package.json').version;
const defaults = {
  boolean: [
    'help',
    'version'
  ],
  alias: {
    h: 'help',
    v: 'version',
    l: 'limit',
    k: 'keep-open',
    s: 'source'
  },
  default: {
    'limit': 150,
    'keep-open': false,
    'latest': false,
    'all': false,
    'source': 'hacker-news'
  }
};

const help = `
Usage: NEWS_API_KEY=yourkey newsapi [OPTIONS]

  CLI to browse Hacker News

Example:
  $ NEWS_API_KEY=yourkey newsapi --limit 10 --keep-open

Options:
  -v --version              Display current software version
  -h --help                 Display help and usage details
  -l --limit                Limit the number of items to display (defaults to 150)
  -k --keep-open            Wether or not to keep the list open after selecting an item (defaults to false)
  -s --source               Newsapi source
     --latest               Sort the list by submission date (defaults to false)
     --all                  All articles
`;

const run = argv => hn(argv);

// Must be ≠ 0 if any errors occur during execution
exports.exitCode = 0;

// Allow mocking the stdout/stderr
exports.stdout = process.stdout;
exports.stderr = process.stderr;

exports.parse = options => minimist(options, defaults);

exports.run = argv => {
  // Reset status code at each run
  exports.exitCode = 0;

  if (!process.env.NEWS_API_KEY){
    exports.stderr.write(help);
    return;
  }

  if (argv.help) {
    exports.stderr.write(help);
    return;
  }

  if (argv.version) {
    exports.stderr.write(`newsapi-cli v${version}\n`);
    return;
  }

  run(argv);
};

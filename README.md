# newsapi-cli 
## Install

```sh
$ npm install -g newsapli-cli
```

## Usage

```sh
Usage: apinews [OPTIONS]

  CLI to browse apinews.org

Example:
  $ NEWS_API_KEY=your_key newsapi --limit 10 --keep-open

Options:
  -v --version              Display current software version
  -h --help                 Display help and usage details
  -l --limit                Limit the number of items to display (defaults to 150)
  -k --keep-open            Wether or not to keep the list open after selecting an item (defaults to false)
  -s --source               Newsapi source
     --latest               Sort the list by submission date (defaults to false)
     --all                  All articles
```

## Features

* You can change the list order to display the most recent ones by runnig the program with the `--latest` flag
* You can use Vim arrow keys <kbd>j</kbd> and <kbd>k</kbd> to navigate through the list
* Use <kbd>gg</kbd> to scroll to the first item of the list and <kbd>G</kbd> to scroll to the last one
* Hitting the <kbd>enter</kbd> key will open the URL in your default browser
* Hitting the <kbd>c</kbd> key will open the HN comments for that story on your default browser
* Hitting the <kbd>r</kbd> key will refresh the stories and update the current list
* A status bar is fixed on the bottom of the screen to provide visual feedback about updates and reading progress
* Use <kbd>esc</kbd>, <kbd>⌃C</kbd> or <kbd>q</kbd> to close the program

## License

MIT © [Rafael Rinaldi](http://rinaldi.io)

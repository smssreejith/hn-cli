'use strict';

const Promise = require('pinkie-promise');
const openUrl = require('opn');
const now = require('./parsers/now');
const spinner = require('./spinner');
const Renderer = require('./renderer');
const parseTableData = require('./parsers/table');
const fetchOptions = require('./options/fetch');
const api = require('./api')(fetchOptions);
const noop = require('./noop');

let cache = {};

const limitResults = (results, limit) => results.slice(0, limit);

const fetchTopStories = (source,type) =>  api.fetch(api.stories(source,type));

const fetchTopStoriesDetails = stories => stories.body.articles

const sortByTime = (newsest, oldest) => oldest.time - newsest.time;

const handlePingError = error => {
  spinner.stop();

  if (error.code === 'ENOTFOUND') {
    console.log(`Looks like you have internet connection issues`);
  } else if (error.code === 'ETIMEDOUT') {
    console.log(`Tried ${fetchOptions.retries} times but the request has timed out`);
  } else {
    console.log(error);
  }

  return process.exit(1);
};

const ping = (options, shouldMute) => {
  const log = shouldMute ? noop : spinner.start;

  log(`Fetching stories`);

  return fetchTopStories(options.source,options.all)
    // Fires all requests
    .then(response => {
      log(`Loading details ${options.latest ? 'of most recent stories' : ''}`);
      return fetchTopStoriesDetails(response);
    })
     // Limits 
    .then(response => {
      return limitResults(response, options.limit);
    })
    // Sort the response by submission date if `options.latest`
    .then(response => {
      return options.latest ? response.slice().sort(sortByTime) : response;
    })
    .then(response => {
      // Finally loaded
      spinner.stop();

      // Store data on local cache so it can be used later
      cache = response;

      return cache;
    })
    // Format the result to a data format compatible with the table widget
    .then(response => {
      return parseTableData(response);
    })
    // Handle error messages
    .catch(error => {
      handlePingError(error);
    });
};

const onTableSelect = (index, key) => {
  const selected = cache[index - 1];
  openUrl(selected.url);
};

const render = (renderer, data) => renderer.render(data);

const reportStatusUpdate = renderer => {
  renderer.status = `Last updated at ${now()}`;
};

const run = options => {
  const renderer = new Renderer({
    shouldCloseOnSelect: !options['keep-open']
  });

  renderer.onTableSelect = onTableSelect;

  // Fetch data then render
  ping(options).then(response => {
    render(renderer, response);
    reportStatusUpdate(renderer);
  });

  return renderer;
};

module.exports = options => {
  const renderer = run(options);
  const onRefreshRequest = () => {
    renderer.status = `Updating list, hold on...`;
    // Refresh data then render
    ping(options, true).then(response => {
      renderer.update(response);
      reportStatusUpdate(renderer);
    });
  };

  renderer.onRefreshRequest = onRefreshRequest;
};

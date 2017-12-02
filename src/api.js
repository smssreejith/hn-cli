const got = require('got');
const api = options => {
  return {
    url: 'https://newsapi.org',
    version: 'v2',
    api_key: process.env.NEWS_API_KEY,
    fetch: url => got(url, options),

    base() {
      return `${this.url}/${this.version}`;
    },

    stories(source,type) {
      type = type ? 'everything' : 'top-headlines';
      return `${this.base()}/${type}?sources=${source}&apiKey=${this.api_key}`;
    },

  };
};

module.exports = api;

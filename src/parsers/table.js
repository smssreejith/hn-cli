'use strict';

const moment = require('moment');

module.exports = data => {
  return [[
    'Title',
    'Author',
    'When'
  ]].concat(
      data.map(item => {
        return [
          `${item.title}`,
          `${item.author}`,
          moment(item.publishedAt).fromNow()
        ];
      })
    );
};

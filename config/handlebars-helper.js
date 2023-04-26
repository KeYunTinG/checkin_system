const moment = require('moment');
require('moment/locale/zh-tw');

moment.locale('zh-tw');

module.exports = {
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  },
  ifNotCond: function (a, b, options) {
    return a === b ? options.inverse(this) : options.fn(this)
  },
};

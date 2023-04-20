const helpers = require('../helpers/auth-helpers')
const db = require('../models');
const User = db.User;
const checkinController = {
  homepage: (req, res) => {
    const User = helpers.getUser(req).name;
    res.render('home', { user: User });
  },
  checkin: (req, res) => {
    const User = helpers.getUser(req).name;
    res.render('home', { user: User });
  },
}

module.exports = checkinController
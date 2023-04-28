const helpers = require('../helpers/auth-helpers')
const authenticated = (req, res, next) => {
  // if (req.isAuthenticated)
  if (helpers.ensureAuthenticated(req)) {
    if (helpers.getUser(req).isAdmin === true) return res.redirect('/admin/absent')
    req.user = helpers.getUser(req)
    return next()
  }
  res.redirect('/signin')
}
const adminAuthenticated = (req, res, next) => {
  // if (req.isAuthenticated)
  if (helpers.ensureAuthenticated(req)) {
    if (helpers.getUser(req).isAdmin === true) return next()
    res.redirect('/')
  } else {
    res.redirect('/signin')
  }
}
module.exports = {
  authenticated,
  adminAuthenticated
}
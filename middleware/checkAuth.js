module.exports = {
  isAuthenticated: function (req, res, next) {
    res.locals.isLoggedIn = req.isAuthenticated();
    return next();
  },
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/reminders");
  },
};

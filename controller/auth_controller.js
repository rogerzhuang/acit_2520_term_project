let database = require("../database");
const passport = require("../middleware/passport");
const userDatabase = require("../models/userModel").database;

let authController = {
  login: (req, res) => {
    console.log(req.session);
    res.render("auth/login", {
      error: req.session.messages,
    });
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  signup: (req, res) => {
    res.render("auth/register", {
      email: req.body.email,
    });
  },

  // loginSubmit: (req, res, next) => {
  //   passport.authenticate("local", {
  //     successRedirect: "/reminders",
  //     failureRedirect: "/login",
  //   })(req, res, next);
  // },

  loginSubmit: passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/login",
    failureMessage: true,
  }),

  registerSubmit: (req, res) => {
    const user = {
      id: userDatabase.length + 1,
      email: req.body.email,
      password: req.body.password,
    };
    userDatabase.push(user);
    database[user.id] = { reminders: [] };
    res.redirect("/login");
  },

  logout: (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  },
};

module.exports = authController;

let database = require("../database");
const passport = require("../middleware/passport");
const userDatabase = require("../models/userModel").database;

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/login",
    })(req, res, next);
  },

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
};

module.exports = authController;

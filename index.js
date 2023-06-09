const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

const passport = require("./middleware/passport");
const {
  isAuthenticated,
  forwardAuthenticated,
  ensureAuthenticated,
} = require("./middleware/checkAuth");

// Middleware for express
app.use(passport.initialize());
app.use(passport.session());
app.use(isAuthenticated);

// app.use((req, res, next) => {
//   if (req.user) {
//     res.locals.isLoggedIn = true;
//   } else {
//     res.locals.isLoggedIn = false;
//   }
// })

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", authController.register);
app.get("/login", forwardAuthenticated, authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);
app.post("/signup", authController.signup);
app.get("/logout", ensureAuthenticated, authController.logout);

// Routes start here

app.get("/reminders", ensureAuthenticated, reminderController.list);

app.get("/reminder/new", ensureAuthenticated, reminderController.new);

app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

app.post("/reminder/", ensureAuthenticated, reminderController.create);

// Implement this yourself
app.post(
  "/reminder/update/:id",
  ensureAuthenticated,
  reminderController.update
);

// Implement this yourself
app.post(
  "/reminder/delete/:id",
  ensureAuthenticated,
  reminderController.delete
);

app.get(
  "/reminder/:id/delete-tag/:tag",
  ensureAuthenticated,
  reminderController.deleteTag
);

const port = process.env.PORT || 3001; // use the port number provided by Netlify or default to 3001

app.listen(port, function () {
  console.log(
    `Server running. Visit: http://localhost:${port}/reminders in your browser 🚀`
  );
});

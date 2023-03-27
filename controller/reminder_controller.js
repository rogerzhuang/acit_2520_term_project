let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", {
      reminders: database[req.user.id].reminders,
    });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[req.user.id].reminders.find(function (
      reminder
    ) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.redirect("/reminders");
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      tags: req.body.tags.split(",").map((tag) => tag.trim()),
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[req.user.id].reminders.find(
      (reminder) => reminder.id == reminderToFind
    );
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // Extract the reminder ID from the URL parameter
    let id = parseInt(req.params.id);
    // Search the 'reminders' array for a reminder with the specified ID
    let searchResult = database[req.user.id].reminders.find(
      (reminder) => reminder.id === id
    );
    // If a matching reminder is found, update its properties with data from the request body
    if (searchResult != undefined) {
      searchResult.title = req.body.title;
      searchResult.description = req.body.description;
      searchResult.completed = req.body.completed === 'true';
      searchResult.tags = req.body.tags.split(",").map((tag) => tag.trim());
    }
    // Display the list of all reminders
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    const id = parseInt(req.params.id);
    database[req.user.id].reminders = database[req.user.id].reminders.filter(
      (reminder) => reminder.id !== id
    );
    res.redirect("/reminders");
  },

  deleteTag: (req, res) => {
    const reminderId = parseInt(req.params.id);
    const tagName = req.params.tag;
    const reminder = database.cindy.reminders.find(function (reminder) {
      return reminder.id === reminderId;
    });
    if (reminder !== undefined) {
      reminder.tags = reminder.tags.filter(function (tag) {
        return tag !== tagName;
      });
    }
    res.redirect(`/reminder/${reminderId}`);
  },
};

module.exports = remindersController;

const database = [
  {
    id: 1,
    name: "Aline",
    email: "aline@gmail.com",
    password: "aline123!",
  },
  {
    id: 2,
    name: "Roger",
    email: "roger@gmail.com",
    password: "roger123!",
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};

module.exports = { database, userModel };

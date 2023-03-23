// Representation State Transfer (REST) is an API built pattern following RESTful APIs
const router = require("express").Router();
const { User } = require("../../models");

// GET /api/users (Get all users)
router.get("/", (req, res) => {
  // Access our User model and run .findAll() method)
  // .finAll() is equivalent to "SELECT * FROM users;"
  User.findAll({
    // This excludes password the column with the 'attributes' key
    // This is in an array so if we want to exclude more than one we can add more
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1 (Returns one user bases on its req.params.id)
router.get("/:id", (req, res) => {
  User.findOne({
    // same as the query "SELECT * FROM users WHERE id = 1;"
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
  })
    // .then() returns nothing from the query if a nonexistent id value is searched
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user foun with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(Here);
      res.status(500).json(err);
    });
});

// POST /api/users (Insert/Create data)
router.post("/", (req, res) => {
  // Expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  // To insert data we use sequelize's ".create()" method.
  // Pass in key/value pairs where the keys are what we defined in the User model and values are what we got from 'req.body'
  // Same as INSERT INTO users (username, email, password), VALUES ("Lernantino", "lernantino@gmail.com", "password1234");
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// User Login
router.post("/login", (req, res) => {
  // Queried User table using the findOne() method for the email entered & assigned it to req.body.email
  // If user is not found a message will be sent
  // If user IS found, the next step is to verify user identity by matching password and hashed password.
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(404).json({ message: "No user with that email address!" });
      return;
    }
    // res.json({ user: dbUserData });
    // Verify user
  });
});

// PUT /api/users/1 (Update data)
router.put("/:id", (req, res) => {
  // To updata data we use both 'req.body' and 'req.params'
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  // If req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  // This .update() method combines the parameters for creating data and looking up data.
  // We pass in req.body to provide the new data we want to use in the update and req.params.id to indicate where exactly we want that new data to be used.
  User.update(req.body, {
    // Input individual hook so password can bcrypt properly
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // SQL syntax - UPDATE users, SET username = "Lernatino", email = "lernantino@gmail.com", password = "newPassword123"
  // WHERE id = 1;
});

// DELETE /api/users/1 (Delete user from DB)
router.delete("/:id", (req, res) => {
  // To delete data we use the '.destroy()' method
  // provide indentifier to indicate where exactly we wold like to delete data
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id " });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(Here);
      res.status(500).json(err);
    });
});

module.exports = router;

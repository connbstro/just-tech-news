// Server.js is the root of the entire project
const express = require("express");
const routes = require("./routes");
// Importing the connection to Sequelize from 'config/connection.js'
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Turn on routes
app.use(routes);

// Turn on connection to db and server
// sequelize.sync() method establishes the connection to the db
// The "sync" part means that this is Sequelize taking the models and connecting them to associated database tables
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

// Since we set up the routes the way we did, we don't have to worry about importing multiple files for different endpoints.
// The router instance in routes/index.js collected everything for us and packaged them up for server.js to use.

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// Create our User model
class User extends Model {
  // Set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    // Using the keyword this, we can access this user's properties, including the password
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// define table columns and configuration
User.init(
  {
    // TABLE COLUMN DEFINITIONS GO HERE
    // Define an id column
    id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true,
    },
    // Define a user column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define an email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // there cannot be any duplicate email values in this table
      unique: true,
      // if allowNull is set to false, we can run our data through validators before creating the table data
      validate: {
        isEmail: true,
      },
    },
    // Define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // This means the password must be at least four characters long
        len: [4],
      },
    },
  },
  {
    hooks: {
      // Set up beforeCreate lifecycle "hook" functionality
      // beforeCreate() hook executes bcrypt hash function on the plaintext password.
      async beforeCreate(newUserData) {
        // We pass in a saltRound value of 10.
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        // returns hashed password in the newUserData function.
        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
        // Encrypts updated password for a user.
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },

    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: "user",
  }
);

module.exports = User;

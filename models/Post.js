// Import Model & DataTypes from Sequelize package
const { Model, DataTypes } = require("sequelize");
// Import connection to MySQL stored in the connection.js file
const sequelize = require("../config/connection");

// Create/define Post model
class Post extends Model {}

// Define columns in the Post, configure naming conventions, & pass the current connection instance to initialize the Post model.
// Create fields/columns for Post Model
Post.init(
  // Defining the Post schema in first parameter
  {
    // Identified id column as primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_url: {
      type: DataTypes.STRING,
      allowNull: false,
      // Here, we ensure that this url is a verified link by setting the isURL property to true.
      validate: {
        isURL: true,
      },
    },
    // The user_id is conversely defined as the foreign key and will be the matching link.
    user_id: {
      type: DataTypes.INTEGER,
      // Establishes the relationship between this post and the user by creating a reference to the User model,
      // specifically to the id column that is defined by the key property, which is the primary key.
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  // 2nd parameter of the init method, we configure the metadata, including the naming conventions.
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

// Export extension to make the Post model accessible to other parts of the application
module.export = Post;

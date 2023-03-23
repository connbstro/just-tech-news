// Require User model.
const User = require("./User");
// Require Post model
const Post = require("./Post");

// Create associations.
// This association creates the reference for the id column in the User model
// to link to the corresponding foreign key pair, which is the user_id in the Post model.
User.hasMany(Post, {
  foreignKey: "user_id",
});

// Reverse association.
// Defining the relationship of the Post model to the User. Can only belong to one user.
Post.belongsTo(User, {
  foreignKey: "user_id",
});

// Export Post & User models.
module.exports = { User, Post };

const User = require("./User");
const Post = require("./Post");
const UserChallenge = require("./UserChallenge");
const Challenge = require("./Challenge");

User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Challenge.hasMany(Post, {
  foreignKey: "challenge_id",
});

Post.belongsTo(Challenge, {
  foreignKey: "challenge_id",
});

User.belongsToMany(Challenge, {
  foreignKey: "user_id",
  otherKey: "challenge_id",
  through: UserChallenge,
});

Challenge.belongsToMany(User, {
  foreignKey: "challenge_id",
  otherKey: "user_id",
  through: UserChallenge,
});

// UserChallenge.belongsToMany(User, {
//   foreignKey: "user_id",
//   targetKey: "id",
// })

// UserChallenge.belongsToMany(Challenge, {
//   foreignKey: "challenge_id",
//   targetKey: "id",
// })

module.exports = { User, Post, Challenge, UserChallenge };

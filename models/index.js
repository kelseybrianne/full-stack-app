const User = require('./User');
const Post = require('./Post');
const UserChallenge = require('./UserChallenge');
const Challenge = require('./Challenge');

User.hasMany(Post, {
    foreignKey: 'user_id'
})

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

User.belongsToMany(Challenge, {
    foreignKey: 'user_id',
    through: UserChallenge
});

Challenge.belongsToMany(User, {
    foreignKey: 'user_id',
    through: User
});

Post.hasMany(Challenge, {
    foreignKey: 'post_id'
})

module.exports = { User, Post, Challenge, UserChallenge };
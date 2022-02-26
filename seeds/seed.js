const sequelize = require("../config/connection");
const { User, Post, Challenge, UserChallenge } = require("../models");

const userData = require("./userData.json");
const userChallengeData = require("./userChallengeData.json");
const challengeData = require("./challengeData.json");
const postData = require("./postData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Challenge.bulkCreate(challengeData, {
    returning: true,
  });

  await UserChallenge.bulkCreate(userChallengeData, {
    returning: true,
  });

  await Post.bulkCreate(postData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

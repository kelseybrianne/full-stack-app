const router = require("express").Router();
const { Op } = require("sequelize");
const withAuth = require("../utils/auth");
const { Challenge, UserChallenge, User, Post } = require("../models");

// get homepage (/)
router.get("/", withAuth, async (req, res) => {
  // get users challenges
  const userChallengeData = await Challenge.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "username"],
        through: {
          model: UserChallenge,
        },
        where: { id: req.session.user_id },
      },
    ],
  });

  const userChallenges = userChallengeData.map((challenge) =>
    challenge.toJSON()
  );

  const userChallengeIds = userChallengeData.map((challenge) => challenge.id);

  const notjoinedChallengeData = await Challenge.findAll({
    where: {
      id: {
        [Op.notIn]: userChallengeIds,
      },
    },
  });

  const challenges = notjoinedChallengeData.map((challenge) =>
    challenge.toJSON()
  );

  res.render("homepage", {
    challenges,
    userChallenges,
    logged_in: req.session.logged_in,
  });
});

// get login (/login)
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// get logout (/logout)

// get signup (/signup)
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

// get profile page(/:userid)
router.get("/profile", withAuth, async (req, res) => {
  const postData = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
        where: {
          id: req.session.user_id,
        },
      },
      {
        model: Challenge,
        attributes: ["title"],
      },
    ],
  });
  const posts = postData.map((post) => post.toJSON());

  // Use req.session.user_id to get the current user
  const userData = await User.findByPk(req.session.user_id);
  const user = userData.get({ plain: true });

  const userChallengeData = await Challenge.findAll({
    include: [
      {
        model: User,
        through: {
          model: UserChallenge
        },
        where: { id: req.session.user_id },
      },
    ],
  });
  const userChallenges = userChallengeData.map((challenge) =>
    challenge.toJSON()
  );

  res.render("profile", {
    userChallenges,
    posts,
    user,
    logged_in: req.session.logged_in,
  });
});

router.get("/feed", withAuth, async (req, res) => {
  const postData = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Challenge,
        attributes: ["title"],
      },
    ],
  });
  const posts = postData.map((post) => post.toJSON());

  // get users challenges

  const userChallengeData = await Challenge.findAll({
    include: [
      {
        model: User,
        through: {
          model: UserChallenge
        },
        where: { id: req.session.user_id },
      },
    ],
  });
  const userChallenges = userChallengeData.map((challenge) =>
    challenge.toJSON()
  );

  res.render("homepage-feed", {
    posts,
    userChallenges,
    logged_in: req.session.logged_in,
  });
});

module.exports = router;

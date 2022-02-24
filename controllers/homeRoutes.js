const router = require("express").Router();
const { Op } = require("sequelize");
const withAuth = require("../utils/auth");
const { Challenge, UserChallenge, User, Post } = require("../models");

// get homepage (/)
router.get("/", withAuth, async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  const challengeData = await Challenge.findAll({
    include: [
      {
        model: User,
        through: {
          model: UserChallenge,
          // attributes: ["challenge_id", "user_id"],
        },
        where: {
          // [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
          // [Op.or]: [{ a: 5 }, { b: 6 }],             // (a = 5) OR (b = 6)
          id: {
            // Basics
            // [Op.eq]: 3,                              // = 3
            [Op.ne]: req.session.user_id, // != 20
            // [Op.is]: null,                           // IS NULL
            // [Op.not]: true,                          // IS NOT TRUE
            // [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)
          },
        },
      },
    ],
  });

  const challenges = challengeData.map((challenge) => challenge.toJSON());

  // get users challenges
  if (req.session.logged_in) {
    const userChallengeData = await Challenge.findAll({
      include: [
        {
          model: User,
          through: {
            model: UserChallenge,
            // attributes: ["challenge_id", "user_id"],
          },
          where: { id: req.session.user_id },
        },
      ],
    });

    const userChallenges = userChallengeData.map((challenge) =>
      challenge.toJSON()
    );

    res.render("homepage", {
      challenges,
      userChallenges,
      logged_in: req.session.logged_in,
    });
    return;
  }

  res.render("homepage", {
    // challenges,
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

  res.render("profile", {
    posts,
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
          model: UserChallenge,
          // attributes: ["challenge_id", "user_id"],
        },
        where: { id: 1 },
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

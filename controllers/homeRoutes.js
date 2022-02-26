const router = require("express").Router();
const { Op } = require("sequelize");
const withAuth = require("../utils/auth");
const { Challenge, UserChallenge, User, Post } = require("../models");
const { sequelize } = require("../models/User");

// get homepage
router.get("/", withAuth, async (req, res) => {
  // get challenges the user has joined or created
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

  // filter the array of user challenges from line 9 and get an array of just the challenge IDs
  const userChallengeIds = userChallengeData.map((challenge) => challenge.id);

  // get all of the challenges that the user has not yet joined using the "not in" operator. This is finding all challenge IDs that are not in the array from line 27
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

// get login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// get signup page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

// get profile page
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
    order: [
        ['date_created', 'DESC']
      ]
  });




  const posts = postData.map((post) => post.toJSON());

  // Use req.session.user_id to get the current user
  const userData = await User.findByPk(req.session.user_id);

  // This is a fancy way of mapping the userData and returning it in JSON format
  const user = userData.get({ plain: true });

  // Get the userchallenge data (challenges the user has joined or created) and send it to the profile page (line 112) so that the header of the profile page can use it in the create post modal
  const userChallengeData = await Challenge.findAll({
    include: [
      {
        model: User,
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
    order: [
      ['date_created', 'DESC']
    ]
  });

  const posts = postData.map((post) => post.toJSON());

  // get users challenges for the header here as well
  const userChallengeData = await Challenge.findAll({
    include: [
      {
        model: User,
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

  res.render("homepage-feed", {
    posts,
    userChallenges,
    logged_in: req.session.logged_in,
  });
});

router.get("/challenge/:id", async (req, res) => {
  const challengeData = await Challenge.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ["id", "username"],
        through: {
          model: UserChallenge,
        },
      },
      {
        model: Post,
        attributes: ["text", "date_created"],
        include: [
          {
            model: User,
            attributes: ["username"],
          }
        ]
      }
    ],
  });
  const challenge = challengeData.get({ plain: true });
  console.log(challenge);

  const postData = await Post.findAll({
    where: {
      challenge_id: req.params.id,
    },
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      }
    ]
  });

  const posts = postData.map((post) => post.get({ plain: true }));
  // console.log({challenge});
  res.render("challenge", {
    ...challenge,
    // posts,
    // logged_in: req.session.logged_in,
  });
});

module.exports = router;

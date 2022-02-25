const router = require("express").Router();
const { Op } = require("sequelize");
const withAuth = require("../utils/auth");
const { Challenge, UserChallenge, User, Post } = require("../models");

// get homepage (/)
router.get("/", withAuth, async (req, res) => {

  // UserChallenge.findAll where user_id = current users
  // const currentUserChallengeData = UserChallenge.findAll({
  //   where: {
  //     user_id: req.session.user_id
  //   }
  // })

  // Build a list of challenge ids the user does have (here we are mapping line 9 and returning a list of the challenge_id column)
  // const currentUserChallenges = currentUserChallengeData.map(challenge => {
  //   console.log(challenge);
  //   // return challenge.challenge_id;
  // })

  // const challengeData = await Challenge.findAll({
  //   // where: {
  //   //   id: {
  //   //     // Where id is not in the list of known ids
  //   //   }
  // });

  // const challenges = challengeData.map((challenge) => challenge.toJSON());

  // get users challenges
  if (req.session.logged_in) {
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

    const userChallengeIds = userChallengeData.map(challenge => challenge.id)

    const notjoinedChallengeData = await Challenge.findAll({
      where: {
        id: {
          [Op.notIn]: userChallengeIds
        }
      }
    });

    // const notJoinedChallenges = notJoinedData.map((challenge) => challenge.toJSON());

    const notjoinedIds = notjoinedChallengeData.map((challenge) => challenge.id);


    console.log(userChallengeIds)
    console.log(notjoinedIds)


    res.render("homepage", {
      // challenges,
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

  // Use req.session.user_id to get the current user
  const userData = await User.findByPk(req.session.user_id)
  const user = userData.get({ plain: true });

  res.render("profile", {
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

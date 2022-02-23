const router = require("express").Router();
const { Challenge, UserChallenge, User } = require("../models");

// get homepage (/)
router.get("/", async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  const challengeData = await Challenge.findAll();

  const challenges = challengeData.map((challenge) => challenge.toJSON())

  // get users challenges
  const userChallengeData = await Challenge.findAll({
    include:[
      {
        model: User,
        through: {
          model: UserChallenge,
          // attributes: ["challenge_id", "user_id"],
        }, 
        where: {id: req.session.user_id}
      }
    ]
  });
  const userChallenges = userChallengeData.map((challenge) => challenge.toJSON());

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




module.exports = router;

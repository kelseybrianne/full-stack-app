const router = require("express").Router();
const { Challenge, UserChallenge, User } = require("../models");

// get homepage (/)
router.get("/", async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  const userChallengeData = await Challenge.findAll({
    include:[
      {
        model: User,
        through: {
          model: UserChallenge,
          // attributes: ["challenge_id", "user_id"],
        }, 
        where: {id: 1}
      }
    ]
    // attributes: { exclude: ['password'] },
    // order: [['name', 'ASC']],
  });
  const userChallenges = userChallengeData.map((challenge) => challenge.toJSON());


  // get users challenges




  res.render("homepage", {
    userChallenges,
    logged_in: req.session.logged_in,

    // userChallenges
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

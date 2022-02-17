const router = require("express").Router();
const { Challenge } = require("../models");

// get homepage (/)
router.get("/", async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  const challengeData = await Challenge.findAll({
    // attributes: { exclude: ['password'] },
    // order: [['name', 'ASC']],
  });
  const challenges = challengeData.map((challenge) => challenge.toJSON());

  res.render("homepage", {
    challenges,
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

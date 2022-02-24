const router = require('express').Router();
const { Challenge, UserChallenge } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newChallenge = await Challenge.create({
      ...req.body,
    });
    
    await UserChallenge.create({
      user_id: req.session.user_id,
      challenge_id: newChallenge.id
    })

    res.status(200).json(newChallenge);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

module.exports = router;
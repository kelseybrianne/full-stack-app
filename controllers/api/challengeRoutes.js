const router = require('express').Router();
const { Challenge } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newChallenge = await Challenge.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newChallenge);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
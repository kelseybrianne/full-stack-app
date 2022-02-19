const router = require('express').Router();
const { UserChallenge } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newUserChallenge = await UserChallenge.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newUserChallenge);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
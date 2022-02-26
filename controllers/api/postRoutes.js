const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const newChallenge = await Post.create({
        ...req.body,
        user_id: req.session.user_id
      });
  
      res.status(200).json(newChallenge);
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  });
  
  module.exports = router;
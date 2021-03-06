const router = require('express').Router();
const userRoutes = require('./userRoutes');
const challengeRoutes= require('./challengeRoutes');
const postRoutes= require('./postRoutes');
const userChallengeRoutes = require('./userChallengeRoutes')

router.use('/users', userRoutes);
router.use('/challenge', challengeRoutes);
router.use('/post', postRoutes);
router.use('/userChallenge', userChallengeRoutes); 

module.exports = router;
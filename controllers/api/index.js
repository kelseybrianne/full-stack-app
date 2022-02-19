const router = require('express').Router();
const userRoutes = require('./userRoutes');
const userChallengeRoutes = require('./userChallengeRoutes')

router.use('/users', userRoutes);
router.use('/userChallenge', userChallengeRoutes); 

module.exports = router;
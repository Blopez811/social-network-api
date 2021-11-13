const router = require('express').Router();
const userRoutes = require('./user-routes');

router.use('/users', userRouters);

module.exports = router;
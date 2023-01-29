const express = require('express');
const router = express.Router();

router.use('/questions', require('./question'));


module.exports = router;
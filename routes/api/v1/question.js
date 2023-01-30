const express = require('express');

const router = express.Router();

const questionController = require('../../../controller/api/v1/questionController');

router.post('/createQuestion', questionController.createQuestion);

router.get('/:id/view', questionController.viewQuestion);

router.delete('/:id/delete', questionController.deleteQuestion);


module.exports = router;
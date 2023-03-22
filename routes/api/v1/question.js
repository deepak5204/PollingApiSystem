const express = require('express');

const router = express.Router();

const questionController = require('../../../controller/api/v1/questionController');

router.post('/create_question', questionController.createQuestion);

router.get('/:id/view', questionController.viewQuestion);

router.get('/getAll', questionController.getAllQuestions)

router.delete('/:id/delete', questionController.deleteQuestion);


module.exports = router;
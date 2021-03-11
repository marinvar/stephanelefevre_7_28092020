const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const formValidator = require('../middleware/form-validator');

router.post('/createComment', auth, formValidator, commentCtrl.createComment);
router.get('/getComments', auth, commentCtrl.getComments);

module.exports = router;
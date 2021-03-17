const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const formValidator = require('../middleware/form-validator');

router.get('/getComments', auth, commentCtrl.getComments);
router.post('/createComment', auth, formValidator, commentCtrl.createComment);
router.put('/editComment', auth, commentCtrl.editComment);
router.delete('/deleteComment', auth, commentCtrl.deleteComment);

module.exports = router;
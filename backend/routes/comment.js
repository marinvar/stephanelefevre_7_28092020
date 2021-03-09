const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/createComment', auth, commentCtrl.createComment);
router.post('/getComments', auth, commentCtrl.getComments);

module.exports = router;
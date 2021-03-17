const express = require('express');
const router = express.Router();

const discussionCtrl = require('../controllers/discussion');
const auth = require('../middleware/auth');
const pseudoDecrypter = require('../middleware/pseudo-decrypter');
const formValidator = require('../middleware/form-validator');
const multer = require('../middleware/multer-config');

router.post('/createDiscussion', auth, multer, formValidator, discussionCtrl.createDiscussion);
router.get('/getDiscussions', auth, pseudoDecrypter, discussionCtrl.getDiscussions);
router.get('/getDiscussionsFiltered', auth, formValidator, pseudoDecrypter, discussionCtrl.getDiscussionsFiltered);

module.exports = router;
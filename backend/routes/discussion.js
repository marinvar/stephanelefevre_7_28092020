const express = require('express');
const router = express.Router();

const discussionCtrl = require('../controllers/discussion');
const auth = require('../middleware/auth');
const pseudoDecrypter = require('../middleware/pseudo-decrypter');
const formValidator = require('../middleware/form-validator');

router.post('/createDiscussion', auth, formValidator, discussionCtrl.createDiscussion);
router.get('/getDiscussions', auth, pseudoDecrypter, discussionCtrl.getDiscussions);
router.get('/getDiscussionsFiltered', auth, formValidator, pseudoDecrypter, discussionCtrl.getDiscussionsFiltered);
/* router.post('/signout', auth, discussionCtrl.signout); */

module.exports = router;
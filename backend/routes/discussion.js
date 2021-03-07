const express = require('express');
const router = express.Router();

const discussionCtrl = require('../controllers/discussion');
const auth = require('../middleware/auth');
const pseudoDecrypter = require('../middleware/pseudo-decrypter');

router.post('/createDiscussion', auth, discussionCtrl.createDiscussion);
router.get('/getDiscussions', pseudoDecrypter, discussionCtrl.getDiscussions);
router.post('/getDiscussionsFiltered', pseudoDecrypter, discussionCtrl.getDiscussionsFiltered);
/* router.post('/signout', auth, discussionCtrl.signout); */

module.exports = router;
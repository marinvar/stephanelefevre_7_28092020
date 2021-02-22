const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const mailCrypter = require('../middleware/mail-crypter');
const pseudoCrypter = require('../middleware/pseudo-crypter');
const mailValidator = require('../middleware/mail-validator');
const loginSlowdown = require('../middleware/login-slowdown');
const passwordStrength = require('../middleware/password-strength');

router.post('/signup', passwordStrength, mailValidator, mailCrypter, pseudoCrypter, userCtrl.signup);
router.post('/login', loginSlowdown, pseudoCrypter,userCtrl.login);
router.post('/signout', auth, mailValidator, pseudoCrypter, userCtrl.signout);

module.exports = router;
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = User.build({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: hash
    });
    user.save()
    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
    .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
}

/**
 * function permitting a registered user to login to application
 */
exports.login = (req, res, next) => {
  User.findOne({ where: { pseudo: req.body.pseudo } })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
      }
      res.status(200).json({
        userId: user.id,
        token: jwt.sign(
          { userId: user.id },
          process.env.TOKEN_PASS,
          { expiresIn: '24h' }
        )
      });
    })
    .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

/**
 * function permitting user deletion from database
 */
exports.signout = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    User.destroy({ where: { email: req.body.email } })
    .then(()=> res.status(200).json({ message: 'Utilisateur effacé !' }))
    .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Discussion = require('../models/Discussion');
const { getDiscussions } = require('./discussion');

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
    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
    .catch(error => res.status(400).json({ errorMessage:error, error: "Pseudo et / ou email déjà utilisés..." }));
  })
  .catch(error => res.status(500).json({ errorMessage:error, error: "Erreur lors de la création de l'utilisateur" }));
}

/**
 * function permitting a registered user to login to application
 */
exports.login = (req, res, next) => {
  User.findOne({ where: { pseudo: req.body.pseudo } })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé !" });
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: "Mot de passe incorrect !" });
      }
      res.status(200).json({
        isAdmin: user.isAdmin,
        userId: user.id,
        token: jwt.sign(
          { userId: user.id },
          process.env.TOKEN_PASS,
          { expiresIn: process.env.PERSIST_TIME }
        )
      });
    })
    .catch(error => {
      res.status(500).send({
         message:
          error.message || "Une erreur est survenue lors de la recherche de l'utilisateur." 
      });
    });
  })
  .catch(error => {
    res.status(500).send({
       message:
        error.message || "Une erreur est survenue lors de la recherche de l'utilisateur." 
    });
  });
};

/**
 * function permitting user deletion from database
 */
exports.signout = (req, res, next) => {
  User.findOne({ where: { pseudo: req.body.pseudo } })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé !", message: "Utilisateur non trouvé !" });
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: "Mot de passe incorrect !" });
      }
      const updateDiscussion = (discussion) => {
        return new Promise(resolve => {
          resolve(discussion.update({ UserId: 1} ))
        })
      }
      Discussion.findAll({ where: { UserId: user.id } })
      .then((discussions) => {
        Promise.all(
          discussions.map(d => updateDiscussion(d))
        )
        .then(() => {
          User.destroy({ where: { id: user.id } })
          .then(() => {
            return res.status(200).json({ message: 'Utilisateur supprimé !' });
          })
          .catch(error => {
            message:
            error.message || "Une erreur est survenue lors de la suppression de l'utilisateur." 
          })
        })
        .catch(error => {
          message:
          error.message || "Une erreur est survenue lors de la suppression des discussions." 
        });
      })
      .catch(error => {
        message:
        error.message || "Une erreur est survenue lors de la recherche des discussions de l'utilisateur." 
      });
    })
    .catch(error => {
      message:
      error.message || "Une erreur est survenue lors de la recherche de l'utilisateur." 
    });
  })
  .catch(error => {
    message:
    error.message || "Une erreur est survenue lors de la suppression de l'utilisateur." 
  });
};
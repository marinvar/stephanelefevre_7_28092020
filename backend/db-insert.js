const bcrypt = require('bcrypt');
const crypto = require('crypto');

const User = require('./models/User');
const Discussion = require('./models/Discussion');
const Comment = require('./models/Comment');

const encryptEmail = (email) => {
  const secret = process.env.EMAIL_PASS;
  return crypto.createHmac('sha256', secret)
                         .update(email)
                         .digest('hex');
};

const encryptPseudo = (pseudo) => {
  const secret = process.env.PSEUDO_PASS;
  const concat = pseudo + '_' + secret;
  return Buffer.from(concat).toString('hex');
}

exports.insertData = () => {
  bcrypt.hash("An0nym0us", 10)
  .then(hash => {
    User.findOrCreate({
      where: { id: 1 },
      defaults: {
        pseudo: encryptPseudo("Utilisateur effacé"),
        email: encryptEmail("anonymous@groupomania.com"),
        password: hash,
        isAdmin: true
      }
    })
    .then(() => {
    bcrypt.hash("rhMAST3R", 10)
    .then(hash1 => {
      User.findOrCreate({
        where: { id: 2 },
        defaults: {
          pseudo: encryptPseudo("rhMaster"),
          email: encryptEmail("rhmaster@groupomania.com"),
          password: hash1,
          isAdmin: true
        }
      })
      .then(() => {
        bcrypt.hash("darkB1RD", 10)
        .then(hash2 => {
          User.findOrCreate({
            where: { id: 3 },
            defaults: {
              pseudo: encryptPseudo("darkBird"),
              email: encryptEmail("darkbird@groupomania.com"),
              password: hash2
            }
          })
        })
        .catch(error => console.log({ error }))
        .then(() => {
          bcrypt.hash("countingCR0W", 10)
          .then(hash3 => {
            User.findOrCreate({
              where: { id: 4 },
              defaults: {
                pseudo: encryptPseudo("countingCrow"),
                email: encryptEmail("countingcrow@groupomania.com"),
                password: hash3
              }
            })
            .then(() => {
              Discussion.findOrCreate({
                where: { id: 1 },
                defaults: {
                  subject: "Bienvenue à toutes et tous",
                  message: "Une petite note de votre manager RH pour vous demander de respecter vos collègues sur le nouveau réseau social",
                  UserId: 2,
                  created_at: '2021-03-10 15:49:52',
                  updated_at: '2021-03-10 15:49:52'
                }
              })
              .then(() => {
                Comment.findOrCreate({
                  where: { id: 3 },
                  defaults: {
                    comment: "Merci pour ce petit rappel... On va les bichonner !!!",
                    author: "countingCrow",
                    DiscussionId: 1,
                    created_at: '2021-03-11 13:42:38',
                    updated_at: '2021-03-11 13:42:28'
                  }
                });
              })
              .catch(error => console.log({ error }));
              Discussion.findOrCreate({
                where: { id: 2 },
                defaults: {
                  subject: "Merci pour ce bel outil",
                  message: "Un grand merci de la part de l'équipe de nuit pour ce bel outil que l'on commence à prendre en main !",
                  UserId: 3,
                  created_at: '2021-03-11 04:38:19',
                  updated_at: '2021-03-11 04:38:19'
                }
              })
              .then(() => {
                Comment.findOrCreate({
                  where: { id: 2 },
                  defaults: {
                    comment: "Notre direction vous remercie pour le travail effectué par vos équipes !",
                    author: "rhMaster",
                    DiscussionId: 2,
                    created_at: '2021-03-11 08:19:32',
                    updated_at: '2021-03-11 08:19:32'
                  }
                });
                Comment.findOrCreate({
                  where: { id: 4 },
                  defaults: {
                    comment: "Je transmettrai vos remerciements aux équipes...",
                    author: "darkBird",
                    DiscussionId: 2,
                    created_at: '2021-03-11 21:13:43',
                    updated_at: '2021-03-11 21:13:43'
                  }
                });
              })
              .catch(error => console.log({ error }));
              Discussion.findOrCreate({
                where: { id: 3 },
                defaults: {
                  subject: "Bienvenue !",
                  message: "Bienvenue aux nouveaux arrivants ! Pensez à passer à la comptabilité pour recevoir vos documents d'intégration...",
                  UserId: 4,
                  created_at: '2021-03-11 13:17:35',
                  updated_at: '2021-03-11 13:17:35'
                }
              })
              .then(() => {
                Comment.findOrCreate({
                  where: { id: 1 },
                  defaults: {
                    comment: "Merci, je ne manquerai pas de passer prendre un café en même temps...",
                    author: "darkBird",
                    DiscussionId: 3,
                    created_at: '2021-03-11 14:12:03',
                    updated_at: '2021-03-11 14:12:03'
                  }
                });
              })
              .catch(error => console.log({ error }));
            })
            .catch(error => console.log({ error }));
          })
          .catch(error => console.log({ error }));
        })
        .catch(error => console.log({ error }));
      })
      .catch(error => console.log({ error }));
    })
    .catch(error => console.log({ error }));
  })
  .catch(error => console.log({ error }));
  })
  .catch(error => console.log({ error }));
}
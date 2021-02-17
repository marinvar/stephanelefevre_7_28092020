const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const path = require('path');

/* const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user'); */


/* mongoose.connect(`${process.env.DB_CONNECT}`,
{ useNewUrlParser: true,
useUnifiedTopology: true }) */
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});
/* .then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !')); */
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const app = express();

/**
 * Helmet is used for security purposes, to avaoid several attacks like xss
 */
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

/* app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes); */

module.exports = app;
const { Sequelize } = require('sequelize');

const User = require('./models/User');
const Discussion = require('./models/Discussion');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

exports.dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

exports.dbTablesSync = async () => {
  try {
    await User.sync({ alter: false, force: false });
    console.log('The table for the User model was just synchronized !');
  } catch (error) {
    console.error('Problem during the User model synchronization !', error);
  }
  try {
    await Discussion.sync({ alter: false, force: false });
    console.log('The table for the Discussion model was just synchronized !');
  } catch (error) {
    console.error('Problem during the Discussion model synchronization !', error);
  }
};
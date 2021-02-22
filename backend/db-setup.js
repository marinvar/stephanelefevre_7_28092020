const { Sequelize } = require('sequelize');

const User = require('./models/User');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

exports.dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    /* dbTablesSync(); */
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

exports.dbTablesSync = async () => {
  try {
    await User.sync({ alter: true });
    console.log('The table for the User model was just synchronized !');
  } catch (error) {
    console.error('Problem during the User model synchronization !', error);
  }
};
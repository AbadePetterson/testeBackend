const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
  //logging: false,
  //logging: console.error,
});

sequelize.authenticate()
.then(() => {
  console.info('[*] Database connection has been established successfully.');
})
.catch((error) => {
  console.error('[-] Unable to connect to the database:', error);
});


module.exports = sequelize;

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, { dialectOptions: { ssl: { rejectUnauthorized: false } } });
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));
const gt = Sequelize.Op.gt;
const Avatar = require("./avatars.js")(sequelize, Sequelize.DataTypes);
const User = require("./users.js")(sequelize, Sequelize.DataTypes);
const Game = require("./games.js")(sequelize, Sequelize.DataTypes);
Avatar.hasMany(User);
User.belongsTo(Avatar);
User.belongsToMany(Game, { through: 'UserGame' });
Game.belongsToMany(User, { as: 'Players', through: 'UserGame' });
User.hasMany(Game, { foreignKey: 'winnerId', as: 'WonGames' });
Game.belongsTo(User, { foreignKey: 'winnerId' });
//Avatar.sync().then(() => User.sync().then(() => Game.sync()));
sequelize.sync(); //drop: { force: true }{ force: true }
module.exports = { sequelize, gt, User, Avatar, Game };
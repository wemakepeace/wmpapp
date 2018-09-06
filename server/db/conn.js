const Sequelize = require('sequelize');

const database = process.env.DATABASE_URL || 'postgres://localhost/wmp';

console.log('database', database);

const conn = new Sequelize(database, { dialect: 'postgres' });

module.exports = conn;

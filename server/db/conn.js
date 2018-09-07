const Sequelize = require('sequelize');
const environment = process.env.NODE_ENV;
let conn;

if (environment === 'development') {
    conn = new Sequelize(process.env.DATABASE_URL, { logging: false, dialect: 'postgres' });
} else {
    const sequelizeProductionConfig = require('../../sequelize.config.js');
    conn = new Sequelize(sequelizeProductionConfig);
}

module.exports = conn;

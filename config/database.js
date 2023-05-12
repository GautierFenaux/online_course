/**
 * Import Sequelize.
 */
const Sequelize = require("sequelize");

/**
 * Create a Sequelize instance. This can be done by passing
 * the connection parameters separately to the Sequelize constructor.
 */
const sequelize = new Sequelize("cours_en_ligne", "postgres", "root", {
    host: "127.0.0.1",
    port: 5433,
    dialect: "postgres"
});

/**
 * Export the Sequelize instance. This instance can now be 
 * used in the app.js file to authenticate and establish a database connection.
 */
module.exports = sequelize;
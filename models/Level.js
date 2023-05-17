const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

/**
 * Define a model that can be managed by Sequelize.
 */
const Level = sequelize.define(
  "level",
  {
    level: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);


module.exports = Level;

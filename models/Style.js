const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

/**
 * Define a model that can be managed by Sequelize.
 */
const Style = sequelize.define(
  "style",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

module.exports = Style;

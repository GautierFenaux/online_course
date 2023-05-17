const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

/**
 * Define a model that can be managed by Sequelize.
 */
const Instrument = sequelize.define(
  "instrument",
  {
    name: {
      type: DataTypes.STRING,
    },
    family: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

module.exports = Instrument;

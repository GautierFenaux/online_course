const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Timetable = require('../models/Timetable');


/**
 * Define a model that can be managed by Sequelize.
 */
const Lesson = sequelize.define("lesson", {
    numberOfHours: {
        type: DataTypes.INTEGER,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: true,
    },
    topic: {
        type: DataTypes.STRING
    },
    instrument: {
        type: DataTypes.STRING(100),
    },
    });

module.exports = Lesson;

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require('./User');
const Lesson = require('./Lesson');

/**
 * Define a model that can be managed by Sequelize.
 */
const Timetable = sequelize.define("timetable", {
    name: {
        type: DataTypes.STRING,
    },
    });

    // Timetable.associate = (models) => {
    //     Timetable.belongsToMany(models.Lesson, { as: 'TimetablesForLesson', through: models.TimetableLesson, foreignKey: 'timetableID'});
    // }

    // Timetable.belongsToMany(Lesson, { through: 'Timetable_Lesson' });


Timetable.belongsTo(User);
module.exports = Timetable;
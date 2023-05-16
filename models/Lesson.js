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
        unique: false,
    },
    topic: {
        type: DataTypes.STRING
    },
    instrument: {
        type: DataTypes.STRING(100),
    },
    });

    // Lesson.associate = (models) => {
    //     Lesson.belongsToMany(models.Timetable, { as: 'LessonsInTimetable', through: models.TimetableLesson, foreignKey: 'lessonID'});
    // }
    // Lesson.belongsToMany(Timetable, { through: 'Timetable_Lesson' });

module.exports = Lesson;
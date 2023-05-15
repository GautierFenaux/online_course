const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Timetable = require('../Timetable');
const Lesson = require('../Lesson');

/**
 * Define a model that can be managed by Sequelize.
 */
const TimetableLessons = sequelize.define("timetable_lesson", {
    TimetableID: {
        type: Sequelize.INTEGER,
        references: {
            model: Timetable,
            key: "id"
        }
    },
    LessonID: {
        type: Sequelize.INTEGER,
        references: {
            model: Lesson,
            key: "id"
        },
    }
    });


TimetableLessons.belongsTo(Lesson, {as: 'Lesson', foreignKey: 'LessonID'});
TimetableLessons.belongsTo(Timetable, {as: 'Timetable', foreignKey: 'TimetableID'});

module.exports = TimetableLessons;
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Timetable = require('../Timetable');
const Lesson = require('../Lesson');

/**
 * Define a model that can be managed by Sequelize.
 */
const TimetableLessons = sequelize.define("timetable_lesson", {
    
    // id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false
    //   },
    
    
    TimetableID: {
        type: Sequelize.INTEGER,
        references: {
            model: Timetable,
            key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        unique: 'unique-timetable-per-lesson',
    },
    
    LessonID: {
        type: Sequelize.INTEGER,
        references: {
            model: Lesson,
            key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        unique: 'unique-timetable-per-lesson'
    }
    });



// TimetableLessons.associate = (models) => {
//     TimetableLessons.belongsTo(models.Lesson, {as: 'Lesson', foreignKey: 'LessonID'});
//     TimetableLessons.belongsTo(models.TimetableLessons, {as: 'Timetable', foreignKey: 'TimetableID'});
// }

module.exports = TimetableLessons;
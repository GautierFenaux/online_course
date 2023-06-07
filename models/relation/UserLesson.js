const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require('../User');
const Lesson = require('../Lesson');

/**
 * Define a model that can be managed by Sequelize.
 */
const UserLesson = sequelize.define("user_lesson", {
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
    // LessonId: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //         model: Lesson,
    //         key: "id"
    //     },
    //     onDelete: 'cascade',
    //     onUpdate: 'cascade',
    // }
    }, {timestamps: false});

    User.belongsToMany(Lesson, { through: 'user_lesson'});
    Lesson.belongsToMany(User, { through: 'user_lesson' });


module.exports = UserLesson;
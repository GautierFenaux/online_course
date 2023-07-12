const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require('../User');
const Lesson = require('../Lesson');

/**
 * Define a model that can be managed by Sequelize.
 */
const UserLessons = sequelize.define('user_lesson', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
  }, { timestamps: false });

  User.hasMany(UserLessons);
  UserLessons.belongsTo(User);
  
  // Also setup a One-to-Many relationship between Profile and Grant
  Lesson.hasMany(UserLessons);
  UserLessons.belongsTo(Lesson);

module.exports = UserLessons; 
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Level = require('../models/Level');
const Style = require('../models/Style');
/**
 * Define a model that can be managed by Sequelize.
 */
const User = sequelize.define("user", {
    firstname: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
    }
    },
    password: {
        type: DataTypes.STRING
    },
    token: {
        type: DataTypes.STRING(100),
    },
    refreshToken: {
        type: DataTypes.STRING(200),
    },
    roles: {
        type: Sequelize.STRING,
        defaultValue: 'Student',
    },
    });
    Level.hasMany(User);
    User.belongsTo(Level);
    
module.exports = User;
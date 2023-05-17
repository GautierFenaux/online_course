const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require('../User');
const Style = require('../Style');

/**
 * Define a model that can be managed by Sequelize.
 */
const UserStyle = sequelize.define("user_style", {
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
    styleId: {
        type: Sequelize.INTEGER,
        references: {
            model: Style,
            key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    }
    }, {timestamps: false});

    User.belongsToMany(Style, { through: 'user_style'});
    Style.belongsToMany(User, { through: 'user_style' });

module.exports = UserStyle;
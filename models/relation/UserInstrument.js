const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require('../User');
const Instrument = require('../Instrument');

/**
 * Define a model that can be managed by Sequelize.
 */
const UserInstrument = sequelize.define("user_instrument", {
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
    instrumentId: {
        type: Sequelize.INTEGER,
        references: {
            model: Instrument,
            key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    }
    }, {timestamps: false});

module.exports = UserInstrument;
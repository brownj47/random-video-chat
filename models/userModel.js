const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class User extends Model { };

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        vaidate: {
            isEmail: true
        }
    },
}, {
    sequelize
}
);

module.exports = User;
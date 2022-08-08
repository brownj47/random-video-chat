// import sequelize dependencies
const { Model, DataTypes } = require('sequelize');
// import sequelize connection
const sequelize = require('../config/connection.js');

// create a user table with id, username, email, password, timestamps
class Room extends Model { };

Room.init({
    occupants: {
        type: DataTypes.INTEGER,
        defaultValue:1
    }
}, {
    sequelize
}
);

module.exports = Room;
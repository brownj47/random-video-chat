// import sequelize dependencies
const { Model, DataTypes } = require('sequelize');
// import sequelize connection
const sequelize = require('../config/connection.js');

// create a user table with id, occupants, and timestamps
class Room extends Model { };

Room.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true
    },
    occupants: {
        type: DataTypes.INTEGER,
        defaultValue:1
    }
}, {
    sequelize
}
);

module.exports = Room;
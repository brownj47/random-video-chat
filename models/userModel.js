// import sequelize dependencies
const { Model, DataTypes } = require('sequelize');
// import sequelize connection
const sequelize = require('../config/connection.js');
// import bcrypt
const bcrypt = require('bcrypt')

// create a user table with id, username, email, password, timestamps
class User extends Model { };

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
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
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    hooks:{
        // Hash password before upload
        beforeCreate:userObj=>{
            userObj.password = bcrypt.hashSync(userObj.password,4);
            return userObj;
        }
    }
}
);

module.exports = User;
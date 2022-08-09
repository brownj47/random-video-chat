// get dependencies
const sequelize = require('../config/connection.js');
const User = require('../models/userModel.js');

// create user data
const users = [
    {
        username: "BobbyMan",
        email: 'bob@bob.com',
        password: 'babpassword',
    },
    {
        username: "Justus",
        email: 'justus@bob.com',
        password: 'JB1234567',
    },
    {
        username: "Gabeth",
        email: 'gbeth@bob.com',
        password: 'verysecret',
    }
];
// seed that data into the database, hashing all passwords
async function seed(){
    await sequelize.sync({force:true});
    await User.bulkCreate(users, {individualHooks: true});
    process.exit(0);
};
seed();
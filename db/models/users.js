//communication with backend and mySQL
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const { findByPid } = require('./interfaces');

module.exports = (db, userStatuses, userTypes) => {
    // 'users' is going to be the name of the table
    const Users = db.define('users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true 
        },
        firstName: {
            allowNull: false,
            type: Sequelize.STRING
        },
        lastName: {
            allowNull: false,
            type: Sequelize.STRING
            // type: Sequelize.STRING(35)
            // defaults to 255 if length not specified
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING(60)
        },
        // pid is public id
        // this is a security measure
        pid:{
            allowNull: false,
            // UUID is essentially a string that uses hexvalues
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        }
    }, {
        hooks: {
            // function to call before creating in database
            beforeCreate: async user => {
                //bcrypt outputs only in 60 characters only
                const hash = await bcrypt.hash(user.password, 10);

                user.password = hash;
                user.email = user.email.toLowerCase();
            }
        },
        // when you delete stuff, it does soft deletes
        paranoid: true
    });
    // creates the indexing between the users table and the user statuses & user types
    // connects the tables together
    Users.belongsTo(userStatuses);
    Users.belongsTo(userTypes);

    // compares user's password and the password that was inputted
    // this is a helper function
    Users.prototype.comparePasswords = function (candidatePassword){
        return new Promise ((resolve, reject) => {
            bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
                if(err){
                    return reject(err);
                }
                resolve(isMatch);
            });
        });
    }
    // model level
    Users.findByPid = findByPid;

    return Users;
}
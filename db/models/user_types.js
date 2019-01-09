const Sequelize = require('sequelize');
const { findByMid } = require('./interfaces')

module.exports = db => {
    const UserTypes = db.define('userTypes', {
        description : {
            allowNull: true,
            type: Sequelize.STRING
        },
        id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // machine id: is so that it is quasi human readable so we can search for statuses
        // looks like: super_admin, admin, etc
        mid:{
            allowNull: false,
            type: Sequelize.STRING
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING
        }
    }, {
        paranoid: true
    });

    UserTypes.findByMid = findByMid;

    return UserTypes;
}
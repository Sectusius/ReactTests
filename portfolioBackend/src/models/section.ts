import {db} from '../db';
 
db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((err: any) => {
    console.error('Unable to connect to the database:', err);
});

const {Sequelize, DataTypes} = require('sequelize');

const Section = db.define('Section', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
});

db.sync().then(() => {
    console.log('Section table created');
}).catch((err: any) => {
    console.error('Unable to create Section table:', err);
});


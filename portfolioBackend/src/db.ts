import dotenv from 'dotenv';
dotenv.config();
const Sequelize = require('sequelize');

export const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);
import mysql from 'mysql2';
import {db} from './db';


db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}
).catch((err: any) => {
    console.error('Unable to connect to the database:', err);
});
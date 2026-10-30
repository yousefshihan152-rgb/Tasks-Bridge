import mysql from 'mysql2/promise' ; import fs from 'fs/promises'; import bcrypt from 'bcrypt'
import { client_login_by_email, client_login_by_phone_number, client_login_by_username, worker_login_by_email, worker_login_by_username, wroker_login_by_phone_number } from './db_get_check.js'
import { add_worker, add_client } from './db_add.js';


const db = mysql.createPool({
    host: process.env.db_host,
    port: Number(process.env.db_port),
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


async function add_error(error) {
    try {
        let error_message = `[${new Date().toISOString()}] ${error.stack || error.message || error}\n`;
        await fs.appendFile('../errors.txt', error_message, 'utf-8');
    } catch (fs_error) {
        console.error('error happened during writing the error: ', fs_error);
    }
}


export {
    db,
    add_error,
    add_worker,
    add_client,
    client_login_by_email,
    client_login_by_phone_number,
    client_login_by_username,
    worker_login_by_email,
    worker_login_by_username,
    wroker_login_by_phone_number,

}
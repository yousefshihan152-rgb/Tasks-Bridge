import mysql2 from 'mysql2/promise';
import fs from 'fs/promises';

const db = mysql2.createPool({ 
    database: process.env.db_name, 
    user: process.env.db_user, 
    host: process.env.db_host, 
    port: process.env.db_port, 
    password: process.env.db_password , 
    waitForConnections: true, 
    connectionLimit: 10, 
    queueLimit: 0
});

async function add_error(error) {
    try { 
        const now = new Date()
        let [year, month, day, hour, minute] = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes()];
        fs.appendFile("../errors.txt", `${error}|${year}-${month}-${day}-${hour}-${minute}`, `utf-8`)
    } catch ( error ) { add_error(error) }
}

export { db, add_error }
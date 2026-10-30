import { db, add_error } from "./database.js";

async function add_worker(name, username, phone_number, email, skill, description, rate, password, profile_picture_link) {

    let sentence = "INSERT INTO wrokers(worker_name, username, phone_number, email, skill, worker_description, rate, passkey, profile_picture_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let data = [name, username, phone_number, email, skill, description, rate, await bcrypt.hash(password, 10), profile_picture_link];

    try { await db.execute(sentence, data) }
    catch ( error ) { await add_error(error) ; return "error" }

    return "success"

}

async function add_client(name, username, phone_number, email, password, profile_picture_link) {

    let sentence = "INSERT INTO clients (client_name, username, phone_number, email, passkey, profile_picture_link) VALUES (?, ?, ?, ?, ?, ?)";
    let data = [name, username, phone_number, email, await bcrypt.hash(password, 10), profile_picture_link];
    
    try { await db.execute(sentence, data) }
    catch ( error ) { await add_error(error) ; return "error" }

    return "success"

}

export {
    add_worker,
    add_client
}
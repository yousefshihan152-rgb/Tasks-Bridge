import { db, add_error } from './database.js'

async function client_login_by_email(email, password) {

    let result;
    let sentence = "SELECT email, passkey FROM client WHERE email = ?";

    try { 
        [result] = await db.execute(sentence, [email]); 
        if ( result && result.length > 0 && await bcrypt.compare(password, result[0].passkey) ) { return result } 
    }
    catch ( error ) { await add_error(error) ; return "error" }

    return 'not found'

}

async function client_login_by_username(username, password) {

    let result;
    let sentence = "SELECT * FROM clients WHERE username = ?";

    try { 
        [result] = await db.execute(sentence, [username]); 
        if ( result && result.length > 0 && await bcrypt.compare(password, result[0].passkey) ) { return result } 
    }
    catch ( error ) { await add_error(error) ; return "error" }

    return "not found"

}

async function client_login_by_phone_number(phone_number, password) {

    let result;
    let sentence = "SELECT * FROM clients WHERE phone_number = ?";

    try { 
        [result] = await db.execute(sentence, [phone_number]); 
        if ( result && result.length > 0 && await bcrypt.compare(password, result[0].passkey) ) { return result } 
    }
    catch ( error ) { await add_error(error) ; return "error" }

    return "not found"

}

async function worker_login_by_email(email, password) {

    let result;
    let sentence = "SELECT * FROM workers WHERE email = ?";

    try { 
        [result] = await db.execute(sentence, [email]); 
        if ( result && result.length > 0 && await bcrypt.compare(password, result[0].passkey) ) { return result } 
    }
    catch ( error ) { await add_error(error) ; return "error" }

    return "not found"

}

async function worker_login_by_username(username, password) {

    let result;
    let sentence = "SELECT * FROM workers WHERE username = ?";

    try { 
        [result] = await db.execute(sentence, [username]); 
        if ( result && result.length > 0 && await bcrypt.compare(password, result[0].passkey) ) { return result } 
    }
    catch ( error ) { await add_error(error) ; return "error" }

    return "not found"

}

async function wroker_login_by_phone_number(phone_number, password) {

    let result;
    let sentence = "SELECT * FROM workers WHERE phone_number = ?";

    try { 
        [result] = await db.execute(sentence, [phone_number]); 
        if ( result && result.length > 0 && await bcrypt.compare(password, result[0].passkey) ) { return result } 
    }
    catch ( error ) { await add_error(error) ; return "error" }

    return "not found"

}

export {
    client_login_by_email,
    client_login_by_phone_number,
    client_login_by_username,
    worker_login_by_email,
    worker_login_by_username,
    wroker_login_by_phone_number
}
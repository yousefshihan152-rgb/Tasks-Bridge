import { db, add_error } from "./database";


let kinds = ["web development", "games development", "softwere development", "back end development", "front end development", "graphic design", "motion graphic", "UI design", "UX design", "video editing", "cyber security", "data managment", "AI managment", "machine learning", "dev ops", "audio managment", "video managment", "3D design", "adverting"];
let uppercases = "QWERTYUIOPASDFGHJKLXCVBNM";
let numbers = "1234567890";
let symbols = `§±!@#$%^&*()_+-=[]{}|'";:/?.>,<~\\\``;


async function valid_parameter(table, x, y) {

    let result;
    let sentence = "SELECT ? FROM ? WHERE ? = ?";

    try { [result] = await db.execute(sentence, [x, table, x, y]) }
    catch ( error ) { await add_error(error) ; return "error" }

    if ( result || result.length > 0 ) { return false }

    return true

}

async function check_username(username) {

    if ( !username ) { return "please fill the username box" }

    if ( typeof username !== "string" ) {}

    if ( username.length > 30 || username.length < 4 ) { return "your username must be < 31 & > 3 elements" }

    if ( username.includes(" ") ) { return "your username has a space" }

    for ( let i = 0 ; i < username.length ; i++ ) { if ( uppercases.includes(username[i]) ) { return "your username has an uppercase" } }

    if ( !await valid_parameter("workers", "username", username) || !await valid_parameter("clients", "username", username) ) { return "your username is already taken" }

    return "success"

}

async function check_name(name) {

    if ( !name ) { return "please fill the name box" }

    if ( typeof name !== "string" ) { return "your name must be a string" }

    if ( name.length > 101 || name.length < 7 ) { return "your name must be < 102 & > 6 elements" }

    if ( name.includes(" ") ) { return "your name must be at least has one space" }

    for ( let i = 0 ; i < name.length ; i++ ) { if ( numbers.includes(name[i]) || symbols.includes(name[i]) ) { return "your name must be only letters" } }

    return "success"

}

async function check_email(email) {

    let email_content = email.slice(0, -10);

    if ( !email ) { return "please fill the email box" }

    if ( typeof email !== "string" ) { return "the email must be a string" }

    if ( email.length > 250 || email.length < 13 ) { return "your email must be < 251 & > 12 elements" }

    if ( email_content.includes("@") ) { return "your email has two '@'" }

    if ( email.slice(-10) !== "@gmail.com" ) { return "your email must be ends with '@gmail.com'" }

    for ( let i = 0 ; i < email_content.length ; i++ ) { if ( uppercases.includes(email_content[i]) ) { return "your email has an uppercase" } }

    if ( !await valid_parameter("workers", "email", email) || !await valid_parameter("clients", "email", email) ) { return "your email is already taken" }

    return "success"

}

async function check_password(password) {

    if ( !password ) { return "please fill the password box" }

    if ( typeof password !== "string" ) { return "your password must be a string" }

    if ( password.length > 20 || password.length < 8 ) { return "your password must be < 21 & > 7" }

    if ( password.includes(" ") ) { return "your password has a space" }

    return "success"
}

async function check_phone_number(phone_number) {

    if ( !phone_number ) { return "please fill the phone number box" }

    if ( typeof phone_number !== "string" ) { return "the phone number must be string" }

    if ( phone_number.length !== 11 ) { return "the phone number must be 11 numbers" }

    if ( phone_number.slice(0, 3) !== "075" && phone_number.slice(0, 3) !== "077" && phone_number.slice(0, 3) !== "078" && phone_number.slice(0, 3) !== "079" ) { return "your phone number must starts with 075 / 077 / 078 / 079" }

    for ( let i = 0 ; i < phone_number.length ; i++ ) { if ( !numbers.includes(phone_number[i]) ) { return "your phone number must be only numbers" } }

    if ( !await valid_parameter("workers", "phone_number", phone_number) ) { return "your phone number is already taken" }

    return "success"

}

async function check_skill(skill) {

    if ( !skill ) { return "please choose your skill" }

    if ( typeof skill !== "string" ) { return "your skill must be a string" }

    if ( !kinds.includes(skill) ) { return "your skill isn't in our available skills" }

    return "success"

}

async function check_description(description) {

    if ( !description ) { return "please fill the description box" }

    if ( typeof description !== "string" ) { return "your description must be string" }

    if ( description.length > 250 || description.length < 25 ) { return "your description must be < 251 & > 24 elements" }

    return "success"

}


export {
    check_description,
    check_email,
    check_name,
    check_password,
    check_phone_number,
    check_skill,
    check_username,
}
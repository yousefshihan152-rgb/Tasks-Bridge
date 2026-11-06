
let name_elements = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm "

async function check_name(name) {

    if ( !name ) { return "please fill the name box" }

    if ( name.length > 101 || name.length < 7 ) { return "your name must be < 102 & > 6 elements" }

    if ( !name.includes(' ') ) { return "your name must be has a space between two words" }

    for ( let i = 0 ; i < name.length ; i++ ) { if ( !name_elements.includes(name[i]) ) { return "your name must be only letters and space" } }

    return "success"

}

async function check_username(username) {

    if ( !username ) { return "please fill the username box" }

    if ( username.includes(' ') ) { return "your username has a space" }

    if ( username.length > 30 || username.length < 4 ) { return "your username must be < " }

}
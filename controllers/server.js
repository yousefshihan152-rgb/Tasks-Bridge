// don't froget to edit the profile picture system
// import { check_description, check_email, check_name, check_password, check_phone_number, check_skill, check_username } from "../model/check.js";
// import { client_login_by_email, client_login_by_phone_number, client_login_by_username, worker_login_by_email, worker_login_by_username, wroker_login_by_phone_number, add_client, add_error, add_worker } from "../model/database.js";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { check_description, check_skill } from '../model/check';
import { add_client, add_worker } from '../model/database';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 2999;
const link = `http://localhost:${PORT}`;
const uploadDir = path.join(__dirname, '..', 'users_profile_pictures');
app.use('/uploads', express.static(uploadDir));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const index = path.join(__dirname, '..', 'views', 'index.html');
const register = path.join(__dirname, '..', 'views', 'register.html');
const login = path.join(__dirname, '..', 'views', 'login.html');
const home_worker = path.join(__dirname, '..', 'views', 'worker_home.html');
const home_client = path.join(__dirname, '..', 'views', 'client_home.html');
const error = path.join(__dirname, '..', 'views', 'error.html');



// routes
app.get('/error', (req, res) => { res.sendFile(error) })

app.get('/', (req, res) => {
    if ( req.body ) {
        rol = req.body.rol
        if ( rol ) {
            if ( rol === 'login' ) { res.redirect('/login') }
            if ( rol === 'register' ) { res.redirect('/register') }
        }
    } else { res.sendFile(index) }
})

app.post('/regsiter/worker', async (req, res) => {

    if ( req.body ) {
        let name = req.body.name
        let username = req.body.username
        let phone_number = req.body.phone_number
        let email = req.body.email
        let password = req.body.password
        let skill = req.body.skill
        let description = req.body.description

        let checking_name = await check_name(name);
        let checking_username = await check_username(username);
        let checking_phone_number = await check_phone_number(phone_number);
        let checking_email = await check_email(email);
        let checking_password = await check_password(password);
        let checking_skill = await check_skill(skill);
        let checking_description = await check_description(description);

        if ( !checking_name === 'success' ) { return res.send(checking_name) }
        if ( !checking_username === 'success' ) { return res.send(checking_username) }
        if ( !checking_phone_number === 'success' ) { return res.send(checking_phone_number) }
        if ( !checking_email === 'success' ) { return res.send(checking_email) }
        if ( !checking_password === 'success' ) { return res.send(checking_password) }
        if ( !checking_skill === 'success' ) { return res.send(checking_skill) }
        if ( !checking_description === 'success' ) { return res.send(checking_description) }

        let save_data = await add_worker(name, username, phone_number, email, skill, description, 2.5, password, 'none')

        if ( save_data === "success" ) { return res.redirect("/home/worker") }
        res.redirect("/error")
    } res.redirect('/error')
})

app.post('/regsiter/client', async (req, res) => {

    if ( req.body ) {
        let name = req.body.name
        let username = req.body.username
        let phone_number = req.body.phone_number
        let email = req.body.email
        let password = req.body.password

        let checking_name = await check_name(name);
        let checking_username = await check_username(username);
        let checking_phone_number = await check_phone_number(phone_number);
        let checking_email = await check_email(email);
        let checking_password = await check_password(password);

        if ( !checking_name === 'success' ) { return res.send(checking_name) }
        if ( !checking_username === 'success' ) { return res.send(checking_username) }
        if ( !checking_phone_number === 'success' ) { return res.send(checking_phone_number) }
        if ( !checking_email === 'success' ) { return res.send(checking_email) }
        if ( !checking_password === 'success' ) { return res.send(checking_password) }

        let save_data = await add_client(name, username, phone_number, email, password, 'none')

        if ( save_data === "success" ) { return res.redirect("/home/client") }
        res.redirect("/error")
    } res.redirect('/error')
})

app.get('/home/worker', (req, res) => {
    res.sendFile(home_worker)
})

app.post('/home/client', (req, res) => {
    res.sendFile(home_client)
})



// running
app.listen(PORT, () => { console.log(link); });
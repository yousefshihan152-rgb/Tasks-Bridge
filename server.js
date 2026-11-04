// imporing
import express from 'express';
import fileURLToPath from 'url';
import path from 'path';


// initialize
const app = express();
app.use(express.json())
const PORT = process.env.PORT;
const link = `http://127.0.0.1:${PORT}`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// pages
const index = path.join(__dirname, '..', 'views', 'index')
const register = path.join(__dirname, '..', 'views', 'register')
const login = path.join(__dirname, '..', 'views', 'login')
const home = path.join(__dirname, '..', 'views', 'home')
const settings = path.join(__dirname, '..', 'views', 'settings')
const add_task = path.join(__dirname, '..', 'views', 'add_task')
const my_tasks = path.join(__dirname, '..', 'views', 'my_tasks')
const error = path.join(__dirname, '..', 'views', 'error')


// routes
app.get('/', (req, res) => {
    if ( req.body.rol ) {
        if ( req.body.rol === "register" ) { return res.redirect('/register') }
        if ( req.body.rol === "login" ) { return res.redirect('/login') }
    } res.sendFile(index)
})

app.get('/error', (req, res) => { res.sendFile(error) })

app.post('api/register/')

app.listen(PORT, () => { console.log(link) })
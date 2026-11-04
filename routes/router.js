// initialize
import express from 'express';
import controllers from '../controllers/controllers,js';

const router = express.Router()


// routes
router.get('/', controllers.index)

router.get('/error', controllers.error)

router.get('/register', controllers.register)

router.get('/login', controllers.login)

router.get('/home', controllers.home)

router.get('/settings', controllers.settings)

router.get('/my_tasks', controllers.my_tasks)

router.get('/add_task', controllers.add_task)

router.get('/api/freelancer/register', controllers.api_freelancer_register)

router.get('/api/freelancer/login', controllers.api_freelancer_login)

router.get('/api/freelancer/home', controllers.api_freelancer_home)

router.get('/api/client/regsiter', controllers.api_client_register)

router.get('/api/client/login', controllers.api_client_login)

router.get('/api/client/home', controllers.api_client_home)

router.get('/api/settings', controllers.api_settings)

router.get('/api/chat', controllers.chat)

router.get('/my_tasks', controllers.my_tasks)

router.get('/add_task', controllers.add_task)


export { router }
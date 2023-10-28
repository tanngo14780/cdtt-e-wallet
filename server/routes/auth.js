import express from 'express';
import {  login, loginAdmin } from '../controllers/auth.js';

const router = express.Router();

//LOGIN
router.post('/login/admin', loginAdmin);
router.post('/login', login);

export default router;
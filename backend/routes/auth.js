import express from 'express';
import {signup, login} from '../controllers/authController.js';

const router = express.Router();

router.post('/SignUpUser', signup);
router.post('/LoginUser ', login);

export default router;
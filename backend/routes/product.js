import express from 'express';
import {getProductList, importCsv} from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleWare.js';

const router = express.Router();

router.post('/GetProductList', authMiddleware, getProductList);
router.post('/ImportCsv', authMiddleware, importCsv);

export default router;
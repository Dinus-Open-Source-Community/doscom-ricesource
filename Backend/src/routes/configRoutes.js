import express from 'express';
import upload from '../middleware/upload.js';
import { createConfig, getConfig, getAllConfigs, deleteConfig, updateConfig } from '../controllers/configController.js';
import cors from 'cors';

const router = express.Router();


router.post('/config', upload.single('image'), createConfig);
router.put('/config/:id', upload.single('image'), updateConfig);
router.get('/config/:id', getConfig);
router.delete('/config/:id', deleteConfig);
router.get('/config', getAllConfigs);
export default router;
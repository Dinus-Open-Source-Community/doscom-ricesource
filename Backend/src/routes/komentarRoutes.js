import express from 'express';
import { createKomentar, getKomentar, deleteKomentar } from '../controllers/komentarController.js';

const router = express.Router();

router.post('/komentar', createKomentar);
router.get('/komentar/:config_id', getKomentar);
router.delete('/komentar/:id', deleteKomentar);

export default router;
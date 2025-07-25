import express from 'express';
import { fetchMessages, postMessage } from '../controllers/messageControllers';
const router = express.Router();

router.get('/', fetchMessages);
router.post('/', postMessage);

export default router;
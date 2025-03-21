import { Router } from 'express';
const router = Router();
import {
  compare,
  getAllCompares,
} from '../controllers/compareController.js';

router.post('/', compare);

router.get('/all', getAllCompares);

export default router;

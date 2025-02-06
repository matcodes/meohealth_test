import { Router } from 'express';
import { isPrimeController } from '../controllers/is-prime.controller';
import { validateNumberParam } from '../middleware/validation.middleware';

const router = Router();

router.get('/api/is-prime', validateNumberParam, isPrimeController);

export default router;

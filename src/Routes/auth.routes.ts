import express from 'express';
import { createSessionHandler, refreshAccesTokenHandler } from '../controller/auth.controller';
import validateRecourse from '../middleware/validateRecourse';
import { createSessionSchema } from '../schema/auth.schema';

const router = express.Router();

router.post('/api/sessions', validateRecourse(createSessionSchema), createSessionHandler);

router.post('/api/sessions/refresh', refreshAccesTokenHandler);

export default router;

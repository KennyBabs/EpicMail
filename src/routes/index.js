import express from 'express';

import user from './userRoutes';
import group from './groupRoutes';
import message from './messageRouter';

const router = express.Router();

router.use('/api/v2', user);
router.use('/api/v2', group);
router.use('/api/v2', message);

export default router;


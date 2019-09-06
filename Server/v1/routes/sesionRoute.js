import express from 'express';
import sessionController from '../controllers/sessionController';
import userAuth from '../middleware/authUser';
import validateSession from '../helpers/sessionValidation';

const router = express.Router();
// session validation
const { validateSessionRequest } = validateSession;

router.post('/', validateSessionRequest, userAuth, sessionController.createSession);
router.patch('/:sessionId/accept', userAuth, sessionController.acceptSession);

export default router;

import express from 'express';
import adminController from '../controllers/adminControler';
import checkIsAdmin from '../middleware/isAdmin';
// ghjhnfkdjfsdk
const router = express.Router();

router.patch('/:userId', checkIsAdmin, adminController.changeUserToMentor);
// jskdskdj
export default router;

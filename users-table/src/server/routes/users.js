import expressRouter from 'express';
import {getAll, getById, uploadNewUser} from '../controllers/users.js';

export const router = expressRouter.Router();

router.get('/users', getAll)

router.post('/users', uploadNewUser)

router.get('/users/:userId', getById)
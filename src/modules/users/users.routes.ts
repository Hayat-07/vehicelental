import { Router } from 'express';
import auth from '../../middleware/auth';
import { usersController } from './users.controller';
const router = Router();
// console.log("Auth middleware:", auth);

router.get('/', auth(), usersController.getAllUsers);
router.put('/:userId',auth(),usersController.updateUser); 
router.delete('/:userId',auth(),usersController.deleteUser); 


export const usersRoutes = router;
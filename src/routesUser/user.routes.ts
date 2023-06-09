import {Router} from 'express'
const router = Router();
import * as userController from '../controllers/user.controllers'

router.get('/', userController.getUser)
router.post('/', userController.createUser )
router.get('/:id', userController.getUserById )
router.put('/:id', userController.updateUser )
router.delete('/:id', userController.deleteUser )

export default router;
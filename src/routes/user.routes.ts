import {Router} from 'express'
import * as userController from '../controllers/user.controllers'
import {authJwt, verifySignup} from '../middlewares'

const router = Router();

router.get('/userform', userController.getUser);
router.post('/userform', userController.createUser );
router.get('/userform/:id', userController.getUserById );
router.put('/userform/:id',[authJwt.verifyToken, authJwt.isUser], userController.updateUser );
router.delete('/userform/:id',[authJwt.verifyToken, authJwt.isUser] ,userController.deleteUser );

export default router;
import {Router} from 'express'
import * as authCtrl from '../controllers/auth.controller'
import {verifySignup} from '../middlewares'
const router = Router();

router.post('/signup', verifySignup.checkDuplicateUserEmail, authCtrl.singUp)
router.post('/signin', authCtrl.singIn)

export default router;
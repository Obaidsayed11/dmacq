import { Router} from "express"
import Controller from '../Controllers/Auth.Controller.js';
import authMiddleware from "../MiddleWare/auth.middleware.js";
const {RegisterContoller, LoginController,userInfoController,LogoutController } = Controller;



const router = Router()

router.route('/login').post(LoginController)
router.route('/register').post(RegisterContoller);
router.route('/logout').post(authMiddleware, LogoutController)
router.route('/userInfo').get(authMiddleware,userInfoController)


export default router
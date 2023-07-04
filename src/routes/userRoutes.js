import { Router } from "express";



const router = Router()

router.get('/register', createRegister);
router.post('/session/register', createUserController);
router.get('/session/login', seeLogin);
router.post('/session/login', loginUser);
router.post('/session/logout', logoutUser);

export default router 
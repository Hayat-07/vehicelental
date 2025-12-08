import { Router } from 'express';
import { authControllers } from './auth.controller';

const router = Router();

router.post("/signup", authControllers.signup);
router.post("/signin", authControllers.signin);
// router.post("/api/v1/auth/signout", authControllers.signout || ((req, res) => res.json({ message: 'signout' })));




export const authRoutes = router;
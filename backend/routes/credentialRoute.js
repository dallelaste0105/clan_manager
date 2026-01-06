import express from "express";
import credentialController from "../controllers/credentialController.js";
import jwtMiddleware from "../controllers/jwtMiddleware.js";
const router = express.Router();

router.post('/signup', credentialController.signupController);
router.post('/login', credentialController.loginController);
router.post('/logout', credentialController.logoutController);
router.get('/getworlds', jwtMiddleware.jwtMiddleware, credentialController.getWorldsController);
router.post('/createworld', jwtMiddleware.jwtMiddleware, credentialController.createWorldController);

export default router;
import express from "express";
import credentialController from "../controllers/credentialController.js";
const router = express.Router();

router.post('/signup', credentialController.signupController);
router.post('/login', credentialController.loginController);

export default router;
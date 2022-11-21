import { Router } from '@deps';
import { login, me, register } from '@controllers/auth.controller.ts';
import authMiddlware from '@middlewares/auth.middleware.ts';

// Create a new router instance
const router = new Router();

// Route to get the current logged in user
// /api/v1/auth/me
router.get("/me", authMiddlware, me);

// Route to register a new user
// /api/v1/auth/register
router.post("/register", register);

// Route to sign in
// /api/v1/auth/login
router.post("/login", login);

// Then export it.
// This router will be used in the /src/routers/v1/index.ts file.
export default router.routes();
import { Router } from '@deps';

import BooksRoutes from '@routers/v1/books.route.ts';
import AuthRoutes from '@routers/v1/auth.route.ts';

const router = new Router();

// /api/v1/books/*
router.use("/books", BooksRoutes);

// /api/v1/auth/*
router.use("/auth", AuthRoutes);

export default router.routes();
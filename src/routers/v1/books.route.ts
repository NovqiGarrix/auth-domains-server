import { Router } from '@deps';

import authMiddlware from '@middlewares/auth.middleware.ts';
import { addANewBook, deleteANewBook, getABook, getBooks } from '@controllers/books.controller.ts';

const router = new Router();

router.get("/", getBooks);

router.get("/:bookId", getABook);

router.post("/", authMiddlware, addANewBook);

router.delete("/:bookId", authMiddlware, deleteANewBook);

export default router.routes();
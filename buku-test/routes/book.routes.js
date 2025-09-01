import { Router } from 'express';
import { listBooks, getBook, createBook, updateBook, patchBook, deleteBook } from '../controllers/book.controller.js';
import { validateBook, validatePatchBook } from '../middlewares/validate.js';

const router = Router();

router.get('/', listBooks);
router.get('/:id', getBook);
router.post('/', validateBook, createBook);
router.put('/:id', validateBook, updateBook);
router.patch('/:id', validatePatchBook, patchBook);
router.delete('/:id', deleteBook);

export default router;
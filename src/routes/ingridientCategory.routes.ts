import { Router } from 'express';
import {
  createIngridientsCategory,
  deleteIngridientsCategory,
  getAllIngridientsCategory,
  getSingleIngridientsCategory,
  updateIngridientsCategory,
} from '../controllers/ingridientsCategory.controller';
const router = Router();

//ingridients category create router
router.post('/', createIngridientsCategory);
//all ingridients category get router
router.get('/', getAllIngridientsCategory);
//single ingridients category get router
router.get('/:id', getSingleIngridientsCategory);
//ingridients category update router
router.patch('/:id', updateIngridientsCategory);
//ingridients category delete router
router.delete('/:id', deleteIngridientsCategory);

export default router;

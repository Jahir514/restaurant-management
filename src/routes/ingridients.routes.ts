import { Router } from 'express';
import { createIngridients, deleteIngridients, getAllIngridients, getSingleIngridients, updateIngridients } from '../controllers/ingridients.controller';
const router = Router();

//ingridients  create router
router.post('/', createIngridients);
//all ingridients  get router
router.get('/', getAllIngridients);
//single ingridients  get router
router.get('/:id', getSingleIngridients);
//ingridients  update router
router.patch('/:id', updateIngridients);
//ingridients  delete router
router.delete('/:id', deleteIngridients);

export default router;

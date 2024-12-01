import { Router } from 'express'
import { createSupplier, deleteSupplier, getAllSupplier, getSingleSupplier, updateSupplier } from '../controllers/supplier.controller'
const router = Router()

//supplier create route
router.post('/', createSupplier)
//supplier get route
router.get('/', getAllSupplier)
router.get('/:id', getSingleSupplier)
//supplier update route
router.patch('/:id', updateSupplier)
//supplier delete route
router.delete('/:id', deleteSupplier)

export default router

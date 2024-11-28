import { Router } from 'express'
import { createSupplier } from '../controllers/supplier.controller'
const router = Router()

//supplier create route
router.post('/', createSupplier)

export default router

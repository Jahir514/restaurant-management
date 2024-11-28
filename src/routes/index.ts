import { Router } from 'express'
import supplierRoutes from './supplier.routes'
const router = Router()

//all features route
router.use('/supplier', supplierRoutes)

export default router

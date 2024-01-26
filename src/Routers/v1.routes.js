import { Router } from "express"

import authRouter from '../modules/Auth/routers/Auth.routes.js'

const router=Router()



router.use('/auth',authRouter)



export default router
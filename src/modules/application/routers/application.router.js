import { Router } from "express"

import { ExportApplications } from"../controllers/application.controller.js"

import { authenticate } from "../../Auth/middlewares/auth.middleware.js"

const router= Router()



router.route('/').get(authenticate,ExportApplications)


export default router
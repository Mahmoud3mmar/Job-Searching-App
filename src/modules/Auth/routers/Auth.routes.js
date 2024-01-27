import {Router } from "express"
import {Logout, SignIN,SignUp} from '../controllers/Auth.controller.js'
import { checkUniqueEmail } from "../middlewares/auth.middleware.js"
import { signinschema, signinschemaquery, signupschema, signupschemaquery } from "../validations/auth.validation.js"
import { validate } from "../../../middlewares/validation.middleware.js"

const router = Router()


router.use('/Signin',validate(signinschema,signinschemaquery),SignIN)
router.use('/Signup',SignUp)
router.use('/Logout',Logout)


export default router
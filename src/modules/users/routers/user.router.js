import { Router } from "express"

import { UpdateAccount,GetUserAccountData, DeleteAccount ,GetProfileData, UpdatePassword,GetAllAccountsByRecoveryEmail, ForgotPassword} from "../controllers/users.controller.js"

import { authenticate } from "../../Auth/middlewares/auth.middleware.js"

const router= Router()




router.route('/Account/:id').put(authenticate,UpdateAccount).delete(authenticate,DeleteAccount).get(authenticate,GetUserAccountData)

router.route('/Otheraccount').get(authenticate,GetProfileData)

router.route('/Password').put(authenticate,UpdatePassword)
router.route('/ForgetPassword').post(authenticate,ForgotPassword)

router.route('/Recaccounts').get(GetAllAccountsByRecoveryEmail)





export default router
import { Router } from "express"

import {  GetAllUsers,
    
    UpdateUser,
    DeleteUser,
    SearchUserbetween,
    SearchUser,
    GetUserProfileWithPosts,
    ChangeUserPassword,
    SoftDeleteUser,
    AddUser
} from "../controllers/users.controller.js"

import { authenticate } from "../../Auth/middlewares/auth.middleware.js"
import getuploadmiddleware from "../../../middlewares/upload.middlware.js"

const router= Router()



router.route('/').get(GetAllUsers).post(getuploadmiddleware("img"),AddUser)
router.route('/SearchUserBetween').get(SearchUserbetween)
router.route('/SearchUser').get(SearchUser)



router.route('/changepassword/:id').put(authenticate,ChangeUserPassword)
router.route('/SoftDelete/:id').delete(authenticate,SoftDeleteUser)


router.route('/:id').put(authenticate,UpdateUser).delete(authenticate,DeleteUser).get(GetUserProfileWithPosts)

export default router
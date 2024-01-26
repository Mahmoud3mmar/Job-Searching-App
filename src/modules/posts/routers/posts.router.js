import {Router} from "express"

import {GetAllTasks,AddTask,DeleteTask,UpdateTask,GetAllPostsWithOwnersInfo,GetTasksForUserWithUserData,GetAllTasksNotDoneAfterDeadline} from "../controllers/posts.controller.js"
import { authenticate, authorize } from "../../Auth/middlewares/auth.middleware.js"
import {ispostOwner,isexistingTask } from "../middlewares/posts.middlware.js"
const router= Router()

router.route('/').get(GetAllTasks).post(AddTask)
router.route('/GetAllPostsWithOwnersInfo').get(GetAllPostsWithOwnersInfo)
router.route('/GetAllTasksNotDoneAfterDeadline').get(GetAllTasksNotDoneAfterDeadline)

router.route('/:id')
.delete(authenticate,authorize('USER'),ispostOwner,isexistingTask,DeleteTask)

.put(authenticate,UpdateTask)
.post(authenticate,AddTask)
.get(authenticate,GetTasksForUserWithUserData)

export default router
import { catchError } from "../../../utils/erroer.handler.js";
import PostModel from "../models/posts.model.js";

const ispostOwner = catchError(async(req,res,next)=>{

    const {_id }= req.user; 
    const { taskID } = req.params
    const note = await PostModel.findById(taskID)

     // Check if the current user is the creator of the task
     if (String(note.userID) !== String(_id)) throw new AppError('Permission denied. You are not the creator of this task.', 403);

    
    next()
})

const isexistingTask = catchError(async(req,res,next)=>{

    const { taskID } = req.params

    // Check if the task with the provided taskID exists
    const existingTask = await PostModel.findById(taskID);

    if (!existingTask) {
        throw new AppError('Task not found', 404);
    }
    
    next()
})
export { ispostOwner,
    isexistingTask
}
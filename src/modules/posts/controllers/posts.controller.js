

import PostModel from '../models/posts.model.js'
import UserModel from '../../users/models/user.model.js'
import { AppError, catchError } from '../../../utils/erroer.handler.js'


const GetAllTasks = catchError( async (req,res)=>{
   
       const data = await PostModel.find()
       res.json({data})
   
})
const AddTask = catchError(async (req, res) => {
    const{_id}=req.user
    const { title, description, assignTo, deadline } = req.body

    // Check if the user with the provided userID exists
    const existingUser = await UserModel.findById(_id);

    if (!existingUser) {
        throw new AppError('User not found', 404);
    }

    const newTask = await PostModel.create({
        title,
        description,
        status: 'toDo', // Set the status to 'toDo' for a new task
        userID,
        assignTo,
        deadline
    });

    res.json({ task: newTask });
});



const DeleteTask = catchError(async (req, res) => {
    const { taskID } = req.params
    // Use Mongoose's remove method to delete the task
    const deletedTask = await PostModel.findByIdAndRemove(taskID);

    res.json({ task: deletedTask });
});




const UpdateTask = catchError(async (req, res) => {

    const {userID} = req.params
    const { taskID, title, description, status, assignTo } = req.body;

    // Check if the task with the provided taskID exists
    const existingTask = await PostModel.findById(taskID);

    if (!existingTask) {
        throw new AppError('Task not found', 404);
    }

    // Check if the current user is the creator of the task
    if (String(existingTask.userID) !== String(userID)) {
        throw new AppError('Permission denied. You are not the creator of this task.', 403);
    }

    // Create an object with the fields that need to be updated
    
    // Use update to set the specified fields
    const updatedTask = await PostModel.update(
        { _id: taskID },
        { $set:  title, description,status, assignTo, deadline  }
    );

    res.json({ task: updatedTask });
});




const GetAllPostsWithOwnersInfo = catchError(async (req, res) => {
    
        const postsWithOwners = await PostModel.find().populate('userID');

        res.json({ postsWithOwners });
    
});

const GetTasksForUserWithUserData = catchError(async (req, res) => {
    const { userID } = req.params; // Assuming you get the userID from the request parameters

    const existingUser = await UserModel.findById(userID);
    if (!existingUser) {
        throw new AppError('User not found', 404);
    }

    const tasksForUser = await PostModel.find({ userID }).populate('userID');

    res.json({ tasks: tasksForUser });
});


const GetAllTasksNotDoneAfterDeadline = catchError(async (req, res) => {
    const currentDate = new Date();

    const overdueTasks = await PostModel.find({
        status: { $ne: 'done' }, 
        deadline: { $lt: currentDate } 
    }).populate('userID');


    res.json({ overdueTasks });
});


export{
    GetAllTasks ,
    AddTask,
    DeleteTask,
    UpdateTask,
    GetAllPostsWithOwnersInfo,
    GetTasksForUserWithUserData,
    GetAllTasksNotDoneAfterDeadline
}
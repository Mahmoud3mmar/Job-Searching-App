

import UserModel from '../models/user.model.js'
import { AppError, catchError } from '../../../utils/erroer.handler.js'
import imageModel from '../../image/model/image.model.js'

import cloudinary from "cloudinary"

const GetAllUsers= catchError( async (req,res)=>{

    const Users = await UserModel.find().populate('profilepicture')
    
    res.json({Users,message:'sucess'})     
} )


const AddUser= catchError( async (req,res)=>{
    const {userName}=req.body
    const {path}=req.file

    const cloudimg = await cloudinary.v2.uploader.upload(path)
    
    console.log(cloudimg)
    const image = await imageModel.create({
        
        name:cloudimg.asset_id,
        path:cloudimg.secure_url
    })
    await UserModel.create({
        userName,
        profilepicture:image._id
    })
    res.status(201).json({message:'sucess'})     
} )

const UpdateUser = catchError(async (req, res) => {
    
        const { id } = req.params;
        const { userName,  age } = req.body;
        // Use findOneAndUpdate to update the user based on the provided ID
        const user = await UserModel.findOneAndUpdate(
            { _id: id },
            { $set: { userName,age } },
            { new: true } // This option returns the modified document rather than the original
        );

        // Check if the user with the specified ID exists
        if (user) {
            return  res.json({message:'Sucess' ,user });
        }
        throw new AppError('User not found',404)
       
   
});
const DeleteUser= catchError(async (req,res)=>{
    
        const {id}=req.params     
        const data = await UserModel.deleteOne({
            _id: id 
        })
        if (data.deletedCount > 0) {
            return res.json({ message: 'User deleted successfully' });
        }
    
        throw new AppError('User not found',404)
       
    
})

const SearchUserbetween=  catchError(async (req, res) => {
    const {Sage,Eage } = req.body;   
    const data = await UserModel.find({
        age: { 
            $gte: Sage,
            $lte:Eage
        },
      });
  
    res.json({ data });
});

const SearchUser = catchError(async (req, res) => {
    const {targetInitial,targetAge } = req.body;
  
    // Construct a regular expression for names starting with the specified initial
   
    const nameRegex = new RegExp(`^${targetInitial}`, 'i');
    const data = await UserModel.findOne({
        userName: { $regex: nameRegex },
        age: { $lt: targetAge },
      });
  
    res.json({ data });
});

const GetUserProfileWithPosts = catchError(async (req, res) => {



        const {id}=req.params     
        // Assuming you have a route parameter with the userId

        const data = await UserModel.findById(id);
        
        if (!data) {
            return res.status(404).json({ error: 'User not found.' });
        }

        await data.populate('posts');

        res.json({ data });
    
});



const ChangeUserPassword = catchError(async (req, res) => {
    
    const { id } = req.params;
    const { email, password} = req.body;

    // // Validate that at least one field is present in the request body
    // if (!userName && !email && !password && !age && !gender && !phone) {
    //     return res.status(400).json({ error: 'At least one field is required for update.' });
    // }

    // Use findOneAndUpdate to update the user based on the provided ID
    const user = await UserModel.findOneAndUpdate(
        { _id: id },
        { $set: {password} },
        { new: true } // This option returns the modified document rather than the original
    );

    // Check if the user with the specified ID exists
    if (user) {
        return  res.json({message:'Sucess',user });
    }
    throw new AppError('User not found',404)
   

});


const SoftDeleteUser = catchError(async (req, res, next) => {
    
        const { id } = req.params;

        await UserModel.findByIdAndUpdate(id, { deleted: true });

        res.json({ message: 'Soft deleted successfully' });
});

export {
    GetAllUsers,
    UpdateUser,
    DeleteUser,
    SearchUserbetween,
    SearchUser,
    GetUserProfileWithPosts,
    ChangeUserPassword,
    SoftDeleteUser,
    AddUser
}
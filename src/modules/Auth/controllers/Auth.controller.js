import jwt from "jsonwebtoken"
import { AppError, catchError } from "../../../utils/erroer.handler.js"
import UserModel from "../../users/models/user.model.js"
import bcrypt from 'bcrypt'



  
const SignIN = catchError(async (req, res) => {
  const { email, mobileNumber, password } = req.body;

  // Try to find the user by email or mobileNumber
  const user = await UserModel.findOne({ $or: [{ email }, { mobileNumber }] });

  if (user && bcrypt.compareSync(password, user.password)) {
    // Update user status to 'online'
    await UserModel.findByIdAndUpdate(user._id, { $set: { status: 'online' } });

    // Generate JWT token
    const token = jwt.sign({ userName: user.userName, _id: user._id }, 'shhh', { expiresIn: '1h' });

    return res.json({ message: 'Signed in successfully', token });
  }

  throw new AppError('Invalid credentials!!!', 400);
});

const SignUp =catchError(async (req,res)=>{



  const { email,mobileNumber,password } =req.body
  

   
    const hashedpassword=bcrypt.hashSync(password,5)

    await UserModel.create({userName,email,mobileNumber,password:hashedpassword})

    res.status(201).json({message:'signed up Sucessfully'})
})



const Logout = catchError(async (req, res) => {
    const{id}=req.params
    const { token } = req.body;
  
    await UserModel.findByIdAndUpdate(id, {
      $addToSet: { blacklistedTokens: token },
    });
  
    res.json({ message: 'Logged out successfully' });
  });
export{

    SignIN,
    SignUp,
    Logout
}
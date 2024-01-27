import { AppError, catchError } from "../../../utils/erroer.handler.js"
import UserModel from "../../users/models/user.model.js"
import jwt from "jsonwebtoken"

const checkUniqueEmail = catchError(async(req,res,next)=>{


    const {email}=req.body
    const user = await UserModel.findOne({email})

    if(user) throw new AppError ("Email already exists!!",400)
    next()
})


const authenticate= (req,res,next)=>{

    const token = req.header('token')

    if(!token) throw new AppError('unauthorized',401)

    jwt.verify(token,process.env.SECRET,(error,decodedToken)=>{
        if(error) throw new AppError(error.message,498)
        decodedToken=req.user
        next()

    })
}


const authorize=(role)=>{

    return (req,res,next)=>{
        const {role:userRole}=req.user
        if(role!==userRole) throw new AppError('forbidden',403)
        next()
    }
}




export { checkUniqueEmail,
    authenticate,
    authorize

}



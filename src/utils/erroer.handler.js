import { error } from "console"
import { stat } from "fs"

export const catchError =(func)=>{

    return(req,res,next)=>{
        func(req,res,next).catch((error)=>{
            next(error)
        })
    }




}


export class AppError extends Error{
    constructor(message,status){
        super(message)
        this.status = status
    }

}
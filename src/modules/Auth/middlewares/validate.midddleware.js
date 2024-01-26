import Joi from ("joi")
import { AppError } from "../../../utils/erroer.handler.js"

const validateschema=(schema,req,next)=>{
    
    next()
}


const validatesingup=(req,res,next)=>{
   
       validateschema(schema,req,next)

}

const validatesingin=(req,res,next)=>{
   
    validateschema(schema,req,next)
}

export{
    validatesingup,
    validatesingin
}
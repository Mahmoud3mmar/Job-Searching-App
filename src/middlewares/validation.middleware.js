import { AppError } from "../utils/erroer.handler.js"

const validate=(bodyschema,queryschema)=>{
    return  (req,res,next)=>{
        const {error: bodyerror} = bodyschema.validate(req.body,{abortEarly:false})
        const {error: queryerror} = queryschema.validate(req.body,{abortEarly:false})


        const error={...bodyerror,...queryerror}

        console.log(error.details[0].message)
        if(error) throw new AppError(error.details[0].map((d)=>d.message.split('"').join('')),400)
        next()
    }
    
}

export {
    validate
}
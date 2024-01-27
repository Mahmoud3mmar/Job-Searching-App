import Joi from "joi"

const signupschema  = Joi.object({

        userName:Joi.string().alphanum().min(3).max(100).required(),
        email:Joi.string().email({
          minDomainSegments:3
        }),
        password:Joi.string().pattern(new RegExp('^[A-Z]')),
        age:Joi.number()
})

const signupschemaquery  = Joi.object({})
    


const signinschema = Joi.object({

    email:Joi.string().email({
      minDomainSegments:2
    }),
    password:Joi.string().pattern(new RegExp('^[A-Z]'))
    
})
const signinschemaquery = Joi.object({})


export {

    signupschema,
    signinschema,
    signupschemaquery,
    signinschemaquery
}
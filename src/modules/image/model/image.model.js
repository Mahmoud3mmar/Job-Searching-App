import mongoose from "mongoose"

const imageschema = new mongoose.Schema({



    name:{
        type:String,
        required:true,

    },
    path:{
        type:String,
        required:true
    }
})

// imageschema.post('find',(docs,next)=>{
//     docs.forEach((d)=>(d.path=process.env.BASE_URL+d.path))
//     console.log(docs)
//     next()
// })

const imageModel = mongoose.model('Image',imageschema)



export default imageModel
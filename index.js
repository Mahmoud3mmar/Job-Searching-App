import express from 'express'
import ConnectToDB from './db/dbconnection.js'
import v1Router from './src/Routers/v1.routes.js'
import userRouter from './src/modules/users/routers/user.router.js'
import postRouter from './src/modules/posts/routers/posts.router.js'
import  dotenv  from 'dotenv'



dotenv.config()
const app = express()
const port = 3000
import {v2 as cloudinary} from 'cloudinary';
          
          
cloudinary.config({ 
  cloud_name: 'dhdkmq1q8', 
  api_key: '739591961255271', 
  api_secret: 'DyjJGA2p1a--l7nuhH5kBaDd_zg' 
});


app.use(express.json())
app.use(express.static('uploads'))
app.use('/users',userRouter)
app.use('/posts',postRouter)

app.use('/api/v1',v1Router)
app.get('/', (req, res) => res.send('Hello World!'))





app.use((error,req,res,next)=>{
    const {message,status}=error
    res.status(status ||500).json({message})
})




ConnectToDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// import { Sequelize, Model, DataTypes } from "sequelize";
import mongoose from 'mongoose';

const ConnectToDB=()=>{
  mongoose
  .connect(process.env.DB_CONNECTION)
  .then(()=>{
    console.log("connected Sucessfully")
    
  }).catch(()=>{
    console.error('DB connection failed!!!!!')
  })
}



export default ConnectToDB




import mongoose from "mongoose";



const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    recoveryEmail: {
      type: String,
    },
    DOB: {
      type: Date,
      required: true,
    },
    mobileNumber: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: ['User', 'Company_HR'],
      default: 'User',
    },
    status: {
      type: String,
      enum: ['online', 'offline'],
      default: 'offline',
    },
  });

const UserModel = mongoose.model('User', UserSchema);

export default UserModel
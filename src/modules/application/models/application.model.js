

import mongoose from "mongoose";



const ApplicanSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', // Assuming 'Job' is the name of your Job model
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming 'User' is the name of your User model
        required: true,
      },
      userTechSkills: {
        type: [String],
        required: true,
      },
      userSoftSkills: {
        type: [String],
        required: true,
      },
      userResume: {
        type: String, // This could be a URL to the PDF stored on Cloudinary
        required: true,
      },
    });


const ApplicanModel = mongoose.model('Applican', ApplicanSchema);

export default ApplicanModel
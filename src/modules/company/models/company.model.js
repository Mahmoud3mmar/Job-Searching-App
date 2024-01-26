

import mongoose from "mongoose";



const CompanySchema = new mongoose.Schema({
    companyName: {
        type: String,
        unique: true,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      industry: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      numberOfEmployees: {
        type: String,
        required: true,
      },
      companyEmail: {
        type: String,
        unique: true,
        required: true,
      },
      companyHR: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    });


const CompanyModel = mongoose.model('Company', CompanySchema);

export default CompanyModel
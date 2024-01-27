

import { AppError, catchError } from '../../../utils/erroer.handler.js'

import cloudinary from "cloudinary"
import JobModel from '../models/job.model.js';
import CompanyModel from '../../company/models/company.model.js';

const AddJob = catchError(async (req, res) => {
    userId=req.user._id
    const {
        jobTitle,
        jobLocation,
        workingTime,
        seniorityLevel,
        jobDescription,
        technicalSkills,
        softSkills,
    } = req.body;

    // Create a new job using the JobModel
    const newJob = await JobModel.create({
        jobTitle,
        jobLocation,
        workingTime,
        seniorityLevel,
        jobDescription,
        technicalSkills,
        softSkills,
        addedBy: userId,
    });

    res.json({ message: 'Job added successfully', job: newJob });
});


const UpdateJob = catchError(async (req, res) => {
    

    const userId = req.user._id; 

    const {
        jobTitle,
        jobLocation,
        workingTime,
        seniorityLevel,
        jobDescription,
        technicalSkills,
        softSkills,
    } = req.body;

    // Find and update the job
    const updatedJob = await JobModel.findOneAndUpdate(
        { addedBy: userId }, // Query criteria to find the job by  owner
        {
            $set: {
                jobTitle,
                jobLocation,
                workingTime,
                seniorityLevel,
                jobDescription,
                technicalSkills,
                softSkills,
            },
        },
        { new: true } // This option returns the modified document rather than the original
    );

    if (!updatedJob) {
        throw new AppError('Job not found or unauthorized', 404);
    }

    res.json({ message: 'Job updated successfully', job: updatedJob });
});


const DeleteJob = catchError(async (req, res) => {
    const userId = req.user._id; 


    // Find the job to delete
    const jobToDelete = await JobModel.findOne({ addedBy: userId });

    if (!jobToDelete) {
        throw new AppError('Job not found or unauthorized', 404);
    }

    // Delete the job
    await JobModel.findByIdAndDelete(jobToDelete._id);

    res.json({ message: 'Job deleted successfully' });
});


const GetAllJobsWithCompanyInfo = catchError(async (req, res) => {

    const userId = req.user._id; 

    const jobs = await JobModel.findOne({ addedBy: userId }).populate('Company')
      

    res.json({ jobs, message: 'Success' });
});

const GetJobsForCompany = catchError(async (req, res) => {
    const { companyName } = req.query;

    // Fetch the company by name
    const company = await CompanyModel.findOne({ companyName });

    if (!company) {
        throw new AppError('Company not found', 404);
    }

    // Fetch all jobs associated with the company
    const jobs = await JobModel.find({ addedBy: company._id });

    res.json({ jobs, message: 'Success' });
});

const GetFilteredJobs = catchError(async (req, res) => {
    const {
        workingTime,
        jobLocation,
        seniorityLevel,
        jobTitle,
        technicalSkills,
    } = req.body

    // Construct the filter criteria based on the provided parameters
    const filterCriteria = {};

    if (workingTime) {
        filterCriteria.workingTime = workingTime;
    }

    if (jobLocation) {
        filterCriteria.jobLocation = jobLocation;
    }

    if (seniorityLevel) {
        filterCriteria.seniorityLevel = seniorityLevel;
    }

    if (jobTitle) {
        filterCriteria.jobTitle = { $regex: new RegExp(jobTitle, 'i') };
    }

    if (technicalSkills) {
        filterCriteria.technicalSkills = { $in: technicalSkills.split(',') };
    }

    // Fetch jobs based on the constructed filter criteria
    const jobs = await JobModel.find(filterCriteria);

    res.json({ jobs, message: 'Success' });
});




const ApplyToJob = catchError(async (req, res) => {
    userId=req.user._id
    const {userTechSkills, userSoftSkills, userResume } = req.body;
    const job= await JobModel.findOne({ addedBy: userId });

    

   // Create a new application document
   const newApplication = await ApplicationModel.create({
    jobId:job._id,
    userId,
    userTechSkills,
    userSoftSkills,
    userResume,
});

    res.json({ message: 'Application submitted successfully', application: newApplication });
});
export {
    AddJob,
    UpdateJob,
    DeleteJob,
    GetAllJobsWithCompanyInfo,
    GetJobsForCompany,
    GetFilteredJobs,
    ApplyToJob
}
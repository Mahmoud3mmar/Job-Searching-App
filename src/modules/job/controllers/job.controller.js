

import { AppError, catchError } from '../../../utils/erroer.handler.js'

import cloudinary from "cloudinary"
import JobModel from '../models/job.model.js';
import CompanyModel from '../../company/models/company.model.js';

const AddJob = catchError(async (req, res) => {
    // const userRole = req.user.role;
    // const userId = req.user._id; // Assuming the authenticated user's ID is available in req.user

    // // Check if the user has the required role (Company_HR) or any other role logic you may have
    // if (userRole !== 'Company_HR') {
    //     throw new AppError('Unauthorized: Only Company_HR can add a job', 401);
    // }

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
        addedBy: userId, // Set the addedBy field to the authenticated user's ID
    });

    res.json({ message: 'Job added successfully', job: newJob });
});


const UpdateJob = catchError(async (req, res) => {
    // const userRole = req.user.role;
    // const userId = req.user._id; // Assuming the authenticated user's ID is available in req.user

    // // Check if the user has the required role (Company_HR) or any other role logic you may have
    // if (userRole !== 'Company_HR') {
    //     throw new AppError('Unauthorized: Only Company_HR can update a job', 401);
    // }

    const { jobId } = req.params;
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
        { _id: jobId, addedBy: userId }, // Query criteria to find the job by ID and owner
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
    // const userRole = req.user.role;
    // const userId = req.user._id; // Assuming the authenticated user's ID is available in req.user

    // // Check if the user has the required role (Company_HR) or any other role logic you may have
    // if (userRole !== 'Company_HR') {
    //     throw new AppError('Unauthorized: Only Company_HR can delete a job', 401);
    // }

    const { jobId } = req.params;

    // Find the job to delete
    const jobToDelete = await JobModel.findOne({ _id: jobId, addedBy: userId });

    if (!jobToDelete) {
        throw new AppError('Job not found or unauthorized', 404);
    }

    // Delete the job
    await JobModel.findByIdAndDelete(jobId);

    res.json({ message: 'Job deleted successfully' });
});


const GetAllJobsWithCompanyInfo = catchError(async (req, res) => {
    // Fetch all jobs and populate the 'addedBy' field with company details
    const jobs = await JobModel.find().populate({
        path: 'addedBy',
        model: CompanyModel,
        select: 'companyName description industry address numberOfEmployees companyEmail',
    });

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
    } = req.query;

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
    // const { jobId } = req.params;
    // const userId = req.user._id; // Assuming the authenticated user's ID is available in req.user

    // Check if the user has necessary data (jobId, userId) and handle other validations as needed

    // Create a new application document
    const newApplication = await ApplicationModel.create({
        jobId,
        userId,
        userTechSkills: req.body.userTechSkills, // Assuming userTechSkills is passed in the request body
        userSoftSkills: req.body.userSoftSkills, // Assuming userSoftSkills is passed in the request body
        userResume: req.body.userResume, // Assuming userResume is passed in the request body
    });

    res.json({ message: 'Application submitted successfully', application: newApplication });
});
export {
   
}
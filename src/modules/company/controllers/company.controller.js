
import CompanyModel from '../models/company.model.js'
import { AppError, catchError } from '../../../utils/erroer.handler.js'

import ApplicanModel from '../../application/models/application.model.js';



const AddCompany = catchError(async (req, res) => {
    // const userRole = req.user.role;

    // Check if the user has the required role (Company_HR)
    // if (userRole !== 'Company_HR') {
    //     throw new AppError('Unauthorized: Only Company_HR can add a company', 401);
    // }

    const { companyName, description, industry, address, numberOfEmployees, companyEmail, companyHR } = req.body;

    // Additional validation and processing as needed

    const newCompany = await CompanyModel.create({
        companyName,
        description,
        industry,
        address,
        numberOfEmployees,
        companyEmail,
        companyHR,
    });

    res.json({ message: 'Company added successfully', company: newCompany });
});

const UpdateCompany = catchError(async (req, res) => {
    // const userRole = req.user.role;
    // const userId = req.user._id; // Assuming the authenticated user's ID is available in req.user

    // Check if the user has the required role (Company_HR)
    // if (userRole !== 'Company_HR') {
    //     throw new AppError('Unauthorized: Only Company_HR can update a company', 401);
    // }

    const { companyId } = req.params;
    const { companyName, description, industry, address, numberOfEmployees, companyEmail } = req.body;

    // Fetch the company data
    const company = await CompanyModel.findById(companyId);

    if (!company) {
        throw new AppError('Company not found', 404);
    }

    // Check if the authenticated user is the owner of the company
    if (company.companyHR.toString() !== userId) {
        throw new AppError('Unauthorized: Only the company owner can update the data', 401);
    }

    // Update the company data
    company.companyName = companyName;
    company.description = description;
    company.industry = industry;
    company.address = address;
    company.numberOfEmployees = numberOfEmployees;
    company.companyEmail = companyEmail;

    await company.save();

    res.json({ message: 'Company data updated successfully', company });
});



const DeleteCompany = catchError(async (req, res) => {
    // const userRole = req.user.role;
    // const userId = req.user._id; // Assuming the authenticated user's ID is available in req.user

    // // Check if the user has the required role (Company_HR)
    // if (userRole !== 'Company_HR') {
    //     throw new AppError('Unauthorized: Only Company_HR can delete a company', 401);
    // }

    const { companyId } = req.params;

    // Fetch the company data
    const company = await CompanyModel.findById(companyId);

    if (!company) {
        throw new AppError('Company not found', 404);
    }

    // Check if the authenticated user is the owner of the company
    if (company.companyHR.toString() !== userId) {
        throw new AppError('Unauthorized: Only the company owner can delete the data', 401);
    }

    // Delete the company
    await CompanyModel.findByIdAndDelete(companyId);

    res.json({ message: 'Company data deleted successfully' });
});


const GetCompanyData = catchError(async (req, res) => {
    const { companyId } = req.params;

    // Fetch the company data and populate jobs
    const company = await CompanyModel.findById(companyId).populate('jobs');

    if (!company) {
        throw new AppError('Company not found', 404);
    }

    res.json({ company, message: 'Success' });
});



const SearchCompanyByName = catchError(async (req, res) => {
    const { companyName } = req.query;

    // Perform a case-insensitive search for companies that match the provided name
    const companies = await CompanyModel.find({
        companyName: { $regex: new RegExp(companyName, 'i') }
    });

    res.json({ companies, message: 'Success' });
});



const GetApplicationsForJobs = catchError(async (req, res) => {
    // const userRole = req.user.role;
    // const userId = req.user._id; // Assuming the authenticated user's ID is available in req.user

    // // Check if the user has the required role (Company_HR)
    // if (userRole !== 'Company_HR') {
    //     throw new AppError('Unauthorized: Only Company_HR can view applications', 401);
    // }

    // Fetch the company associated with the user
    const company = await CompanyModel.findOne({ companyHR: userId });

    if (!company) {
        throw new AppError('Company not found', 404);
    }

    // Fetch the jobs associated with the company
    const jobs = await JobModel.find({ company: company._id });

    // Extract job IDs from the fetched jobs
    const jobIds = jobs.map(job => job._id);

    // Fetch applications for the specific jobs
    const applications = await ApplicanModel.find({ jobId: { $in: jobIds } }).populate('userId');

    res.json({ applications, message: 'Success' });
});
export {
   
}
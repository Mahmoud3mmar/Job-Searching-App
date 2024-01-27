
import CompanyModel from '../models/company.model.js'
import { AppError, catchError } from '../../../utils/erroer.handler.js'

import ApplicanModel from '../../application/models/application.model.js';



const AddCompany = catchError(async (req, res) => {
    

    const { companyName, description, industry, address, numberOfEmployees, companyEmail, ownerId } = req.body;

    // Additional validation and processing as needed

    const newCompany = await CompanyModel.create({
        companyName,
        description,
        industry,
        address,
        numberOfEmployees,
        companyEmail,
        owner: ownerId, // Use the provided ownerId as the company owner
    });

    res.json({ message: 'Company added successfully', company: newCompany });
});

const UpdateCompany = catchError(async (req, res) => {
    
    

    const userId = req.user._id;
    const { companyName, description, industry, address, numberOfEmployees, companyEmail } = req.body;

    // Fetch the company data
    const company = await CompanyModel.findOne({ owner: userId });

    if (!company) {
        throw new AppError('Company not found or unauthorized', 404);
    }

    

    const updateResult = await CompanyModel.updateOne(
        { _id: company._id, owner: userId },
        {
            $set: {
                companyName,
                description,
                industry,
                address,
                numberOfEmployees,
                companyEmail,
            },
        }
    );

    res.json({ message: 'Company data updated successfully', updateResult });
});



const DeleteCompany = catchError(async (req, res) => {
    const userId = req.user._id; 

    // Fetch the company data
    const company = await CompanyModel.findOne({ owner: userId });

    // Check if the company was not found
    if (!company) {
        throw new AppError('Company not found or unauthorized', 404);
    }

   

    // Delete the company
    await CompanyModel.findByIdAndDelete(company._id);

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
    const { companyName } = req.body;

    // Perform a case-insensitive search for companies that match the provided name
    const companies = await CompanyModel.find({
        companyName: { $regex: new RegExp(companyName, 'i') }
    });

    res.json({ companies, message: 'Success' });
});



const GetApplicationsForJobs = catchError(async (req, res) => {
    const userId = req.user._id; 

    // Find the company where the owner is the provided user ID
    const company = await CompanyModel.findOne({ owner: userId });

    // Check if the company was not found
    if (!company) {
        throw new AppError('Company not found or unauthorized', 404);
    }
   
    // Fetch the jobs associated with the company
    const jobs = await JobModel.find({ addedBy: userId });

    // Extract job IDs from the fetched jobs
    const jobIds = jobs.map(job => job._id);

    // Fetch applications for the specific jobs along with user data
    const applications = await ApplicanModel.find({ jobId: { $in: jobIds } }).populate('user');

    res.json({ applications, message: 'Success' });
});
export {
    AddCompany,
    UpdateCompany,
    DeleteCompany,
    GetCompanyData,
    SearchCompanyByName,
    GetApplicationsForJobs
}
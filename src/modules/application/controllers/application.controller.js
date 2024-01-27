

import { AppError, catchError } from '../../../utils/erroer.handler.js'

import ApplicanModel from '../models/application.model.js';

// app.get('/applications/:companyId/:date', async (req, res) => {
//     try {
        
// });




const ExportApplications = catchError(async (req, res) => {
    userId=req.user._id
    const { companyId, date } = req.params;
    const jobsForCompany = await JobModel.find({ addedBy: companyId });
   
    if (!jobsForCompany ) {
        throw new AppError('Jobs not found', 404);
    }
    const jobIdsForCompany = jobsForCompany.map(job => job._id);
    
   
    // Assuming the date is in ISO format (e.g., '2024-01-30')
    const applications = await ApplicanModel.find({
        jobId: { $in:jobIdsForCompany},
        createdAt: { $gte: new Date(`${date}T00:00:00.000Z`), $lt: new Date(`${date}T23:59:59.999Z`) },
    }).populate('user'); // Corrected model name to 'ApplicationModel' and populate field to 'user'

    if (applications.length === 0) {
        throw new AppError('No applications found for the specified criteria',404);
    }

    // Create an Excel workbook and worksheet
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Applications');

    // Define worksheet headers
    worksheet.columns = [
        { header: 'Job Title', key: 'jobTitle', width: 20 },
        { header: 'Applicant Name', key: 'applicantName', width: 20 },
        { header: 'Tech Skills', key: 'techSkills', width: 30 },
        { header: 'Soft Skills', key: 'softSkills', width: 30 },
        // Add more columns as needed
    ];

    // Populate worksheet with application data
    applications.forEach(application => {
        const { jobTitle, user, userTechSkills, userSoftSkills } = application;
        const applicantName = user.userName; // Assuming 'userName' is a field in your user model

        worksheet.addRow({ jobTitle, applicantName, techSkills: userTechSkills.join(', '), softSkills: userSoftSkills.join(', ') });
    });

    // Set the response headers to trigger a download of the Excel sheet
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=applications.xlsx');

    // Write the Excel workbook to the response stream
    await workbook.xlsx.write(res);

    // End the response
    res.end();
});

export {
    ExportApplications
}
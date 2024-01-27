import { Router } from "express"

import { AddJob, ApplyToJob, DeleteJob, GetAllJobsWithCompanyInfo, GetJobsForCompany, UpdateJob } from "../controllers/job.controller.js"
import { authenticate, authorize } from "../../Auth/middlewares/auth.middleware.js"


const router= Router()



router.route('/')
.post(authenticate,authorize('Company_HR'),AddJob)
.put(authenticate,authorize('Company_HR'),UpdateJob)
.delete(authenticate,authorize('Company_HR'),DeleteJob)
.get(authenticate,authorize(['User', 'Company_HR']),GetAllJobsWithCompanyInfo)

router.route('/company')
.get(authenticate,authorize(['User', 'Company_HR']),GetJobsForCompany)



router.route('/FilterJob')
.get(authenticate,authorize(['User', 'Company_HR']),GetFilteredJobs)



router.route('/ApplyJob')
.post(authenticate,authorize(['User']),ApplyToJob)


export default router
import { Router } from "express"

import { UpdateCompany,
     DeleteCompany,
     AddCompany,
     GetCompanyData,
     SearchCompanyByName,
     GetApplicationsForJobs
} from "../controllers/company.controller.js"

import { authenticate, authorize } from "../../Auth/middlewares/auth.middleware.js"

const router= Router()



router.route('/')
.put(authenticate,authorize('Company_HR'),UpdateCompany)
.delete(authenticate,authorize('Company_HR'),DeleteCompany)
.post(authenticate,authorize('Company_HR'),AddCompany)
.get(authenticate,authorize(['User', 'Company_HR']),SearchCompanyByName)

router.route('/:id')
.get(GetCompanyData)



router.route('/Application')
.get(authenticate,authorize('Company_HR'),GetApplicationsForJobs)

export default router
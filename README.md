# Job-Searching-App

# Project Documentation

## Overview

This project is a web application managing user accounts, companies, jobs, and applications. It includes functionality for authentication, company and job management, and Excel sheet generation.

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- ExcelJS
- Moment.js

## Folder Structure

- `models`: Mongoose models for User, Company, Job, and Application.
- `routes`: Route handlers for authentication, company, job, and application functionality.
- `utils`: Utility functions and middleware.
- `app.js`: Entry point of the application.

## User Collection

### Sign Up

- Route for user registration.
- Accepts user details (email, mobile number, password).
- Hashes the password before storing it.

### Sign In

- Route for user login.
- Accepts user credentials (email or mobile number, password).
- Generates a JSON Web Token (JWT) for authentication.

### Update User

- Route for updating user account details.
- Allows the user to update various fields (email, mobile number, recovery email, etc.).
- Requires user authentication via a token.

### Delete User

- Route for deleting user account.
- Allows the user to delete their account.
- Requires user authentication via a token.

### Get All Users

- Route for fetching all user accounts.
- Populates user data, including the profile picture.

### Get User Account Data

- Route for fetching the user's own account data.
- Requires user authentication via a token.

### Get Profile Data for Another User

- Route for fetching profile data for another user.
- Accepts the userId as a parameter.
- Requires user authentication via a token.

### Update Password

- Route for updating user password.
- Allows the user to change their password.
- Requires user authentication via a token.

### Forget Password

- Route for password recovery (without sending an email).
- Allows the user to reset their password securely.

### Get All Accounts Associated with a Specific Recovery Email

- Route for fetching accounts associated with a recovery email.
- Accepts the recovery email as a parameter.

## Company Collection

### Add Company

- Route for adding a new company.
- Accepts company details (company name, description, industry, etc.).

### Update Company Data

- Route for updating company data.
- Allows the company owner to modify company information.
- Requires company owner authentication via a token.

### Delete Company Data

- Route for deleting company data.
- Allows the company owner to delete their company.
- Requires company owner authentication via a token.

### Get Company Data

- Route for fetching company data and related jobs.
- Accepts companyId as a parameter.
- Returns information about the company and its associated jobs.

## Job Collection

### Add Job

- Route for adding a new job.
- Accepts job details (title, location, skills, etc.).

### Update Job

- Route for updating job data.
- Allows the company owner to modify job details.
- Requires company owner authentication via a token.

### Delete Job

- Route for deleting a job.
- Allows the company owner to remove a job posting.
- Requires company owner authentication via a token.

### Get All Jobs with Company's Information

- Route for fetching all jobs with company information.
- Returns a list of jobs, including details about the respective companies.

### Get Jobs for a Specific Company

- Route for fetching jobs for a specific company.
- Accepts companyId as a parameter.
- Returns a list of jobs associated with the specified company.

### Get Filtered Jobs

- Route for fetching filtered jobs based on criteria.
- Accepts various filters such as working time, location, skills, etc.
- Returns a list of jobs that match the specified criteria.

## Application Collection

### Apply to Job

- Route for applying to a job.
- Accepts jobId, userTechSkills, userSoftSkills, and userResume.
- Creates a new application document.

### Get Applications for a Specific Company on a Specific Day

- Route for fetching applications for a specific company on a specific day.
- Accepts companyId and date as parameters.
- Returns a list of applications for the specified criteria.

### Excel Sheet Generation

- Route for generating an Excel sheet for applications.
- Accepts companyId and date as parameters.
- Fetches applications and creates an Excel sheet for download.

This README provides an overview of the key functionalities implemented in each route. Customize and extend these routes based on specific project requirements.



import UserModel from '../models/user.model.js'
import { AppError, catchError } from '../../../utils/erroer.handler.js'
import imageModel from '../../image/model/image.model.js'

import cloudinary from "cloudinary"








const GetUserAccountData = catchError(async (req, res) => {
    

    // Fetch user data only if the provided userId matches the decoded user ID from the token
    const user = await UserModel.findById(userId).populate('profilepicture');

    if (user) {
        return res.json({ user, message: 'Success' });
    }

    throw new AppError('User not found', 404);
});

const GetProfileData = catchError(async (req, res) => {
    // const { token } = req.headers;
    const { userId } = req.params; // You can also use req.query.userId for query parameter

    // Verify the token to get the user ID
    // const decodedToken = jwt.verify(token, 'shhh'); // Use the same secret key used during sign-in
    // const requesterUserId = decodedToken._id;

    // Fetch user data only if the requesterUserId matches the decoded user ID from the token
    const requesterUser = await UserModel.findById(requesterUserId);

    if (!requesterUser) {
        throw new AppError('Requester user not found', 404);
    }

    // Check if the requester is trying to get the profile data for their own account or another user
    if (requesterUserId === userId) {
        // Fetch own profile data
        const userProfile = await UserModel.findById(userId).populate('profilepicture');

        if (userProfile) {
            return res.json({ user: userProfile, message: 'Success' });
        }
    } else {
        // Fetch profile data for another user
        const otherUserProfile = await UserModel.findById(userId).populate('profilepicture');

        if (otherUserProfile) {
            return res.json({ user: otherUserProfile, message: 'Success' });
        }
    }

    throw new AppError('User not found', 404);
});





const UpdateAccount = catchError(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    // Check if the provided userId matches the logged-in user
    if (userId !== id) {
        throw new AppError('Unauthorized: Only the owner of the account can update their data', 401);
    }

    const { email, mobileNumber, recoveryEmail, DOB, lastName, firstName } = req.body;

    // Check if the new email or mobileNumber conflicts with existing data
    const existingUserWithEmail = await UserModel.findOne({ email, _id: { $ne: id } });
    const existingUserWithMobileNumber = await UserModel.findOne({ mobileNumber, _id: { $ne: id } });

    if (existingUserWithEmail || existingUserWithMobileNumber) {
        throw new AppError('Conflict: Email or mobile number already in use', 409);
    }

    // Use findOneAndUpdate to update the user based on the provided ID
    const updatedUser = await UserModel.findOneAndUpdate(
        { _id: id },
        { $set: { email, mobileNumber, recoveryEmail, DOB, lastName, firstName } },
        { new: true } // This option returns the modified document rather than the original
    );

    // Check if the user with the specified ID exists
    if (updatedUser) {
        return res.json({ message: 'Success', user: updatedUser });
    }

    throw new AppError('User not found', 404);
});







const DeleteAccount = catchError(async (req, res) => {
    const { id } = req.params;
    

    // Check if the provided userId matches the decoded user ID from the token
    if (userId !== id) {
        throw new AppError('Unauthorized: Only the owner of the account can delete their data', 401);
    }

    const data = await UserModel.deleteOne({ _id: id });

    if (data.deletedCount > 0) {
        return res.json({ message: 'User deleted successfully' });
    }

    throw new AppError('User not found', 404);
});



const UpdatePassword = catchError(async (req, res) => {
    const { token } = req.headers;
    const { oldPassword, newPassword } = req.body;

    // Verify the token to get the user ID
    const decodedToken = jwt.verify(token, 'shhh'); // Use the same secret key used during sign-in
    const userId = decodedToken._id;

    // Fetch user data
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new AppError('User not found', 404);
    }

    // Check if the old password matches the stored hashed password
    if (!bcrypt.compareSync(oldPassword, user.password)) {
        throw new AppError('Invalid old password', 401);
    }

    // Hash the new password
    const hashedNewPassword = bcrypt.hashSync(newPassword, 5);

    // Update the user's password
    await UserModel.findByIdAndUpdate(userId, { $set: { password: hashedNewPassword } });

    res.json({ message: 'Password updated successfully' });
});








const ForgotPassword = catchError(async (req, res) => {
    const { email } = req.body;

    // Fetch user data by email
    const user = await UserModel.findOne({ email });

    if (!user) {
        throw new AppError('User not found', 404);
    }

    // Generate a one-time password (OTP)
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Hash the OTP before storing it (you can use bcrypt or any other suitable method)
    const hashedOtp = bcrypt.hashSync(otp.toString(), 5);

    // Generate a secure token to verify the reset request
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Store the hashed OTP and resetToken in the user document
    user.resetOtp = hashedOtp;
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour expiration

    await user.save();

    res.json({ message: 'Reset password initiated successfully' });
});

const ResetPassword = catchError(async (req, res) => {
    const { email, otp, newPassword, resetToken } = req.body;

    // Fetch user data by email
    const user = await UserModel.findOne({ email });

    if (!user) {
        throw new AppError('User not found', 404);
    }

    // Check if the provided resetToken and OTP match the stored values
    if (user.resetToken !== resetToken || !bcrypt.compareSync(otp.toString(), user.resetOtp)) {
        throw new AppError('Invalid reset token or OTP', 400);
    }

    // Check if the resetToken has expired
    if (Date.now() > user.resetTokenExpiration) {
        throw new AppError('Reset token has expired', 400);
    }

    // Hash the new password
    const hashedNewPassword = bcrypt.hashSync(newPassword, 5);

    // Update the user's password and reset fields
    user.password = hashedNewPassword;
    user.resetOtp = null;
    user.resetToken = null;
    user.resetTokenExpiration = null;

    await user.save();

    res.json({ message: 'Password reset successfully' });
});



const GetAllAccountsByRecoveryEmail = catchError(async (req, res) => {
    const { recoveryEmail } = req.params;

    // Fetch all user accounts associated with the provided recovery email
    const userAccounts = await UserModel.find({ recoveryEmail });

    res.json({ userAccounts, message: 'Success' });
});


export {
   GetUserAccountData,
   GetProfileData,
   UpdateAccount,
   DeleteAccount,
   UpdatePassword,
   ForgotPassword,
   ResetPassword,
   GetAllAccountsByRecoveryEmail
}
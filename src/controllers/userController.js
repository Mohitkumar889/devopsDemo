const UserService = require("../services/UserService");
const RegexEscape = require("regex-escape");
const helpers = require("../util/helpers");


module.exports = () => {

    const AdminRegister = async (req, res, next) => {
        console.log("userController => register");
        let { email, password, name, mobile, countryCode } = req.body;

        email = email.toLowerCase();
        let query = { email: email, userType: 1 };
        let token = "";
        let admin = await UserService().fetchByQuery(query);
        console.log(admin);
        if (admin) {
            req.rCode = 0;
            req.msg = "admin_already_found";
            req.rData = {};
        } else {
            password = await helpers().hashPassword(password);

            admin = { email, password, name };

            let result = await UserService().registerAdmin(admin);

            admin = await UserService().fetchByQuery(query);

            await UserService().updateProfile(admin._id, {});

            admin = await UserService().fetchByQuery(query);

            req.rData = {};
        }

        next();
    };

    const AdminLogin = async (req, res, next) => {
        console.log("userController => AdminLogin");
        let { user_type, email, password } = req.body;
        email = email.toLowerCase();
        let query = { userType: String(user_type), email: email };
        let admin = await UserService().fetchByQuery(query);
        let token = "";
        if (admin) {
            let token = await helpers().createJWT({
                adminId: admin._id,
                isAdmin: true,

            });

            let passwordVerify = await UserService().verifyPassword(
                admin._id,
                password
            );

            if (!passwordVerify) {
                req.rCode = 0;
                req.msg = "incorrect_password";
                req.rData = {};
            } else {
                let lastLogin = new Date();
                // await AdminService().updateProfile(admin._id, { lastLogin });

                if (!token) {
                    token = await helpers().createJWT({
                        adminId: admin._id,
                        isAdmin: true,
                    });
                    // await AdminService().updateProfile(admin._id, { token });
                }

                admin = await UserService().fetchByQuery(query);
                token = await helpers().createJWT({
                    adminId: admin._id,
                    isAdmin: true,
                });
                await UserService().updateProfile(admin._id, { is_logout: false });
                req.rData = { admin, token };
            }
        } else {
            req.rCode = 0;
            req.msg = "admin_not_found";
            req.rData = {};
        }

        next();
    }

    const AdminForgotPassword = async (req, res, next) => {
        console.log("userController => AdminForgotPassword");
        let { email } = req.body;
        if (email) {
            email = email.toLowerCase();
        }

        var query = { email };

        let user = await UserService().fetchByQuery(query);
        req.msg = "admin_not_found";

        if (user) {
            let otp = helpers().generateOTP();
            token = await helpers().createJWT({
                adminId: user._id,
                isAdmin: true,
            });
            await UserService().updateProfile(user._id, { otp });

            req.rData = { token };
            req.msg = "otp_sent_on_mail";
        } else {
            req.rCode = 0;
            req.msg = msg;
        }
        next();
    }

    const AdminVerifyOtp = async (req, res, next) => {
        console.log("userController => AdminVerifyOtp");
        let { adminId, otp } = req.body;

        console.log(adminId);
        var query = { _id: adminId };

        let admin = await UserService().fetchByQuery(query);

        if (admin) {
            token = await helpers().createJWT({ adminId: admin._id, isAdmin: true });

            otpUser = admin.otp;
        } else {
            msg = "admin_not_found";
        }

        console.log("otpUser", otpUser, "\notp", otp);

        console.log(otp == (otp || otpUser));

        var verify = otp == (otp || otpUser) ? true : false;

        if (admin) {
            if (verify) {
                req.rData = { token };
                req.msg = "otp_verified";
            } else {
                req.rCode = 0;
                req.msg = "incorrect_otp";
            }
        } else {
            req.rCode = 0;
            req.msg = msg;
        }
        next();

    }

    const adminResetPassword = async (req, res, next) => {
        console.log("userController => adminResetPassword");
        let { newPassword, confirmPassword, adminId } = req.body;

        if (confirmPassword !== newPassword) {
            return res.status(400).send({
                code: 0,
                message: "confirmPassword and newPassword not matched!",
            });
        }

        let password = await helpers().hashPassword(newPassword);

        await UserService().updateProfile(adminId, { password });

        req.msg = "password_changed";
        next();
    }

    const adminChangePassword = async (req, res, next) => {
        console.log("userController => adminResetPassword");
        let { currentPassword, newPassword, adminId, confirmPassword } =
            req.body;

        let passwordVerify = await UserService().verifyPassword(
            adminId,
            currentPassword
        );

        if (confirmPassword !== newPassword) {
            return res.status(400).send({
                code: 0,
                message: "confirmPassword and newPassword not matched!",
            });
        }

        if (!passwordVerify) {
            req.rCode = 0;
            req.msg = "incorrect_current_password";
            req.rData = {};
        } else {
            newPassword = await helpers().hashPassword(newPassword);
            await UserService().resetPassword(adminId, newPassword);
            req.msg = "password_changed";
        }

        next();
    }

    const adminLogout = async (req, res, next) => {
        console.log("userController => adminLogout");
        let { adminId } = req.body;
        await UserService().updateProfile(adminId, { is_logout: true });
        req.msg = "Log Out successfully.";
        next();
    }

    return {
        AdminRegister,
        AdminLogin,
        AdminForgotPassword,
        AdminVerifyOtp,
        adminResetPassword,
        adminChangePassword,
        adminLogout
    }
}
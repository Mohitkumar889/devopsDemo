const jwt = require("jsonwebtoken");
const ResponseMiddleware = require("./ResponseMiddleware");
const { jwtsecret } = require("../../config/config.js");
const JWTSECRET = jwtsecret;
const UserService = require("../services/UserService.js");

module.exports = () => {
  const verifyHotelToken = async (req, res, next) => {
    console.log("AuthMiddleware => verifyHotelToken");
    let usertoken = req.headers.authorization;

    try {
      if (usertoken) {
        let tokens = usertoken.split(" ");

        let token = tokens[1];
        // console.log("Token", token)
        let payload = jwt.verify(token, JWTSECRET);

        let user = await HospitalService().fetchByQuery({
          _id: payload.hospitalId,
          token,
        });

        if (user && !user.isActive) {
          throw new Error("ac_deactivated");
        }

        //checking user must exist in our DB else throwing error
        if (user) {
          console.log(`User with ID ${user._id} entered.`);
          req.body.hospitalId = user._id;
          req.body.userNameData = user.fullName;
          req.body.emailData = user.email;
          req.authUser = user;
          req.body.userTypes = user.userType;
          next();
        } else {
          throw new Error("invalid_token");
        }
      } else {
        throw new Error("invalid_token");
      }
    } catch (ex) {
      // console.log("heres",ex)

      req.msg = "invalid_token";
      if (ex.message == "ac_deactivated") req.msg = ex.message;

      req.rCode = 0;
      ResponseMiddleware(req, res, next);
    }
  };

  const verifyDoctorToken = async (req, res, next) => {
    console.log("AuthMiddleware => verifyDoctorToken");
    let usertoken = req.headers.authorization;

    try {
      if (usertoken) {
        let tokens = usertoken.split(" ");

        let token = tokens[1];
        // console.log("Token", token)
        let payload = jwt.verify(token, JWTSECRET);

        let user = await DoctorService().fetchByQuery({
          _id: payload.doctorId,
          token,
        });

        if (user && !user.isActive) {
          throw new Error("ac_deactivated");
        }

        //checking user must exist in our DB else throwing error
        if (user) {
          console.log(`Doctor with ID ${user._id} entered.`);
          req.body.doctorId = user._id;
          req.body.userNameData = user.fullName;
          req.body.emailData = user.email;
          req.authUser = user;
          req.body.userTypes = user.userType;
          next();
        } else {
          throw new Error("invalid_token");
        }
      } else {
        throw new Error("invalid_token");
      }
    } catch (ex) {
      // console.log("heres",ex)

      req.msg = "invalid_token";
      if (ex.message == "ac_deactivated") req.msg = ex.message;

      req.rCode = 0;
      ResponseMiddleware(req, res, next);
    }
  };

  const verifyToken = async (req, res, next) => {
    console.log("AuthMiddleware => verifyToken");
    let usertoken = req.headers.authorization;

    try {
      if (usertoken) {
        let tokens = usertoken.split(" ");

        let token = tokens[1];
        // console.log("Token", token)
        let payload = jwt.verify(token, JWTSECRET);
        let user;

        if (payload.hospitalId) {
          user = await HospitalService().fetchByQuery({
            _id: payload.hospitalId,
            token,
          });

          if (user && !user.isActive) {
            throw new Error("ac_deactivated");
          }

          //checking user must exist in our DB else throwing error
          if (user) {
            console.log(`User with ID ${user._id} entered.`);
            req.body.hospitalId = user._id;
            req.body.userNameData = user.fullName;
            req.body.emailData = user.email;
            req.authUser = user;
            req.body.userTypes = user.userType;
            next();
          } else {
            throw new Error("invalid_token");
          }
        } else if (payload.doctorId) {
          user = await DoctorService().fetchByQuery({
            _id: payload.doctorId,
            token,
          });

          if (user && !user.isActive) {
            throw new Error("ac_deactivated");
          }

          //checking user must exist in our DB else throwing error
          if (user) {
            console.log(`Doctor with ID ${user._id} entered.`);
            req.body.doctorId = user._id;
            req.body.userNameData = user.fullName;
            req.body.emailData = user.email;
            req.authUser = user;
            req.body.userTypes = user.userType;
            next();
          } else {
            throw new Error("invalid_token");
          }
        }
      } else {
        throw new Error("invalid_token");
      }
    } catch (ex) {
      // console.log("heres",ex)

      req.msg = "invalid_token";
      if (ex.message == "ac_deactivated") req.msg = ex.message;

      req.rCode = 0;
      ResponseMiddleware(req, res, next);
    }
  };

  const verifyAdminToken = async (req, res, next) => {
    console.log("AuthMiddleware => verifyAdminToken");
    let usertoken = req.headers.authorization;
    try {
      if (usertoken) {
        let tokens = usertoken.split(" ");

        let token = tokens[1];
        let payload = jwt.verify(token, JWTSECRET);
        let user = await UserService().fetchByQuery({
          _id: payload.adminId,
          // token,
        });
        //checking user must exist in our DB else throwing error
        if (user) {
          console.log(`User with ID ${user._id} entered.`);
          req.body.adminId = user._id;
          req.body.userNameData = user.fullName;
          req.body.emailData = user.email;
          req.authUser = user;
          req.body.userTypes = user.userType;
          next();
        } else {
          throw new Error("invalid_token");
        }
      } else {
        throw new Error("invalid_token");
      }
    } catch (ex) {
      // console.log("heres",ex)

      req.msg = "invalid_token";
      if (ex.message == "ac_deactivated") req.msg = ex.message;

      req.rCode = 0;
      ResponseMiddleware(req, res, next);
    }
  };

  const verifyAdminIsLoggedIn = async (req, res, next) => {
    console.log("AuthMiddleware => verifyAdminToken");
    try {
      let { adminId } = req.body;

      let user = await UserService().fetchByQuery({
        _id: adminId,
        // token,
      });
      //checking user must exist in our DB else throwing error
      if (user.is_logout == false) {

        next();
      } else {
        throw new Error("Admin Not LoggedIn.");
      }
    } catch (ex) {
      // console.log("heres",ex)

      req.msg = "admin_not_loggedIn";
      if (ex.message == "ac_deactivated") req.msg = ex.message;

      req.rCode = 0;
      ResponseMiddleware(req, res, next);
    }
  };

  const checkEmailAndMobileToEditProfileDoctorAndHospital = async (
    req,
    res,
    next
  ) => {
    console.log("AuthMiddleware => checkEmailAndMobileToEditProfileDoctor");
    try {
      let { countryCode, mobileNumber, email, doctorId, hospitalId } = req.body;

      if (email) email = email.toLowerCase();

      let mobileExist = null;
      // if (countryCode && mobileNumber) {
      if (mobileNumber) {
        var query = {
          // countryCode,
          mobileNumber,
          _id: { $ne: hospitalId },
          isDeleted: false,
        };

        mobileExist = await HospitalService().fetchByQueryToEdit(query);
      }

      if (!mobileExist) {
        query = {
          // countryCode,
          mobileNumber,
          _id: { $ne: doctorId },
          isDeleted: false,
        };

        mobileExist = await DoctorService().fetchByQuery(query);
      }

      if (mobileExist) {
        req.rCode = 0;
        req.msg = "mobile_exist";
        ResponseMiddleware(req, res, next);
      } else {
        if (email) {
          let query = { email, _id: { $ne: hospitalId }, isDeleted: false };

          let emailExist = await HospitalService().fetchByQueryToEdit(query);

          if (!emailExist) {
            let query = { email, _id: { $ne: doctorId }, isDeleted: false };

            emailExist = await DoctorService().fetchByQuery(query);
          }

          if (emailExist) {
            req.rCode = 0;
            req.msg = "email_exist";
            ResponseMiddleware(req, res, next);
          } else {
            next();
          }
        } else {
          next();
        }
      }
    } catch (ex) { }
  };

  const checkEmailAndMobileToEditProfileUser = async (req, res, next) => {
    console.log("AuthMiddleware => checkEmailAndMobileToEditProfileUser");
    try {
      let { countryCode, mobileNumber, email, hospitalId } = req.body;

      if (email) email = email.toLowerCase();

      let mobileExist = null;
      // if (countryCode && mobileNumber) {
      if (mobileNumber) {
        var query = {
          // countryCode,
          mobileNumber,
          _id: { $ne: hospitalId },
          isDeleted: false,
        };

        mobileExist = await HospitalService().fetchByQueryToEdit(query);
      }

      // if (!mobileExist) {
      //   query = {
      //     // countryCode,
      //     mobileNumber,
      //     _id: { $ne: doctorId },
      //     isDeleted: false,
      //   };

      //   mobileExist = await DoctorService().fetchByQueryToEdit(query);
      // }

      if (mobileExist) {
        req.rCode = 0;
        req.msg = "mobile_exist";
        ResponseMiddleware(req, res, next);
      } else {
        if (email) {
          let query = { email, _id: { $ne: hospitalId }, isDeleted: false };

          let emailExist = await HospitalService().fetchByQueryToEdit(query);

          // if (!emailExist) {
          //   query = { email, _id: { $ne: doctorId }, isDeleted: false };

          //   emailExist = await DoctorService().fetchByQueryToEdit(query);
          // }

          if (emailExist) {
            req.rCode = 0;
            req.msg = "email_exist";
            ResponseMiddleware(req, res, next);
          } else {
            next();
          }
        } else {
          next();
        }
      }
    } catch (ex) { }
  };

  const isAccountDeleted = async (req, res, next) => {
    console.log("AuthMiddleware => isAccountDeleted");
    let { countryCode, mobileNumber, email } = req.body;
    let mobileExist = null;
    let hospitalExist = null;
    if (mobileNumber) {
      var query = {
        mobileNumber,
        isDeleted: true,
      };

      mobileExist = await DoctorService().fetchByQueryToEdit(query);
      hospitalExist = await HospitalService().fetchByQueryToEdit(query);
      console.log(mobileExist, hospitalExist, "dsjds")
    }

    if (mobileExist || hospitalExist) {
      return res.status(400).send({
        code: 0,
        message: "Your Account has been deleted.Please contact Admin.",
        data: {},
      });
    } else {
      next();
    }
  }

  return {
    verifyHotelToken,
    checkEmailAndMobileToEditProfileDoctorAndHospital,
    checkEmailAndMobileToEditProfileUser,
    verifyDoctorToken,
    verifyAdminToken,
    verifyToken,
    isAccountDeleted,
    verifyAdminIsLoggedIn
  };
};

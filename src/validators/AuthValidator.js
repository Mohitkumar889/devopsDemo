const { Validator } = require("node-input-validator");
const { validate, validations } = require("./index");

module.exports = () => {
  const authValidator = async (req, res, next) => {
    const v = new Validator(req.body, {
      login_type: validations.general.required,
    });
    validate(v, res, next, req);
  };

  const validateAdminLogin = async (req, res, next) => {
    const v = new Validator(req.body, {
      user_type: "required|in:1,2",
      email: validations.user.existsEmail,
      password: validations.general.requiredString
    });

    validate(v, res, next, req);
  };

  const validateEmailLogin = async (req, res, next) => {
    const v = new Validator(req.body, {
      email: validations.general.requiredString,
      password: validations.general.requiredString,
    });

    validate(v, res, next, req);
  };

  const validateForgotPassword = async (req, res, next) => {
    var query_object = {};
    if (req.body.user_type == "user") {
      query_object = { email: validations.user.existsEmail };
    } else if (req.body.user_type == "warehouse") {
      query_object = { email: validations.warehouse.warehouse };
    } else {
      query_object = { email: validations.admin.existsEmail };
    }
    const forgot_password_v = new Validator(req.body, query_object);

    validate(forgot_password_v, res, next, req);
  };

  const validateAdminForgotPassword = async (req, res, next) => {
    const v = new Validator(req.body, {
      email: validations.user.existsEmail,
    });

    validate(v, res, next, req);
  }

  const validateOtp = async (req, res, next) => {
    const v = new Validator(req.body, {
      mobileNumber: validations.general.requiredString,
      // countryCode: validations.general.requiredString,
      otp: validations.general.requiredInt,
    });

    validate(v, res, next, req);
  };

  const validateAdminVerifyOtp = async (req, res, next) => {
    const v = new Validator(req.body, {
      // token: validations.general.requiredString,
      otp: validations.general.requiredInt,
    });

    validate(v, res, next, req);
  };

  const validateDoctorOtp = async (req, res, next) => {
    const v = new Validator(req.body, {
      mobileNumber: validations.doctor.existsmobile,
      // countryCode: validations.general.requiredString,
      otp: validations.general.requiredInt,
    });

    validate(v, res, next, req);
  };

  const validateResendOtp = async (req, res, next) => {
    const v = new Validator(req.body, {
      otp_for: validations.general.requiredString,
    });

    validate(v, res, next, req);
  };

  const validateDataForOtp = async (req, res, next) => {
    let otp_for = req.body.otp_for;
    if (
      otp_for == "signup_via_mobile" ||
      otp_for == "login" ||
      otp_for == "change_mobile"
    ) {
      const signup_v = new Validator(req.body, {
        mobile: validations.general.required,
        // countryCode: validations.general.required,
      });

      validate(signup_v, res, next, req);
    }

    if (otp_for == "signup_via_email") {
      const signup_v = new Validator(req.body, {
        email: validations.user.existsEmail,
        password: validations.general.required,
      });

      validate(signup_v, res, next, req);
    }
    if (otp_for == "forgot_password") {
      var query_object = {};
      if (req.body.user_type == "user") {
        query_object = { email: validations.user.existsEmail };
      } else if (req.body.user_type == "warehouse") {
        query_object = { email: validations.warehouse.warehouse };
      } else {
        query_object = { email: validations.admin.existsEmail };
      }
      const forgot_password_v = new Validator(req.body, query_object);

      validate(forgot_password_v, res, next, req);
    }
  };

  const validateResetPassword = async (req, res, next) => {
    const v = new Validator(req.body, {
      newPassword: validations.general.requiredString,
      confirmPassword: validations.general.requiredString,
    });

    validate(v, res, next, req);
  };

  const validateChangePassword = async (req, res, next) => {
    const v = new Validator(req.body, {
      newPassword: validations.general.requiredString,
      currentPassword: validations.general.requiredString,
      confirmPassword: validations.general.requiredString,
    });

    validate(v, res, next, req);
  };

  const validateUserType = async (req, res, next) => {
    const v = new Validator(req.body, {
      user_type: validations.general.required,
    });
    req.body.user_type = req.body.user_type;

    validate(v, res, next, req);
  };



  const validatePostUserType = async (req, res, next) => {
    const v = new Validator(req.body, {
      user_type: validations.general.required,
    });

    validate(v, res, next, req);
  };

  const validateSupport = async (req, res, next) => {
    let { user_type } = req.body;
    let v = {};
    if (user_type == null) {
      return res.status(400).send({
        code: 0,
        message: "user_type field is required.",
        data: {},
      });
    }
    if (user_type == "1") {
      v = new Validator(req.body, {
        name: validations.general.required,
        subject: validations.general.required,
        message: validations.general.required,
      });
    } else {
      v = new Validator(req.body, {
        subject: validations.general.required,
        message: validations.general.required,
      });
    }
    validate(v, res, next, req);
  };

  const validateRegister = async (req, res, next) => {
    const v = new Validator(req.body, {
      email: validations.general.requiredEmail,
      password: validations.general.requiredString,
    });

    validate(v, res, next, req);
  };

  const addContactUs = async (req, res, next) => {
    const v = new Validator(req.body, {
      name: validations.general.requiredString,
      subject: validations.general.requiredString,
      message: validations.general.required
    });

    validate(v, res, next, req);
  }

  const contactIdValidator = async (req, res, next) => {
    const v = new Validator(req.params, {
      id: validations.contactUs.id,
    });
    validate(v, res, next, req);
  }

  return {
    authValidator,
    validateAdminLogin,
    validateForgotPassword,
    validateOtp,
    validateResendOtp,
    validateDataForOtp,
    validateResetPassword,
    validateChangePassword,
    validateUserType,
    validatePostUserType,
    validateEmailLogin,
    validateDoctorOtp,
    validateSupport,
    validateRegister,
    validateAdminForgotPassword,
    validateAdminVerifyOtp,
    addContactUs,
    contactIdValidator
  };
};

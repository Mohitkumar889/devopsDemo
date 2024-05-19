const { Validator } = require("node-input-validator");
const { validate, validations } = require("./index");

module.exports = () => {
  const validateMobile = async (req, res, next) => {
    const v = new Validator(req.body, {
      // countryCode: validations.general.requiredString,
      mobile: validations.user.mobile,
    });

    validate(v, res, next, req);
  };

  const validateOtp = async (req, res, next) => {
    const v = new Validator(req.body, {
      // countryCode: validations.general.requiredString,
      mobile: validations.user.existsmobile,
      code: validations.general.requiredInt,
    });

    validate(v, res, next, req);
  };

  const validateEmailAndPassword = async (req, res, next) => {
    const v = new Validator(req.body, {
      email: validations.user.email,
      password: validations.general.requiredString,
    });

    validate(v, res, next, req);
  };

  const validateCompleteProfile = async (req, res, next) => {
    const v = new Validator(req.body, {
      name: validations.general.requiredString,
      dob: validations.general.requiredString,
      gender: validations.general.requiredString,
    });

    validate(v, res, next, req);
  };

  const validateEditHospitalProfile = async (req, res, next) => {
    var hId = req.body.hospitalId;
    const v = new Validator(req.body, {
      hospitalName: validations.general.nullableString,
      registrationNumber: "nullable|unique:Hospital,registrationNumber,_id" + "," + hId + "",
      contactPersonName: validations.general.nullableString,
      mobileNumber: "nullable|unique:Hospital,mobileNumber,_id" + "," + hId + "",
      email: "nullable|unique:Hospital,email,_id" + "," + hId + "",
      nabhAccredited: validations.general.nullableBoolean,
      hospitalType: validations.general.nullableString,
      address: validations.general.nullableString,
      city: validations.general.nullableString,
      area: validations.general.nullableString,
      lat: validations.general.nullableString,
      long: validations.general.nullableString,
    });

    validate(v, res, next, req);
  };

  const validateDeviceToken = async (req, res, next) => {
    const v = new Validator(req.body, {
      device_token: validations.general.required,
      device_type: validations.general.requiredString,
    });

    validate(v, res, next, req);
  };

  const validateDoctorId = async (req, res, next) => {
    let { id } = req.params;

    if (id) {
      req.body.doctorId = id;
    }

    const v = new Validator(req.params, {
      id: validations.doctor.id,
    });

    validate(v, res, next, req);
  };

  const validateHospitalId = async (req, res, next) => {
    let { id } = req.params;

    if (id) {
      req.body.hospitalId = id;
    }

    const v = new Validator(req.params, {
      id: validations.hospital.id,
    });

    validate(v, res, next, req);
  };

  const validateDoctorSlots = async (req, res, next) => {
    let { id } = req.params;

    if (id) {
      req.body.doctorId = id;
      req.query.id = id;
    }

    const v = new Validator(req.query, {
      id: validations.doctor.id,
      date: validations.general.requiredDate,
    });

    validate(v, res, next, req);
  };

  const validateDoctorAppointment = async (req, res, next) => {
    let { id } = req.params;

    if (id) {
      req.body.doctorId = id;
    }

    const v = new Validator(req.body, {
      doctorId: validations.doctor.id,
      date: validations.general.requiredString,
      time: validations.general.required,
      cost: validations.general.requiredNumeric,
    });

    validate(v, res, next, req);
  };

  // const validateUserId = async (req, res, next) => {
  //   let { id } = req.params;

  //   if (id) {
  //     req.body.userId = id;
  //   }

  //   const v = new Validator(req.params, {
  //     id: validations.user.id,
  //   });

  //   validate(v, res, next, req);
  // };

  const validateAppointmentId = async (req, res, next) => {
    let { id } = req.params;

    if (id) {
      req.body.appointmentId = id;
    }

    const v = new Validator(req.params, {
      id: validations.appointment.id,
    });

    validate(v, res, next, req);
  };

  const validateAvailability = async (req, res, next) => {
    const v = new Validator(req.body, {
      costPerSlot: validations.general.requiredInt,
      days: validations.general.requiredArray,
      days: validations.general.requiredArray,
      "days.*.weekday": validations.general.requiredNumeric,
      "days.*.startTime": validations.general.requiredString,
      "days.*.endTime": validations.general.requiredString,
      "days.*.checked": validations.general.requiredBoolean,
    });

    validate(v, res, next, req);
  };

  const validateWishListId = async (req, res, next) => {
    let { id } = req.params;

    if (id) {
      req.body.wishId = id;
    }

    const v = new Validator(req.params, {
      id: validations.wishlist.id,
    });

    validate(v, res, next, req);
  };

  const validateCart = async (req, res, next) => {
    const v = new Validator(req.body, {
      productId: validations.product.id,
      noOfUnits: validations.general.requiredInt,
      deviceId: validations.general.requiredString,
    });

    validate(v, res, next, req);
  };

  const validateCartId = async (req, res, next) => {
    let { id } = req.params;

    if (id) {
      req.body.cartId = id;
    }

    const v = new Validator(req.params, {
      id: validations.cart.id,
    });

    validate(v, res, next, req);
  };

  const validateOderId = async (req, res, next) => {
    let { id } = req.params;

    if (id) {
      req.body.orderId = id;
    }

    const v = new Validator(req.params, {
      id: validations.order.id,
    });

    validate(v, res, next, req);
  };

  const validateProductRating = async (req, res, next) => {
    let { productRatingId } = req.body;

    if (productRatingId) {
      const v = new Validator(req.body, {
        productRatingId: validations.product.productRatingId,
        productId: validations.product.id,
        orderId: validations.order.id,
        review: validations.general.requiredString,
        rating: validations.general.requiredInt,
      });

      validate(v, res, next, req);
    } else {
      const v = new Validator(req.body, {
        productId: validations.product.id,
        orderId: validations.order.id,
        review: validations.general.requiredString,
        rating: validations.general.requiredInt,
      });

      validate(v, res, next, req);
    }
  };

  const validateIndividualMemberForDoctor = async (req, res, next) => {
    const user_v = new Validator(req.body, {
      partnerId: validations.user.id,
    });

    validate(user_v, res, next, req);
  };

  const validateIndividualMemberForUser = async (req, res, next) => {
    const user_v = new Validator(req.body, {
      partnerId: validations.doctor.id,
    });

    validate(user_v, res, next, req);
  };

  const validateRequirementRequestId = async (req, res, next) => {
    const user_v = new Validator(req.params, {
      id: validations.requirementRequest.id,
    });
    validate(user_v, res, next, req);
  }

  const validateSendRequest = async (req, res, next) => {
    req.body.id = req.params.id;
    const user_v = new Validator(req.body, {
      id: validations.requirementRequest.id,
      doctors: validations.general.requiredArray,
      "doctors.*.doctorId": validations.general.requiredString,
    });
    validate(user_v, res, next, req);
  }

  const validateUserId = async (req, res, next) => {
    let { user_type } = req.body;
    let user_v = new Validator(req.body, {
      user_type: validations.hospital.requiredExperience,
    });
    if (user_type == "1") {
      user_v = new Validator(req.body, {
        id: validations.hospital.id,
      });
    }
    if (user_type == "2") {
      user_v = new Validator(req.body, {
        id: validations.doctor.id,
      });
    }
    validate(user_v, res, next, req);
  }

  return {
    validateMobile,
    validateOtp,
    validateEmailAndPassword,
    validateCompleteProfile,
    validateEditHospitalProfile,
    validateDeviceToken,
    validateAvailability,
    validateDoctorId,
    validateWishListId,
    validateCart,
    validateCartId,
    validateOderId,
    validateProductRating,
    validateDoctorSlots,
    validateDoctorAppointment,
    validateAppointmentId,
    validateUserId,
    validateIndividualMemberForDoctor,
    validateIndividualMemberForUser,
    validateHospitalId,
    validateRequirementRequestId,
    validateSendRequest
  };
};

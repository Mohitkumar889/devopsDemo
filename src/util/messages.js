module.exports = (lang = "en") => {
  const hospital_added = {
    en: "Hospital registered successfully",
  };

  const token_generated = {
    en: "Token generated successfully",
  };

  const hospital_details = {
    en: "Hospital details",
  };

  const SubService_activated = {
    en: "SubService activated",
  };

  const SubService_deactivated = {
    en: "SubService deactivated",
  };

  const profile_complete = {
    en: "Profile completed successfully",
  };

  const profile_changed = {
    en: "Profile updated successfully",
  };

  const hospital_not_found = {
    en: "Hospital record not found with given details!",
  };

  const hospital_already_found = {
    en: "Hospital record found with given details! Try to login",
  };

  const incorrect_password = {
    en: "Entered password is incorrect!",
  };

  const incorrect_current_password = {
    en: "Entered current password is incorrect!",
  };

  const otp_sent = {
    en: "OTP sent on given mobile",
  };

  const otp_sent_on_mail = {
    en: "OTP sent on given email",
  };
  const incorrect_otp = {
    en: "Entered OTP is incorrect!",
  };

  const otp_not_verified = {
    en: "OTP is not verified!",
  };

  const otp_verified = {
    en: "OTP verified successfully!",
  };

  const mobile_updated = {
    en: "Mobile number changed successfully!",
  };

  const password_changed = {
    en: "Password updated successfully. Please login with new password!",
  };

  const maxLength = function (name) {
    return {
      en: `${name} exceeded the character limit!`,
    };
  };

  const required = function (name) {
    return {
      en: `${name} is required!`,
    };
  };

  const ampmTime = function (name) {
    return {
      "en": `The ${name} field must be in the format hh:mm AM/PM`
    }
  }

  const hrlyTime = function (name) {
    return {
      "en": `The ${name} field must be in the format HH:mm`
    }
  }

  const invalid_token = {
    en: "Invalid token!",
  };

  const admin_not_loggedIn = {
    en: "Admin Not LoggedIn",
  };

  const ac_deactivated = {
    en: "Your account is deactivated by admin!",
  };

  const unauthorized = {
    en: "You do not have permission to make changes.",
  };

  const social_id_missing = {
    en: "social Provider id is missing!",
  };

  const mobile_exist = {
    en: "Entered mobile number already registered, Please change and try again!",
  };

  const email_exist = {
    en: "Email already registered, Please change and try again!",
  };

  const coupon_exist = {
    en: "CouponCode already registered, Please change and try again!",
  };

  const sub_Service_added = {
    en: "Sub Service added successfully!",
  };

  const sub_Service_list = {
    en: "Sub Service list",
  };

  const Service_added = {
    en: "Service added successfully!",
  };

  const Service_list = {
    en: "Service list",
  };

  const Service_details = {
    en: "Service details",
  };

  const sub_Service_details = {
    en: "Sub-Service details",
  };

  const Team_deleted = {
    en: "Team deleted successfully!",
  };

  const sub_Service_deleted = {
    en: "Sub Service deleted successfully!",
  };

  const hospitals_list = {
    en: "Hospitals list",
  };

  const status_changed = {
    en: "Status changed successfully",
  };

  const privacy_policy = {
    en: "Privacy policy",
  };
  const about_us = {
    en: "About us",
  };
  const term_of_service = {
    en: "Term of services",
  };

  const privacy_prefrences = {
    en: "Privacy prefrences",
  };

  const setting = {
    en: "Data saved successfully",
  };

  const admin_not_found = {
    en: "Admin record not found with given details!",
  };

  const admin_already_found = {
    en: "Admin record found with given details!",
  };

  const hospital_deleted = {
    en: "Hospital deleted successfully",
  };
  const hospital_reactivate = {
    en: "Hospital Re-Activate successfully",
  };

  const sub_Service_updated = {
    en: "Sub Service updated successfully!",
  };

  const Service_updated = {
    en: "Service updated successfully!",
  };

  const Session_expired = {
    en: "Session expired, please login again.",
  };

  const logout = {
    en: "Logout successfully",
  };

  const Accountdelete = {
    en: "Deleted successfully",
  };

  const token_changed = {
    en: "Device token updated successfully!",
  };

  const notification_permission_changed = {
    en: "Notification permission updated successfully!",
  };

  const notification_list = {
    en: "Notification list",
  };

  const hospital_activated = {
    en: "Hospital activated successfully",
  };
  const hospital_deactivated = {
    en: "Hospital deactivated successfully",
  };

  const success = {
    en: "success",
  };

  const Service_deactivated = {
    en: "Service deactivated",
  };

  const Service_activated = {
    en: "Service activated",
  };

  const admin_activated = {
    en: "admin activated",
  };

  const admin_deactivated = {
    en: "admin deactivated",
  };

  const Not_allow = {
    en: "Your not allow for this service!",
  };

  const failure = {
    en: "failure",
  };

  const Supplier_not_found = {
    en: "Supplier not found!",
  };

  const Supplier_details = {
    en: "Supplier detail",
  };

  const doctor_list = {
    en: "Doctor list",
  };

  const doctor_deleted = {
    en: "Doctor deleted successfully",
  };
  const doctor_reactivate = {
    en: "Doctor Re-Activated successfully",
  };
  const contact_admin = {
    en: "Your Account has been deleted.Please contact Admin.",
  }

  return {
    required,
    maxLength,
    ampmTime,
    hrlyTime,
    coupon_exist: coupon_exist[lang],
    hospital_added: hospital_added[lang],
    Supplier_not_found: Supplier_not_found[lang],
    failure: failure[lang],
    Not_allow: Not_allow[lang],
    admin_deactivated: admin_deactivated[lang],
    admin_activated: admin_activated[lang],
    Service_activated: Service_activated[lang],
    Service_deactivated: Service_deactivated[lang],
    success: success[lang],
    hospital_deactivated: hospital_deactivated[lang],
    hospital_activated: hospital_activated[lang],
    notification_list: notification_list[lang],
    token_generated: token_generated[lang],
    notification_permission_changed: notification_permission_changed[lang],
    token_changed: token_changed[lang],
    logout: logout[lang],
    Accountdelete: Accountdelete[lang],
    contact_admin: contact_admin[lang],
    Service_updated: Service_updated[lang],
    sub_Service_updated: sub_Service_updated[lang],
    hospital_deleted: hospital_deleted[lang],
    hospital_reactivate: hospital_reactivate[lang],
    admin_already_found: admin_already_found[lang],
    admin_not_found: admin_not_found[lang],
    setting: setting[lang],
    status_changed: status_changed[lang],
    hospitals_list: hospitals_list[lang],
    sub_Service_deleted: sub_Service_deleted[lang],
    invalid_token: invalid_token[lang],
    admin_not_loggedIn: admin_not_loggedIn[lang],
    ac_deactivated: ac_deactivated[lang],
    unauthorized: unauthorized[lang],
    social_id_missing: social_id_missing[lang],
    mobile_exist: mobile_exist[lang],
    email_exist: email_exist[lang],
    sub_Service_added: sub_Service_added[lang],
    sub_Service_list: sub_Service_list[lang],
    Service_added: Service_added[lang],
    Service_list: Service_list[lang],
    Service_details: Service_details[lang],
    sub_Service_details: sub_Service_details[lang],
    Team_deleted: Team_deleted[lang],
    hospital_details: hospital_details[lang],
    SubService_activated: SubService_activated[lang],
    SubService_deactivated: SubService_deactivated[lang],
    profile_complete: profile_complete[lang],
    profile_changed: profile_changed[lang],
    hospital_not_found: hospital_not_found[lang],
    hospital_already_found: hospital_already_found[lang],
    incorrect_password: incorrect_password[lang],
    incorrect_current_password: incorrect_current_password[lang],
    otp_sent: otp_sent[lang],
    otp_sent_on_mail: otp_sent_on_mail[lang],
    incorrect_otp: incorrect_otp[lang],
    otp_not_verified: otp_not_verified[lang],
    otp_verified: otp_verified[lang],
    mobile_updated: mobile_updated[lang],
    password_changed: password_changed[lang],
    Supplier_details: Supplier_details[lang],
    doctor_list: doctor_list[lang],
    doctor_deleted: doctor_deleted[lang],
    doctor_reactivate: doctor_reactivate[lang]
  };
};

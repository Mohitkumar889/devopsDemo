const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const CMSSchema = new Schema({
    termsAndConditions: {
        type: String,
        default: "",
    },
    aboutUs: {
        type: String,
        default: "",
    },
    privacyPolicy: {
        type: String,
        default: "",
    }
});

var CMS = mongoose.model("CMS", CMSSchema);

module.exports = CMS;

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ContactUsSchema = new Schema(
    {
        name: {
            type: String,
            default: "",
        },
        subject: {
            type: String,
            default: "",
        },
        message: {
            type: String,
            required: [true, "message field require!"],
        },
        // countryCode: {
        //     type: String,
        //     default: "",
        // },
        // mobileNumber: {
        //     type: String,
        //     default: "",
        // },
        // email: {
        //     type: String,
        //     required: [true, "email require!"],
        // },
    },
    { timestamps: true }
);

var ContactUs = mongoose.model("ContactUs", ContactUsSchema);

module.exports = ContactUs;

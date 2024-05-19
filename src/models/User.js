const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        name: {
            type: String,
            default: "",
        },
        userType: {
            type: String,
            enum: ["1", "2"], // 1 admin , 2 user
            default: "1",
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            default: "",
        },
        otp: {
            type: Number,
        },
        is_logout: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

var User = mongoose.model("User", userSchema);

module.exports = User;

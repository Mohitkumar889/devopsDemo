const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const teamSchema = new Schema(
    {
        name: {
            type: String,
            default: "",
        },
        header: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            default: "",
        },
        designation: {
            type: String,
            default: "",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

var Team = mongoose.model("Team", teamSchema);

module.exports = Team;

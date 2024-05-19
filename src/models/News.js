const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const newsSchema = new Schema(
    {
        title: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            default: "",
        },
        description: {
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

var News = mongoose.model("News", newsSchema);

module.exports = News;

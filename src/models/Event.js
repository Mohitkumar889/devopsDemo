const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const eventSchema = new Schema(
    {
        title: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            default: "",
        },
        location: {
            type: String,
            default: "",
        },
        lat: {
            type: String,
            default: "",
        },
        long: {
            type: String,
            default: "",
        },
        geo_json_location: {
            type: {
                type: String, // Don't do `{ location: { type: String } }`
                enum: ['Point'], // 'location.type' must be 'Point'
                default: 'Point'
            },
            coordinates: {
                type: [Number],
                default: []
            }
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

var Event = mongoose.model("Event", eventSchema);

module.exports = Event;

const mongoose = require("mongoose");
const { mongodDbUrl } = require('../../config/config');
const mongodbURL = mongodDbUrl;
mongoose.connect(mongodbURL, {
    // useNewUrlParser: true,

});

const con = mongoose.connection;
mongoose.set("debug", true);
con.on("open", () => {
    console.log("connected to database");
});

module.exports = con;

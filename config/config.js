const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT,
    mongodDbUrl: process.env.mongodbURL,
    jwtsecret: process.env.JWTSECRET
};

const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    console.log(process.env.DATABASE_URL);
    mongoose.connect(process.env.DATABASE_URL,  {})
    .then(() => console.log("DB connection establised successfully!"))
    .catch((err) => console.log("Something went wrong while connection to DB", err))
}

module.exports = dbConnect;

// instantiate app
const express = require('express');
const app = express();

// routes
const userRoutes = require('../backend/routes/User');
const profileRoutes = require('../backend/routes/Profile');
const courseRoutes = require('../backend/routes/Course');
// const paymentRoutes = require('../backend/routes/Payments');   

// load configuration of env file in process
require('dotenv').config();

const dbConnect = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors')  //frontend-3000 backend-4000, backend frontend ki req ko fulfill/entertain kre - cors
const {cloudinaryConnect} = require('./config/cloudinary');
const fileUpload = require('express-fileupload');

// define port
const PORT = process.env.PORT || 4000;

// connect to db
dbConnect();

// middlewares
// add body parser
app.use(express.json());
app.use(cookieParser());  //cookie-parser
app.use(
    cors({
        origin: "http://localhost:5173",   //very imp - to fulfill frontend request
        credentials:true
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

// connnect to cloudinary
cloudinaryConnect();

// import route, and mount with /api/v1
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/course', courseRoutes);
// app.use('/api/v1/payment', PaymentRoutes); 

// default route
app.get("/", (req, res) => {
    return res.json({
        success:true,
        message:"Your server is up and running..."
    })
})

// activate server
app.listen(PORT, () => {
    console.log(`App listen at port ${PORT} successfully`)
})


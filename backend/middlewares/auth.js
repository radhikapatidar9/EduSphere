const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');

exports.auth = async(req, res, next) => {

    try {

        let token = req.header('Authorization')?.replace("Bearer ", "") || req.cookies.token;
        console.log("token", token);

        if(!token) {
            return res.status(401).json({
                success:false,
                message: 'Token missing!'
            })
        }

        // verify token
        try {

            let decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("token decode", decode);

            req.user = decode;

        } catch(err) {
            console.log(err);
            return res.status(401).json({
                success:false,
                message: 'Error occured while token decoding!'
            })

        }

        next();

    } catch(err) {
        console.log("error occured while auth", err);
        res.json({
            success:false,
            message: "error occured"
        })
    }
}

exports.isStudent = (req, res, next) => {
    try {
        if(req.user.accountType != 'Student') {
            return res.status(401).json({
                success:false,
                message: "This is protected route for students!"
            })
        }
        res.status(200).json({
            success:true,
            message: "Welcome to protected route of student"
        })
        next();
    }
    catch(err) {

        return res.status(401).json({
                success:false,
                message: "Error occured while verifiing student token!"
            })

    }
} 

exports.isAdmin = (req, res, next) => {
    try {
        if(req.user.accountType != 'Admin') {
            return res.status(401).json({
                success:false,
                message: "This is protected route for Admin!"
            })
        }
        //  res.status(200).json({
        //     success:true,
        //     message: "Welcome to protected route of admin"
        // })
        next();
    }
    catch(err) {

        return res.status(401).json({
                success:false,
                message: "Error occured while verifiing student token!"
            })

    }
} 

exports.isInstructor = (req, res, next) => {
    try {
        if(req.user.accountType != 'Instructor') {
            return res.status(401).json({
                success:false,
                message: "This is protected route for Instructor!"
            })
        }
        // res.status(200).json({
        //     success:true,
        //     message: "Welcome to protected route of Instructor"
        // })
        next();
    }
    catch(err) {

        return res.status(401).json({
                success:false,
                message: "Error occured while verifiing Instructor token!"
            })

    }
} 
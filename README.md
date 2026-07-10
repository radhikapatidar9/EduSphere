# EduSphere

EduSphere is a scalable RESTful API developed with Node.js, Express.js, and MongoDB. It serves as the backend of an online Learning Management System, offering secure authentication, course management, user management, and seamless API integration.

## Features

- User Authentication & Authorization
- JWT-based Authentication
- Role-based Access Control (Admin, Instructor, Student)
- Course Management APIs
- User Profile Management
- File Upload Support
- Cloudinary Integration
- Email Notifications
- MongoDB Database Integration
- RESTful API Architecture
- Secure Password Hashing with bcrypt
- Razorpay Integration

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt
- Cloudinary
- Nodemailer
- dotenv

## Project Structure

```
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── uploads/
├── .env
├── package.json
└── server.js
```

## Installation

Clone the repository

```bash
git clone https://github.com/radhikapatidar9/EduSphere.git
```

Navigate to the project

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file and configure the required environment variables.

Start the server

```bash
npm run dev
```

or

```bash
npm start
```

## Environment Variables

Create a `.env` file with the following variables:

```env
PORT=
MONGODB_URL=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
MAIL_HOST=
MAIL_USER=
MAIL_PASS=
```

## API

The backend exposes REST APIs for:

- Authentication
- Users
- Courses
- Categories
- Sections
- Subsections
- Payments
- Ratings & Reviews
- Profile Management




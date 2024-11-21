const express = require('express');
const app = express();
const cors = require("cors");

// env files:-
require('dotenv').config();
require("./config/db");
const PORT = process.env.PORT;

// middlewares:-
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// routerImports:-
const indexRouter = require('./Routes/index');
const universityRoutes = require('./Routes/UniversityRouter');
const collageRoutes = require('./Routes/CollageRouter');
const adminRoutes = require('./Routes/AdminRouter');
const studentRoutes = require('./Routes/StudentRouter');
const staffRoutes = require('./Routes/StaffRouter');
const departmentRoutes = require('./Routes/DepartmentRouter');



// Use Routes:-
app.use('/', indexRouter);
app.use('/ums/admins', adminRoutes);
app.use('/ums/universities', universityRoutes);
app.use('/ums/collages', collageRoutes);
app.use('/ums/students', studentRoutes);
app.use('/ums/staff', staffRoutes);
app.use('/ums/department', departmentRoutes);

// listning:-
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
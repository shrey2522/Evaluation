const express= require('express');
const pool = require('./config/db');
const session = require('express-session');
const userRoutes= require('./routes/userRoute');
const authRoute= require('./routes/authRoute');
const leaveRoutes = require('./routes/leaveRoute');
const adminRoutes = require('./routes/adminRoute');
require('dotenv').config();


const app= express();

app.use(express.json());

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}));

app.use('/api/auth',authRoute);
app.use('/api/users',userRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/admin', adminRoutes); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
    
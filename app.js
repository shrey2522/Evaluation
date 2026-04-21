const express= require('express');
const pool = require('./config/db');
const userRoutes= require('./routes/userRoute');
const authRoute= require('./routes/authRoute');
const leaveRoutes = require('./routes/leaveRoute');
require('dotenv').config();


const app= express();

app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/users',userRoutes);
app.use('/api/leaves', leaveRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
    
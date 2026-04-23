const {sendError} = require('../utils/responseHandler');
const isLoggedIn= (req,res,next)=>{
    if(!req.session || !req.session.user){
        return sendError(res,401,"Unauthorized. please login first");
    }
    next();
};

const isAdmin= (req,res,next)=>{
    if(!req.session || !req.session.user){
        return sendError(res,401,"Unauthorized please login first"); 
    }
    if(req.session.user.role !== 'admin'){
        return sendError(res,403,"access denied. admin access only");
    }
    next();
};
module.exports= {
    isLoggedIn,
    isAdmin
};


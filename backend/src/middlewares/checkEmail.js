const User = require('../models/user');

const checkEmail =  (req, res, next) => {
    const { email } = req.body;
    User.findOne({
        where:{
            email:email
        }
    })
    .then((val)=>{
        if(val){
            return res.status(400).json({
                status:"Failure",
                message:"Email already exist"
            })
        }
        else{
            next();
        }
    })
    .catch((err)=>{
        res.status(400).json({
            status:"failure",
            error:err
        })
    })
}

module.exports = checkEmail;
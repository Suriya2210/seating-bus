
const decodejwt=require('../../src/utils/token')

exports.decodejwt=(req,res,next)=>{

    
    const jwt_token=req.body.jwttoken;
    console.log(req.body);
    const user_date=decodejwt.decode(jwt_token);
    console.log(user_date);
    console.log(user_date.user)
    res.status(200).json({
        status:"success",
        data:user_date
    })
}


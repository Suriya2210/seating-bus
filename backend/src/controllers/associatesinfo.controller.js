const {Sequelize} = require('sequelize');
const User = require('../models/user');
const BookSeat = require('../models/seat_booking');
exports.getAssociates = (req, res, next)=>{
    User.findAll({where:{
        manager_id:req.params.manager_id
    }}).then(users=>{
        console.log(users);
        res.status(200).send({
            status: "success",
            data: {
                users:users
            }
        });
    })
}
 
exports.getAssociate = (req,res,next)=>{
    User.findOne({where:{
        associate_id:req.params.associate_id
    }}).then(user=>{
        console.log(user);
        res.status(200).send({
            stats:"success",
            data:{
                user:user
            }
        });
    })
}

exports.getBookingHistory = (req,res,next)=>{
    BookSeat.findAll({where:{
        seat_booked_by:req.params.associate_id
    }}).then(user=>{
        console.log(user);
        res.status(200).send({
            stats:"success",
            data:{
                user:user
            }
        });
    })
}
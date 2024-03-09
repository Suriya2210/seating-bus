const {Sequelize} = require('sequelize')
const seats_info = require('../models/seats_info');
const { set } = require('../app');

exports.add_seat=(req,res,next)=>{

    const data={
        seat_number:req.body.seat_number,
        status:req.body.status,
        created_by:req.body.created_by,
        updated_by:req.body.updated_by
    }

    seats_info.create(data)
    .then((data)=>{
        res.status(200).json({
            status:"success",
            data:data
        })
    }).catch((err)=>{
        res.status(400).json({
            status:"failure",
            error:err
        })
    })

}


exports.delete_seat=(req,res,next)=>{
    var seat_number=req.params.seat_number.toString();
    seats_info.findOne({
        where:{
            seat_number:seat_number
        }
    })
    .then((data)=>{
        if(!data){
            return res.status(400).json({
                status:"failure",
                message:`There is no seat with number ${seat_number}`
            })
        }
        data.destroy();
        console.log(`Deleted the seat ${seat_number}`)
        return res.status(200).json({
            status:"success",
            message:`Seat ${seat_number} deleted successfully`,
            data:data
        })
    })
    .catch((err)=>{
        return res.status(400).json({
            status:"failure",
            error:err.message
        })
    })
}
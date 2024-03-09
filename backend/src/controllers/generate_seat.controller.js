const {Sequelize} = require('sequelize')
const book_seat = require('../models/seat_booking')
const { exec } = require('child_process');

exports.generate = (req,res,next)=>{
    
    try{
        var {from_date,to_date}=req.body;
        var k=new Date(from_date),j=new Date(to_date);
        console.log(k+" "+j);
        while(k<=j){
            for(let i=1;i<=160;i++){
                var seat_no=i.toString();
                let size=seat_no.length;
                for(let z=size;z<3;z++){
                    seat_no='0'+seat_no;
                }
                let seat_name="WKS"+seat_no;
                const data={
                    seat_number:seat_name,
                    seat_selection_date:k,
                    seat_status:1,
                    seat_booking_status:0,
                    created_by:"varsan",
                    updated_by:"varsan"
                }
                book_seat.create(data)
            }
            console.log(`Date ${k} added`)
            k.setDate(k.getDate() + 1);
        }
        res.status(200).json({
            status:"success",
            message:"Seat generation is success"
        })
    }
    catch(err){
        res.status(400).json({
            status:"failure in generate seats",
            error:err.message
        })
    }
}

exports.get_seat_info=(req,res,next)=>{

    const date=new Date(req.params.date);
    book_seat.findAll({
        where:{
            seat_selection_date:date
        }
    })
    .then((val)=>{
        res.status(200).json({
            status:"success",
            datas:val
        })
    })
    .catch((err)=>{
        res.status(400).json({
            status:"failure",
            error:err,
            message:"Error in get_seat_info method in generate_seat.controller.jsx"
        })
    })
}

exports.block_seats=(req,res,next)=>{
    try{
        const {date,seat_numbers}= req.body
        for(let i=0;i<seat_numbers.length;i++){
            book_seat.findOne({
                where:{
                    seat_selection_date:date,
                    seat_number:seat_numbers[i]
                }
            })
            .then((val)=>{
                val.seat_status=2;
                val.save();
            })  
        }
        res.status(200).json({
            status:"success",
            message:"Seat is successfully blocked by the admin"
        })
    }
    catch(err){
        res.status(400).json({
            status:"ailure",
            message:"Failed in blocking the seat",
            error:err
        })
    }
}

exports.block_seat_forguest=(req,res,next)=>{
    try{
        const {date,seat_number,booked_for_name,guest_email}= req.body
        console.log(date,seat_number,booked_for_name);
        book_seat.findOne({
            where:{
                seat_selection_date:date,
                seat_number:seat_number,
            }
        })
        .then((val)=>{
            val.seat_status=2;
            val.booked_for_name=booked_for_name;
            val.guest_email=guest_email,
            val.is_guest=true,
            val.save();
            res.status(200).json({
                status:"success",
                data:val,
                message:"Seat is successfully blocked by the guest"
            })
        })
        .catch((err)=>{
            res.status(400).json({
                status:"Failure",
                message:"Failed in blocking the seat for guest",
                error:err
            })
        })
    }
    catch(err){
        res.status(400).json({
            status:"Failure",
            message:"Failed in blocking the seat for guest",
            error:err
        })
    }
}

exports.unblock_seats=(req,res,next)=>{
    try{
        const {date,seat_numbers}= req.body
        for(let i=0;i<seat_numbers.length;i++){
            book_seat.findOne({
                where:{
                    seat_selection_date:date,
                    seat_number:seat_numbers[i]
                }
            })
            .then((val)=>{
                val.seat_status=1;
                val.booked_for_name=null,
                val.guest_email=null,
                val.is_guest=null,
                val.save();
            })  
        }
        res.status(200).json({
            status:"success",
            message:"Seat is successfully unblocked by the admin"
        })
    }
    catch(err){
        res.status(400).json({
            status:"ailure",
            message:"Failed in blocking the seat",
            error:err
        })
    }
}

exports.delete_seats=(req,res,next)=>{
    
        book_seat.destroy({
            where: {
                seat_selection_date: req.body.date
            }
        })
        .then((val)=>{
            res.status(200).json({
                status:"success",
                message:`On ${req.body.date}, seats were removed.`,
                data:val
            })
        })
        .catch((err)=>{
            res.status(400).json({
                status:"failure",
                message:`Deletion of seats on ${req.body.date} is not successful`,
                err:err.message
            })
        })
    
    // book_seat.findAll({
    //     where:{
    //         seat_selection_date:req.body.date
    //     }
    // })
    // .then((val)=>{
    //     val.destroy();
    //     res.status(200).json({
    //         status:"success",
    //         message:`On ${req.body.date}, seats were removed.`
    //     })
    // })
    // .catch((err)=>{
    //     res.status(400).json({
    //         status:"failure",
    //         message:`Deletion of seats on ${req.body.date} is not successful`,
    //         err:err.message
    //     })
    // })
}
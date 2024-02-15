const {Sequelize} = require('sequelize')
const book_seat = require('../models/seat_booking')

exports.generate = (req,res,next)=>{
    
    try{
        var {from_date,to_date}=req.body;
        var k=new Date(from_date),j=new Date(to_date);
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
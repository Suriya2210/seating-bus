const {Sequelize} = require('sequelize')
const sequelize = require ('../utils/database')
const CancelBooking = sequelize.define('cancel_booking',{
    booking_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement: true,
    },
    seat_number:{
        type:Sequelize.STRING,
        allowNull:false
    },
    associate_id:{
        type:Sequelize.INTEGER,
    },
    booked_by:{
        type:Sequelize.STRING,
    },
    remarks:{
        type:Sequelize.STRING,
    },
    seat_cancelled_by:Sequelize.STRING,
    seat_cancellation_date:Sequelize.STRING,
    status:Sequelize.INTEGER,
    remarks:Sequelize.STRING,
    created_by:Sequelize.STRING,
    updated_by:Sequelize.STRING,
});
module.exports = CancelBooking;
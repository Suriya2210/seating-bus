const Sequelize = require('sequelize')
const sequelize = require ('../utils/database')
const BookSeat = sequelize.define('book_seat',{
    booking_id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    seat_number:{
        type:Sequelize.STRING,
        allowNull:false
    },
    seat_selection_date:Sequelize.DATEONLY,
    booked_for_id:{
        type:Sequelize.INTEGER,
        default:null
    },
    booked_for_name:{
        type:Sequelize.STRING,
        default:null
    },
    seat_booking_status:{
        type:Sequelize.INTEGER,
        default:1
    },
    seat_status:{
        type:Sequelize.INTEGER,
        default:1
    },
    seat_booked_by:{
        type:Sequelize.STRING,
        default:null
    },
    guest_email:{
        type:Sequelize.STRING,
        default:null
    },
    is_guest:{
        type:Sequelize.BOOLEAN,
        default:false
    },
    created_by:{
        type:Sequelize.STRING,
        default:null
    },
    updated_by:{
        type:Sequelize.STRING,
        default:null
    }

});
module.exports = BookSeat;
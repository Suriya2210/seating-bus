const ExcelJS = require('exceljs');
const seat_booking = require('../models/seat_booking')
const cancel_booking = require('../models/cancel_booking')
const user = require('../models/user')
const seats_info = require('../models/seats_info')

// Function to fetch data from the database
async function fetchDataFromDatabase_SeatBooking() {
  try {
    
    const datas=await seat_booking.findAll();
    return datas;

  } catch (error) {
    console.error('Error fetching data from the Table:', error);
    throw error;
  }
}

async function fetchDataFromDatabase_cancelBooking() {
  try {
    
    const datas=await cancel_booking.findAll();
    return datas;

  } catch (error) {
    console.error('Error fetching data from the Table:', error);
    throw error;
  }
}

async function fetchDataFromDatabase_user() {
  try {
    
    const datas=await user.findAll();
    return datas;

  } catch (error) {
    console.error('Error fetching data from the Table:', error);
    throw error;
  }
}

async function fetchDataFromDatabase_seats_info() {
  try {
    
    const datas=await seats_info.findAll();
    return datas;

  } catch (error) {
    console.error('Error fetching data from the Table:', error);
    throw error;
  }
}

// Function to export data to Excel
async function exportToExcel(seatbookingdata,seatcancellationdata,seatsinfodata,userdata) {
  try {
    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
    const booking_worksheet = workbook.addWorksheet('Seat_Booking');

    // Add headers to the worksheet
    const booking_headers = ['booking_id', 'seat_number', 'seat_selection_date','booked_for_id','booked_for_name','seat_booking_status','seat_status','seat_booked_by','guest_email','is_guest','created_by','updated_by','createdAt','updatedAt'];
    booking_worksheet.addRow(booking_headers);

    // Add rows to the worksheet with data from the database
    seatbookingdata.forEach(row => {
      const rowData = booking_headers.map(header => {
        if (header === 'createdAt' || header === 'updatedAt') {
          // Format createdAt and updatedAt if available
          return row[header] ? row[header].toISOString() : '';
        }
        else if(header==='seat_booking_status'){
          if(row[header]==1){
            return "Not Available"
          }
          else return "Available"
        }
        else if(header==='seat_status'){
          if(row[header]==0){
            return "Booked"
          }
          else if(row[header]==1){
            return "Not Booked"
          }
          else return "Blocked"
        }
        else {
          // Use default value from the row if available
          return row[header] !== undefined ? row[header] : '';
        }
      });
      booking_worksheet.addRow(rowData);
    });

    // Save the workbook to a file
    await workbook.xlsx.writeFile('Seating-BUS.xlsx');

    // ...........................................................................................................

    const cancel_worksheet = workbook.addWorksheet('Cancel_Booking');

    // Add headers to the worksheet
    const cancel_headers = ['booking_id', 'seat_number', 'associate_id','seat_cancelled_by','seat_cancellation_date','status','remarks','created_by','updated_by','createdAt','updatedAt'];
    cancel_worksheet.addRow(cancel_headers);

    // Add rows to the worksheet with data from the database
    seatcancellationdata.forEach(row => {
      const rowData = cancel_headers.map(header => {
        if (header === 'createdAt' || header === 'updatedAt') {
          // Format createdAt and updatedAt if available
          return row[header] ? row[header].toISOString() : '';
        }
        else if(header=='status') return "Cancelled";
         else {
          // Use default value from the row if available
          return row[header] !== undefined ? row[header] : '';
        }
      });
      cancel_worksheet.addRow(rowData);
    });

    // Save the workbook to a file
    await workbook.xlsx.writeFile('Seating-BUS.xlsx');

    //...........................................................................................................

    const seats_info_worksheet = workbook.addWorksheet('Seats_Info');

    // Add headers to the worksheet
    const seats_info_headers = ['id', 'seat_number', 'status','created_by','updated_by','createdAt','updatedAt'];
    seats_info_worksheet.addRow(seats_info_headers);

    // Add rows to the worksheet with data from the database
    seatsinfodata.forEach(row => {
      const rowData = seats_info_headers.map(header => {
        if (header === 'createdAt' || header === 'updatedAt') {
          // Format createdAt and updatedAt if available
          return row[header] ? row[header].toISOString() : '';
        } else {
          // Use default value from the row if available
          return row[header] !== undefined ? row[header] : '';
        }
      });
      seats_info_worksheet.addRow(rowData);
    });

    // Save the workbook to a file
    await workbook.xlsx.writeFile('Seating-BUS.xlsx');

    //...........................................................................................................
    console.log('Excel file created successfully.');
  } catch (error) {
    console.error('Error exporting data to Excel:', error);
    throw error;
  }
}

// Main function to fetch data from database and export to Excel
exports.main=async(req,res,next)=> {
  try {
    // Fetch data from the database
    const seatbookingdata = await fetchDataFromDatabase_SeatBooking();
    const seatcancellationdata= await fetchDataFromDatabase_cancelBooking();
    const seatsinfodata= await fetchDataFromDatabase_seats_info();
    const userdata=await fetchDataFromDatabase_user();

    // Export data to Excel
    await exportToExcel(seatbookingdata,seatcancellationdata,seatsinfodata,userdata);
    res.status(200).json({
      status:"success",
      message:"Excel file was successfully created"
    })
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(400).json({
      status:"Failure",
      message:"An error occured during excel creation",
      error:error.message,
    })
  }
}



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./UserBookHistory.css"; // Import CSS for styling

// const trim=(str)=>{
//   var string='';
//   for(let i=1;i<str.length-1;i++) string+=str[i];
//   return string;
// }
// var currentBookings=[],pastBookings=[];
// var account_holder_name=trim(localStorage.getItem('user'));

// const UserBookHistory = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading,setloading]=useState(true);
//   // const [currentBookings, setCurrentBookings] = useState([]);
//   // const [pastBookings, setPastBookings] = useState([]);

  
 
//   useEffect(() => {
//     const fetchBookings = () => {
//       // Fetch bookings data from the API for the associate with id 102
//       const json_body=localStorage.getItem('id');
//       axios.get(`http://localhost:3000/seat/get-booking/${json_body}`)
//         .then(response => {
//           // console.log(response);
//           if (response.data.status === "success") {
//             const allBookings = response.data.datas;
//             // Separate bookings into current and past based on date comparison
//             const currentDate = new Date();
//             currentBookings = allBookings.filter(booking => new Date(booking.seat_selection_date) >= currentDate);
//             pastBookings = allBookings.filter(booking => new Date(booking.seat_selection_date) < currentDate);
//             console.log(currentBookings);
//             console.log(pastBookings);
//             if(currentBookings.length>0 && pastBookings.length>0){
//               console.log("loading is set as false")
//               setloading(false);
//             }
//             // setCurrentBookings(currentBookings);
//             // setPastBookings(pastBookings);
//             // setBookings(allBookings);
//           } else {
//             console.error("Invalid data format:", response.data);
//           }
//         })
//         .catch(error => {
//           console.error("Error fetching bookings:", error);
//         });
//     };
//     fetchBookings(); // Fetch bookings data on initial render
//     // window.location.reload();
//   }, []);
 
  

//   const CancelBooking=(props)=>{
//     console.log(props);
    
//   }

 

// return (
//   <>
//   {loading?<h1>Loading!!!</h1>:(
//     <div className="user-book-history">
//     <h1 className="ubh-h">User Book History</h1>
//     <div className="bookings-container">
//       <div className="lf-section">
//         <h2 className="lf-h">Current and Future Bookings</h2>
//         <table className="lf-table">
//           <thead>
//             <tr>
//               <th>Booking ID</th>
//               <th>Seat Number</th>
//               <th>Selection Date</th>
//               <th>Booked For ID</th>
//               <th>Booked For Name</th>
//               <th>Booked By</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentBookings.length>0? currentBookings.map((booking, index) => (
//               <tr key={index}>
//                 <td>{booking.booking_id}</td>
//                 <td>{booking.seat_number}</td>
//                 <td>{booking.seat_selection_date}</td>
//                 <td>{booking.booked_for_id}</td>
//                 <td>{booking.booked_for_name}</td>
//                 <td>{booking.seat_booked_by}</td>
//                 <td><button onClick={()=>{
//                   const json_body=
//                   {
//                       "date":booking.seat_selection_date,
//                       "seat_number":booking.seat_number,
//                       "associate_id":booking.booked_for_id,
//                       "cancelled_by":trim(localStorage.getItem('user'))
//                   }
//                   console.log(json_body);
//                   axios.post(`http://localhost:3000/api/auth/cancelseat`,json_body)
//                   .then((data)=>{
//                     console.log(data);
//                     alert("Seat cancelled successfully!!!")
//                     window.location.reload();
//                   })
//                   .catch((err)=>{
//                     console.log(err);
//                   })
//                 }}>Cancel Seat</button></td>
//               </tr>
//             )):<></>}
//           </tbody>
//         </table>
//       </div>
//       <div className="separator-line"></div>
//       <div className="pb-section">
//         <h2 className="pb-h">Past Bookings</h2>
//         <table className="pb-table">
//           <thead>
//             <tr>
//               <th>Booking ID</th>
//               <th>Seat Number</th>
//               <th>Selection Date</th>
//               <th>Booked For ID</th>
//               <th>Booked For Name</th>
//               <th>Booked By</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pastBookings.map((booking, index) => (
//               <tr key={index}>
//                 <td>{booking.booking_id}</td>
//                 <td>{booking.seat_number}</td>
//                 <td>{booking.seat_selection_date}</td>
//                 <td>{booking.booked_for_id}</td>
//                 <td>{booking.booked_for_name}</td>
//                 <td>{booking.seat_booked_by}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
//   )}
    
//     </>
//   );
// };
 
// export default UserBookHistory;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserBookHistory.css"; // Import CSS for styling

const trim = (str) => {
  var string = "";
  for (let i = 1; i < str.length - 1; i++) string += str[i];
  return string;
};

const UserBookHistory = () => {
  const [currentBookings, setCurrentBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const json_body = localStorage.getItem("id");
        const responseCurrent = await axios.get(
          `http://localhost:3000/seat/get-booking/${json_body}`
        );
        const responseCancelled = await axios.get(
          `http://localhost:3000/seat/get-cancel-booking/${json_body}`
        );

        if (
          responseCurrent.data.status === "success" &&
          responseCancelled.data.status === "success"
        ) {
          const allBookings = responseCurrent.data.datas;
          const currentDate = new Date();
          const current = allBookings.filter(
            (booking) => new Date(booking.seat_selection_date) >= currentDate
          );
          const past = allBookings.filter(
            (booking) => new Date(booking.seat_selection_date) < currentDate
          );

          setCurrentBookings(current);
          setPastBookings(past);
          setCancelledBookings(responseCancelled.data.datas);
          setLoading(false);
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading!!!</h1>
      ) : (
        <div className="user-book-history">
          <h1 className="ubh-h">User Book History</h1>
          <div className="bookings-container">
            <div className="lf-section">
              <h2 className="lf-h">Current and Future Bookings</h2>
              <table className="lf-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Seat Number</th>
                    <th>Selection Date</th>
                    <th>Booked For ID</th>
                    <th>Booked For Name</th>
                    <th>Booked By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.booking_id}</td>
                      <td>{booking.seat_number}</td>
                      <td>{booking.seat_selection_date}</td>
                      <td>{booking.booked_for_id}</td>
                      <td>{booking.booked_for_name}</td>
                      <td>{booking.seat_booked_by}</td>
                      <td>
                        <button
                          onClick={() => {
                            const json_body = {
                              date: booking.seat_selection_date,
                              seat_number: booking.seat_number,
                              associate_id: booking.booked_for_id,
                              cancelled_by: trim(
                                localStorage.getItem("user")
                              ),
                            };
                            axios
                              .post(
                                `http://localhost:3000/api/auth/cancelseat`,
                                json_body
                              )
                              .then((data) => {
                                console.log(data);
                                alert("Seat cancelled successfully!!!");
                                window.location.reload();
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                        >
                          Cancel Seat
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="separator-line"></div>
            <div className="pb-section">
              <h2 className="pb-h">Past Bookings</h2>
              <table className="pb-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Seat Number</th>
                    <th>Selection Date</th>
                    <th>Booked For ID</th>
                    <th>Booked For Name</th>
                    <th>Booked By</th>
                  </tr>
                </thead>
                <tbody>
                  {pastBookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.booking_id}</td>
                      <td>{booking.seat_number}</td>
                      <td>{booking.seat_selection_date}</td>
                      <td>{booking.booked_for_id}</td>
                      <td>{booking.booked_for_name}</td>
                      <td>{booking.seat_booked_by}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="separator-line"></div>
            <div className="cb-section">
              <h2 className="cb-h">Cancelled Bookings</h2>
              <table className="cb-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Seat Number</th>
                    <th>Cancelled Date</th>
                    <th>Booked For ID</th>
                    {/* <th>Booked For Name</th> */}
                    <th>Cancelled By</th>
                  </tr>
                </thead>
                <tbody>
                  {cancelledBookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.booking_id}</td>
                      <td>{booking.seat_number}</td>
                      <td>{booking.seat_cancellation_date}</td>
                      <td>{booking.associate_id}</td>
                      {/* <td>{booking.booked_for_name}</td> */}
                      <td>{booking.seat_cancelled_by}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserBookHistory;

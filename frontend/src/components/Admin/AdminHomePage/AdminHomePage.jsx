// import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./AdminHomePage.css";

// const scrollToSection = (id) => {
//     const section = document.getElementById(id);
//     section.scrollIntoView({ behavior: "smooth" });
// };

// const generate_FOW_table=async()=>{
//     try{
//         var json_body={
//         "from_date":document.getElementById('date-checkin').value,
//         "to_date":document.getElementById('date-checkout').value,
//         }
//         const response=await axios.post('http://localhost:3000/generate_seat',json_body);
//         console.log(response.data);
//         alert("Seat generation is success!!!");
//         window.location.reload();
//     }
//     catch(err){
//         console.log("Error in generate FOW table")
//         console.log(err);
//     }
// }



// const HeroSection = () => {
//     return (
//         <header className="adminhome-hero">
//             <div className="adminhome-hero-content">
//                 <h1 className="adminhome-hero-title">Your Comfort Awaits, Reserve Now</h1>
//                 <p className="adminhome-hero-subtitle">
//                     Make seat reservations simple and straightforward.
//                 </p>
                
//                 <div className="adminhome-hero-buttons">
//                     <button
//                         onClick={() => scrollToSection("manage-booking")}
//                         className="AdminHomePage-btn-1"
//                     >
//                         Manage Booking
//                     </button>
//                     <button
//                         onClick={() => scrollToSection("manage-seat")}
//                         className="AdminHomePage-btn-2"
//                     >
//                         Manage Seat
//                     </button>
//                 </div>
//                 <div id="wrapper">
//                     <div id="wrapper-inner">
//                         <div id="scroll-down">
//                             <span class="arrow-down"></span>
//                             <span id="scroll-title">Scroll down</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// };

// const AdminHomePage = () => {
//     return (
//         <div className="content whole-body-AdminHomePage">
//             <HeroSection />
//             <div id="manage-booking" className="section-managebooking">
//                 <h2 className="section-title">Manage Booking</h2>
//                 <div class="manage-seat-datebody">
//                     <div class="reservation-box">
//                         <div class="top">
//                             <div class="static">
//                                 <div class="input-container" id="date-picker-container">
//                                     <label for="date-from">check-in</label>
//                                     <input type="date" id="date-checkin" class="date-field" name="date-from" />
//                                 </div>
//                             </div>
//                             <div class="flex">
//                                 <div class="input-container" id="date-picker-container">
//                                     <label for="date-from">check-out</label>
//                                     <input type="date" id="date-checkout" class="date-field" name="" />
//                                 </div>
//                                 <div class="button-container">
//                                     <span class="button ok" onClick={generate_FOW_table}>Open Booking</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div id="manage-seat" className="section-manageseat">
//                 <h2 className="section-title">Manage Seat</h2>
//                 {/* Your content for Manage Seat section */}
//             </div>
//         </div>
//     );
// };

// export default AdminHomePage;



import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./AdminHomePage.css";

const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
};

const generate_FOW_table = async () => {
    try {
        var json_body = {
            "from_date": document.getElementById('date-checkin').value,
            "to_date": document.getElementById('date-checkout').value,
        }
        const response = await axios.post('http://localhost:3000/generate_seat', json_body);
        console.log(response.data);
        alert("Seat generation is success!!!");
        window.location.reload();
    }
    catch (err) {
        console.log("Error in generate FOW table")
        console.log(err);
    }
}

const HeroSection = ({ handleDateChange, pickedDate }) => {
    const [date, setdate] = useState('');
    const [today, setToday] = useState('');

    useEffect(() => {
        const todayDate = new Date().toISOString().split('T')[0];
        setdate(todayDate);
        setToday(todayDate);
    }, []);

    const handlechange = (event) => {
        setdate(event.target.value);
    }

    return (
        <header className="adminhome-hero">
            <div className="adminhome-hero-content">
                <h1 className="adminhome-hero-title">Your Comfort Awaits, Reserve Now</h1>
                <p className="adminhome-hero-subtitle">
                    Make seat reservations simple and straightforward.
                </p>

                <div className="adminhome-hero-buttons">
                    {/* <div>

                        <button
                            onClick={() => scrollToSection("manage-booking")}
                            className="AdminHomePage-btn-1"
                        >
                            Manage Booking
                        </button>
                    </div> */}
                    <div>
                        <input type="date" id="date_picker" className="date-picker" value={date} selected={pickedDate} min={today} onChange={handlechange} />
                    </div>
                    <div>
                        <Link to={{ pathname: "/seatlayout", state: { selecteddate: date } }
                        } className="AdminHomePage-btn-2">Block Seat</Link>
                    </div>

                </div>
                {/* <div id="wrapper">
                    <div id="wrapper-inner">
                        <div id="scroll-down">
                            <span className="arrow-down"></span>
                            <span id="scroll-title">Scroll down</span>
                        </div>
                    </div>
                </div> */}
            </div>
        </header>
    );
};

const AdminHomePage = () => {
    const [pickedDate, setPickedDate] = useState(null);
    const [today, setToday] = useState('');
    const history = useHistory();

    useEffect(() => {
        const todayDate = new Date().toISOString().split('T')[0];
        setToday(todayDate);
    }, []);

    const handleDateChange = (date) => {
        setPickedDate(date);
    };

    return (
        <div className="content whole-body-AdminHomePage">
            <HeroSection handleDateChange={handleDateChange} pickedDate={pickedDate} />
            {/* <div id="manage-booking" className="section-managebooking">
                <h2 className="section-title">Manage Booking</h2>
                <div className="manage-seat-datebody">
                    <div className="reservation-box">
                        <div className="top">
                            <div className="static">
                                <div className="input-container" id="date-picker-container">
                                    <label htmlFor="date-from">check-in</label>
                                    <input
                                        type="date"
                                        id="date-checkin"
                                        className="date-field"
                                        name="date-from"
                                        min={today} // Set min attribute to disable past dates
                                    />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="input-container" id="date-picker-container">
                                    <label htmlFor="date-from">check-out</label>
                                    <input
                                        type="date"
                                        id="date-checkout"
                                        className="date-field"
                                        name="date-to"
                                        min={today} // Set min attribute to disable past dates
                                    />
                                </div>
                                <div className="button-container">
                                    <span className="button ok" onClick={generate_FOW_table}>Open Booking</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default AdminHomePage;

import React from 'react'
import { useState, useEffect } from 'react'
import Admin_seatlayout from "./AdminLayout/Admin_seatlayout"
import Employee_seatlayout from "./EmployeeLayout/Employee_seatlayout"
import Manager_seatlayout from "./ManagerLayout/Manager_seatlayout"
import axios from 'axios'





const ConditionalRendering = () => {
    const [role, setrole] = useState(null)

    useEffect(() => {
        axios.post("http://localhost:3000/decodejwt", {
            "jwttoken": localStorage.getItem('jwt_token'),
        })
            .then((data) => {

                if (data.data.data.isadmin) {
                    setrole("admin")
                }
                else if (data.data.data.ismanager) {
                    setrole("manager")
                }
                else {
                    setrole("employee")
                }
            })
            .catch((err) => {
                console.log("Error in DecodeJWTToken");
                console.log(err);
            })

    }, [])
    return (
        <div>
            {
                role === "admin" ? <Admin_seatlayout /> :
                    role === "manager" ? <Manager_seatlayout /> :
                        role === "employee" ? <Employee_seatlayout /> :
                            <h1>None</h1>
            }
        </div>
    )
}

export default ConditionalRendering

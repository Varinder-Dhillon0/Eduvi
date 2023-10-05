import React, { useEffect, useState } from "react"
import AdminNav from "./components/adminNav"
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard({ children }) {

    const cookies = new Cookies();
    const [email , setemail] = useState("");
    const [name, setname] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.get("token")) {
            const { token } = cookies.get("token");
            axios.post("https://eduvi.up.railway.app/checkAdmin", {
                token: token
            }).then((res) => {
                if (res.data === false) {
                    navigate("/")
                } else {
                    setemail(res.data.email);
                    setname(res.data.name);
                }
            })
        } else {
            navigate("/")
        }
    }, [])

    return (
        <div style={{display: "flex", width: "100%"}}>
            {(email && name) && <AdminNav></AdminNav>}
            {(email && name) && React.cloneElement(children , {name , email})}
        </div>
    )
}
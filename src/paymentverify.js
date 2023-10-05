import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function PaymentVerify() {

    const params = useParams();
    const [title,settitle] = useState("");
    const [subtitle,setsubtitle] = useState("");
    const [id,setid] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(params.status === "success"){
            settitle("Payment Done")
            setsubtitle("Payment has been verified . You can now leave this page. Kindly note down payment id.")
            setid(params.id);
            return;
        }

        if(params.status === "error"){
            settitle("Payment Failed")
            setsubtitle("Kindly contact owner if you think this is a mistake.")
            return;
        }
    },[params])

    return (
        <>
            <div className="container">
                <div className="card">
                    <h1 className="title">{title}</h1>
                    <p className="subtitle">{subtitle}
                    {id? ` payment id : ${id} `: ""}
                    </p>
                    <a href="/courses">
                        <button className="btn" onClick={() => {navigate("/courses/all")}}>Courses</button>
                    </a>
                </div>
            </div>
        </>
    )
}
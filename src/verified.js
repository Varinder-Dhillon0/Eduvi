import { useEffect , useState} from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Verified() {
    const params = useParams();

    const [title, settitle] = useState("");
    const [subtitle, setsubtitle] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        if(params.status === "success"){
            settitle("Verified");
            setsubtitle("Email verified you may now leave this page");
        }

        if(params.status === "error"){
            settitle("Error");
            setsubtitle("An Error Occured while verifying user.");
            return;
        }

        if(params.status === "verify"){
            settitle("Verify your email");
            setsubtitle("Check your email inbox and verify your email to proceed. You may leave this page now.");
            return;
        }

        if(params.status === "expired"){
            settitle("Link Expired");
            setsubtitle("The Link has expired kindly register again to verify.");
            return;
        }
    });

    return (
        <>
            <div className="container">
                <div className="card">
                    <h1 className="title">{title}</h1>
                    <p className="subtitle">{subtitle}</p>
                    <a href="/">
                    <button className="btn" onClick={() =>{navigate("/")}}>Home</button>
                    </a>
                </div>
            </div>
        </>
    )
}
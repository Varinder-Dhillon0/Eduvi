import { ReactComponent as Logo } from "../assets/logo.svg"
import { ReactComponent as LoginIcon } from "../assets/login.svg"
import styles from "../components/Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./login";
import Cookies from "universal-cookie";
import axios from "axios";

export default function Navbar({name,setname,setemail}) {

    const navigate = useNavigate();
    const [login, setlogin] = useState(false);
    const cookies = new Cookies();

    const [loggedin , setloggedin] = useState(false);
    

    const changelogin = () => {
        const body = document.querySelector("body");
        setlogin(!login);
        if (login) {
            body.style.overflowY = "scroll";
        } else {
            body.style.overflowY = "hidden"
        }
    }

    useEffect(() => {
        if (cookies.get("token")) {
            const { token } = cookies.get("token");
            axios.post("http://localhost:5000/verifyToken", {
                token: token
            }).then((res) => {
                if (res.data === false) {
                    cookies.remove("token");
                } else {
                    setloggedin(true);
                    setname(res.data.name);
                    setemail(res.data.email);
                }
            })
        }
    }, [cookies, navigate])

    return (
        <div className={styles.navbarWrapper}>
            <div className={styles.navbar}>
                <div onClick={() => navigate("/")} className={styles.logo}>
                    <Logo></Logo>
                    <p>Eduvi</p>
                </div>
                <div className={styles.menu}>
                    <button onClick={() => navigate("/courses")}>Courses</button>
                    <button onClick={() => navigate("/mentors")}>Mentors</button>
                    <button onClick={() => navigate("/dashboard")}>Dashboard</button>
                </div>
                <div className={styles.account}>
                    {loggedin ? <> <p style={{textAlign : "center", marginTop : "auto", marginBottom : "auto"}}>Hi , {name.slice(0,8)}</p></>  :  <button onClick={changelogin}><LoginIcon></LoginIcon> Login</button>}
                </div>
                {login ? (
                    <Login Loginstate={changelogin} setLoginstate={setlogin}/>
                ) :
                    ""}
            </div>
        </div>
    )
}
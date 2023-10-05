import { ReactComponent as Illu } from "../assets/signin.svg"
import { useState } from "react"
import { ReactComponent as Cross } from "../assets/cross.svg";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function Login({Loginstate,setLoginstate}) {

    const [signup, setsignup] = useState(true);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const cookies = new Cookies();

    const navigate = useNavigate();

    const changeState = () => {
        setsignup(!signup);
    }

    const validateSignup = () => {

        if (!name.trim() || !email.trim() || !password ) {
          toast.error("Please fill in all the fields");
          console.log("noe vali")
          return false;
        }
    
        const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.trim());
    
        if (isEmail === false) {
          toast.error("Please enter a valid email address");
          return false;
        } else if (name.trim().length > 30) {
          toast.error("Please enter a shorter name");
          return false;
        } else if (password.length < 6) {
          toast.error("Please enter a longer password");
          return false;
        }    
    
        return true;
      }
    
      const handleSignup = async () => {
    
        setDisabled(true);
    
        if(validateSignup() === false){
          setDisabled(false);
          return;
        }
    
        const sendUser = axios.post("http://localhost:5000/SignUp", {
    
          name: name,
          email: email,
          password: password
    
        }).then((res) => {
          if(res.data === true){
            navigate("/verified/verify");
          }else{
            throw new Error(res.data);
          }
        })
    
        toast.promise(
          sendUser,
          {
            loading: 'Saving...',
            success: "User Added",
            error: (err) => err.message,
          }
        );
        setLoginstate(false);
        setDisabled(false);
      }

    const validateLogin = () => {

      if (!email.trim() || !password) {
        toast.error("Enter the data");
        return false;
      }
  
      const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.trim());
  
      if (isEmail === false) {
        toast.error("Invalid Email");
        return false;
      }
      return true;
    }
    
  function handleLogin(){

    setDisabled(true);

    if(validateLogin() === false){
      setDisabled(false)
      return;
    }

    const login = axios.post("http://localhost:5000/signin", {
      email : email,
      password : password
    }).then((res) =>{
      if(res.data.token){
        cookies.set("token" , res.data , {path : "/"}); 
        document.location.reload();
      }
      else{
        throw new Error(res.data);
      }
    })

    toast.promise(login , {
        loading: 'Signing in...',
        success: "Signed in",
        error : (err) => err.message,
    })

    setDisabled(false);
  };

    return (
        <div className="login-wrap">
            <Cross onClick={() => Loginstate()}/>
            <div className="login">
                
                <div className="login-desc">
                    <h1>Welcome to Eduvi online learning platform</h1>
                    <Illu />
                </div>
                <svg width="1" height="523" viewBox="0 0 1 641" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="1" height="641" fill="url(#paint0_linear_28_3799)" />
                    <defs>
                        <linearGradient id="paint0_linear_28_3799" x1="0.5" y1="0" x2="0.5" y2="641" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#0A033C" stopOpacity="0" />
                            <stop offset="0.515625" stopColor="#0A033C" />
                            <stop offset="1" stopColor="#0A033C" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="login-form">
                    {signup === true ? (
                        <>
                            <h2>Full Name</h2>
                            <div className="input">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.7824 8.53272C11.5177 7.95421 12.0544 7.16091 12.3178 6.26317C12.5812 5.36544 12.5583 4.40791 12.2522 3.52382C11.9461 2.63972 11.3721 1.87301 10.6099 1.33036C9.84779 0.787705 8.93546 0.496094 7.99988 0.496094C7.06429 0.496094 6.15196 0.787705 5.38982 1.33036C4.62768 1.87301 4.05363 2.63972 3.74753 3.52382C3.44144 4.40791 3.41851 5.36544 3.68195 6.26317C3.94538 7.16091 4.48208 7.95421 5.21738 8.53272C3.95743 9.0375 2.85809 9.87473 2.03654 10.9552C1.215 12.0356 0.702048 13.3187 0.552375 14.6677C0.541541 14.7662 0.550213 14.8659 0.577895 14.961C0.605576 15.0561 0.651726 15.1449 0.713709 15.2222C0.83889 15.3783 1.02096 15.4783 1.21988 15.5002C1.41879 15.5221 1.61825 15.4641 1.77437 15.3389C1.93049 15.2137 2.0305 15.0316 2.05238 14.8327C2.21706 13.3666 2.91614 12.0126 4.01604 11.0293C5.11594 10.046 6.53955 9.50249 8.01488 9.50249C9.4902 9.50249 10.9138 10.046 12.0137 11.0293C13.1136 12.0126 13.8127 13.3666 13.9774 14.8327C13.9978 15.017 14.0857 15.1872 14.2242 15.3105C14.3627 15.4337 14.542 15.5013 14.7274 15.5002H14.8099C15.0065 15.4776 15.1862 15.3782 15.3098 15.2237C15.4334 15.0691 15.491 14.872 15.4699 14.6752C15.3195 13.3224 14.8038 12.036 13.978 10.9539C13.1522 9.87178 12.0476 9.03483 10.7824 8.53272ZM7.99988 8.00022C7.40653 8.00022 6.82651 7.82427 6.33317 7.49462C5.83982 7.16498 5.4553 6.69644 5.22824 6.14827C5.00117 5.60009 4.94176 4.99689 5.05752 4.41494C5.17327 3.833 5.459 3.29845 5.87855 2.8789C6.29811 2.45934 6.83266 2.17362 7.41461 2.05786C7.99655 1.9421 8.59975 2.00151 9.14793 2.22858C9.69611 2.45564 10.1646 2.84016 10.4943 3.3335C10.8239 3.82685 10.9999 4.40687 10.9999 5.00022C10.9999 5.79587 10.6838 6.55893 10.1212 7.12154C9.55859 7.68415 8.79553 8.00022 7.99988 8.00022Z" fill="#5D5A6F" />
                                </svg>
                                <input type="text" placeholder="Esther Howard" onChange={(e) => { setname(e.target.value) }}/>
                            </div>
                        </>
                    ) : ""}

                    <h2>Email</h2>
                    <div className="input">
                        <svg width="15" height="20" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.25 0H2.75C2.15326 0 1.58097 0.237053 1.15901 0.65901C0.737053 1.08097 0.5 1.65326 0.5 2.25V9.75C0.5 10.3467 0.737053 10.919 1.15901 11.341C1.58097 11.7629 2.15326 12 2.75 12H13.25C13.8467 12 14.419 11.7629 14.841 11.341C15.2629 10.919 15.5 10.3467 15.5 9.75V2.25C15.5 1.65326 15.2629 1.08097 14.841 0.65901C14.419 0.237053 13.8467 0 13.25 0ZM12.9425 1.5L8.5325 5.91C8.46278 5.9803 8.37983 6.03609 8.28843 6.07417C8.19704 6.11225 8.09901 6.13185 8 6.13185C7.90099 6.13185 7.80296 6.11225 7.71157 6.07417C7.62017 6.03609 7.53722 5.9803 7.4675 5.91L3.0575 1.5H12.9425ZM14 9.75C14 9.94891 13.921 10.1397 13.7803 10.2803C13.6397 10.421 13.4489 10.5 13.25 10.5H2.75C2.55109 10.5 2.36032 10.421 2.21967 10.2803C2.07902 10.1397 2 9.94891 2 9.75V2.5575L6.41 6.9675C6.83188 7.38885 7.40375 7.62552 8 7.62552C8.59625 7.62552 9.16812 7.38885 9.59 6.9675L14 2.5575V9.75Z" fill="#5D5A6F" />
                        </svg>
                        <input type="text" placeholder="bill.sanders@example.com" onChange={(e) => { setemail(e.target.value) }}/>
                    </div>
                    <h2>Password</h2>
                    <div className="input">
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 8.75C5.80109 8.75 5.61032 8.82902 5.46967 8.96967C5.32902 9.11032 5.25 9.30109 5.25 9.5V11.75C5.25 11.9489 5.32902 12.1397 5.46967 12.2803C5.61032 12.421 5.80109 12.5 6 12.5C6.19891 12.5 6.38968 12.421 6.53033 12.2803C6.67098 12.1397 6.75 11.9489 6.75 11.75V9.5C6.75 9.30109 6.67098 9.11032 6.53033 8.96967C6.38968 8.82902 6.19891 8.75 6 8.75ZM9.75 5.75V4.25C9.75 3.25544 9.35491 2.30161 8.65165 1.59835C7.94839 0.895088 6.99456 0.5 6 0.5C5.00544 0.5 4.05161 0.895088 3.34835 1.59835C2.64509 2.30161 2.25 3.25544 2.25 4.25V5.75C1.65326 5.75 1.08097 5.98705 0.65901 6.40901C0.237053 6.83097 0 7.40326 0 8V13.25C0 13.8467 0.237053 14.419 0.65901 14.841C1.08097 15.2629 1.65326 15.5 2.25 15.5H9.75C10.3467 15.5 10.919 15.2629 11.341 14.841C11.7629 14.419 12 13.8467 12 13.25V8C12 7.40326 11.7629 6.83097 11.341 6.40901C10.919 5.98705 10.3467 5.75 9.75 5.75ZM3.75 4.25C3.75 3.65326 3.98705 3.08097 4.40901 2.65901C4.83097 2.23705 5.40326 2 6 2C6.59674 2 7.16903 2.23705 7.59099 2.65901C8.01295 3.08097 8.25 3.65326 8.25 4.25V5.75H3.75V4.25ZM10.5 13.25C10.5 13.4489 10.421 13.6397 10.2803 13.7803C10.1397 13.921 9.94891 14 9.75 14H2.25C2.05109 14 1.86032 13.921 1.71967 13.7803C1.57902 13.6397 1.5 13.4489 1.5 13.25V8C1.5 7.80109 1.57902 7.61032 1.71967 7.46967C1.86032 7.32902 2.05109 7.25 2.25 7.25H9.75C9.94891 7.25 10.1397 7.32902 10.2803 7.46967C10.421 7.61032 10.5 7.80109 10.5 8V13.25Z" fill="#5D5A6F" />
                        </svg>
                        <input type="password" placeholder="jelly22fi$h" onChange={(e) => { setpassword(e.target.value) }}/>
                    </div>
                    {/* {signup && <p><input type="checkbox" /> I agree to <span>Terms and Conditions</span></p>} */}
                    {signup ? <><button onClick={handleSignup}>Sign Up</button> <h3>Already have an account? <label onClick={changeState}>Login</label> </h3></> : <><button onClick={handleLogin}>Sign In</button> <h3>Don't have an account? <label onClick={changeState}>Sign Up</label> </h3></>}

                </div>
            </div>
        </div>
    )
}
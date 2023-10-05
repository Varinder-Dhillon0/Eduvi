import { useContext, useState } from "react"
import { MyContext } from "./context"
import { useQuery } from "react-query";
import axios from "axios";
import CircleLoader from "./components/circleLoader";
import Course from "./components/Course";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {

    const cookie = new Cookies();
    const { email } = useContext(MyContext);
    const navigate = useNavigate();
    const [nocourse, setnocourse] = useState(false);

    const { data: Courses, isLoading } = useQuery([email], async () => {
    try {
        if(email !== ""){
            const result = await axios.post("https://eduvi.up.railway.app/userCourses", { email: email });
            setnocourse(false);
            return result.data.courses;
        }else{
            setnocourse(true);
            return;
        }
    } catch (err) {
        console.log(err);
    }
    });

    console.log(Courses)

    return (
        <div className="user-dashboard">
            <div className="user-details">
                <h1>My Learning</h1><br/>
            </div>
            <div className="user-courses">
            <h5>Your Courses</h5>
            {email && <button style={{padding : "10px" , background : "#9C4DF4", color : "white", marginTop : "30px" , border : "0" , borderRadius : "5px"}} onClick={() => {cookie.remove("token"); window.location.reload();}}>Logout</button>}
            {isLoading ? <CircleLoader /> :
                <div className="courses-layout">
                    {Courses?.length == 0 ? <div style={{marginBottom : "170px"}}>No courses added.</div> : Courses?.map(course => {
                        return <>{<Course key={course._id} id={course._id} title={course.title} desc={course.desc} background={course.background} price={course.amount / 100} instructor={course.creator} time={course.time} bought={true} />} </>
                    })}
                </div>}
            </div>
            {nocourse && <div style={{marginBottom : "170px", marginLeft : "200px"}}>You need to register first.</div>}
            
        </div>
    )
}


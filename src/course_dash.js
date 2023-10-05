import styles from "../src/courseDash.module.css"

import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { MyContext } from "./context"
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CircleLoader from "./components/circleLoader";
import { BsFillCameraVideoFill } from "react-icons/bs";

export default function CourseDash(){

    const {email} = useContext(MyContext);
    const params = useParams();

    const {data : course, isLoading} = useQuery([email], async() =>{
        try{
            const result = await axios.post("http://eduvi.up.railway.app/getUserCourse",{
                email : email,
                courseId : params.id 
            });
            if(result?.data){
                console.log(result?.data.Courses[0])
                return result?.data.Courses[0]
            }
        }catch(err){
            console.log(err);
            throw err;
        }
    })

    const [vid , setvid] = useState();

    return(
        <div className={styles.courseDashwrap}>
            {isLoading ? <CircleLoader/> : 
            <>
                <div className={styles.courseOverview}>
                   {course?.content.flatMap(con => {
                    return [
                        <h1>{con.title}</h1>,
                        ...con.video.map(c => {
                        return <div onClick={() => setvid("tO01J-M3g0U")} className={styles.videowrap}><BsFillCameraVideoFill size={16} style={{display : "flex"}}/> <p>{c.videotitle}</p></div>;
                        })
                    ];
                    })}
                </div>      
                <div className={styles.coursevideo}>
                    <iframe style={{width : "100%"}} src="https://www.youtube.com/embed/tO01J-M3g0U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen">
                    </iframe>
                </div>    
            </>}
        </div>
    )
}
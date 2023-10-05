import Course from "./components/Course";
import { ReactComponent as SearchIcon } from "./assets/search.svg";
import Subscribe from "./components/Subscribe";
import { useState, useContext, } from "react";
import axios, { toFormData } from "axios";
import { MyContext } from "./context";
import { useQuery } from "react-query";
import CircleLoader from "./components/circleLoader";

export default function Courses() {
    const { name, email } = useContext(MyContext);
    const [page, setpage] = useState(1);
    const [totaldocs, settotaldocs] = useState(0);
    const [search, setsearch] = useState("");

    const [searchres, setsearchres] = useState();

    const { data: courses, isLoading } = useQuery([page, email], () =>
        axios.post("http://localhost:5000/getCourses", { email: email, skip: (page - 1) * 9 })
            .then(result => {
                // return the courses and the total number 
                settotaldocs(result.data.total);
                return result.data.courses;
            }));

    const searchParam = (key) =>{
        search &&
        axios.get(`http://localhost:5000/search/${key}`)
            .then(result =>{
                setsearchres(result.data);
            })
    }

    return (
        <>
            <div className="courses">
                <h2>Explore Our Courses</h2>
                <div className="search-sort">
                    <div className="search">
                        <input type="text" placeholder="search course/category/mentors" onChange={(e) => setsearch(e.target.value)} />
                        <button onClick={() => searchParam(search)}><SearchIcon /> Search</button>
                    </div>
                </div>
                {searchres &&<> 
                <h2 style={{marginTop : "30px"}}>Search result</h2>
                {searchres.length === 0 ? <p style={{marginTop : "20px",marginBottom : "60px"}}>Nothing appeared for "{search}"</p> : <div className="courses-layout">
                    {searchres.map(course => {
                        return <Course key={course._id} id={course._id} title={course.title} background={course.background} desc={course.desc} price={course.price} instructor={course.creator} bought={false} />
                    })}
                </div>} <hr style={{marginTop : "30px" , border : "1.1px solid #00000033"}}/> </> }
                
                {/* <CircleLoader/> */}
                {isLoading ? <CircleLoader /> : <div className="courses-layout">
                    {courses.map(course => {
                        return <Course key={course._id} id={course._id} title={course.title} background={course.background} desc={course.desc} price={course.price} instructor={course.creator} bought={false} />
                    })}
                </div>}

                <div className="page-number">
                    <button onClick={() => { page > 1 ? setpage(page - 1) : setpage(page) }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.46002 11.2895L14.12 5.63955C14.213 5.54582 14.3236 5.47143 14.4454 5.42066C14.5673 5.36989 14.698 5.34375 14.83 5.34375C14.962 5.34375 15.0927 5.36989 15.2146 5.42066C15.3365 5.47143 15.4471 5.54582 15.54 5.63955C15.7263 5.82691 15.8308 6.08036 15.8308 6.34455C15.8308 6.60873 15.7263 6.86219 15.54 7.04955L10.59 12.0495L15.54 16.9995C15.7263 17.1869 15.8308 17.4404 15.8308 17.7045C15.8308 17.9687 15.7263 18.2222 15.54 18.4095C15.4474 18.504 15.337 18.5792 15.2151 18.6307C15.0932 18.6822 14.9623 18.709 14.83 18.7095C14.6977 18.709 14.5668 18.6822 14.445 18.6307C14.3231 18.5792 14.2126 18.504 14.12 18.4095L8.46002 12.7595C8.35851 12.6659 8.2775 12.5523 8.2221 12.4258C8.16669 12.2993 8.13809 12.1627 8.13809 12.0245C8.13809 11.8864 8.16669 11.7498 8.2221 11.6233C8.2775 11.4968 8.35851 11.3832 8.46002 11.2895Z" fill="white" />
                        </svg>
                    </button>
                    <label>{page} of {Math.ceil(totaldocs / 9)}</label>
                    <button onClick={() => { Math.ceil(totaldocs / 9) > page ? setpage(page + 1) : setpage(page) }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.54 11.2895L9.87998 5.63955C9.78702 5.54582 9.67642 5.47143 9.55456 5.42066C9.4327 5.36989 9.30199 5.34375 9.16998 5.34375C9.03797 5.34375 8.90726 5.36989 8.78541 5.42066C8.66355 5.47143 8.55294 5.54582 8.45998 5.63955C8.27373 5.82691 8.16919 6.08036 8.16919 6.34455C8.16919 6.60873 8.27373 6.86219 8.45998 7.04955L13.41 12.0495L8.45998 16.9995C8.27373 17.1869 8.16919 17.4404 8.16919 17.7045C8.16919 17.9687 8.27373 18.2222 8.45998 18.4095C8.5526 18.504 8.66304 18.5792 8.78492 18.6307C8.90679 18.6822 9.03767 18.709 9.16998 18.7095C9.30229 18.709 9.43317 18.6822 9.55505 18.6307C9.67692 18.5792 9.78737 18.504 9.87998 18.4095L15.54 12.7595C15.6415 12.6659 15.7225 12.5523 15.7779 12.4258C15.8333 12.2993 15.8619 12.1627 15.8619 12.0245C15.8619 11.8864 15.8333 11.7498 15.7779 11.6233C15.7225 11.4968 15.6415 11.3832 15.54 11.2895Z" fill="white" />
                        </svg>
                    </button>
                </div>
            </div>
            <Subscribe />
        </>
    )
}
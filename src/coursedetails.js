import { toast } from "react-hot-toast";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./components/circleLoader"
import {BsFillCameraVideoFill} from "react-icons/bs"
import {AiFillCaretDown} from "react-icons/ai"

export default function CourseDetails() {

    const cookies = new Cookies();
    const [process, setprocess] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const [course, setCourse] = useState();

    console.log(params)

    useEffect(() => {
        axios.post("https://eduvi.up.railway.app/getCourse", {
            id: params.id
        }).then(result => {
            console.log(result);
            setCourse(result.data.course)
        }).catch(err => console.log(err))
    }, [])

    const handlePayment = async (price, user) => {

        if (user) {
            const { token } = user;

            setprocess(true);

            //getting razorpay key from server
            const { data: { key } } = await axios.get("https://eduvi.up.railway.app/getKey");

            //posting server with amount 
            const { data: { order } } = await axios.post("https://eduvi.up.railway.app/checkout", {
                amount: price
            })

            console.log(order);

            const options = {
                key: key, // Enter the Key ID generated from the Dashboard
                amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "Eduvi",
                description: `Paying for ${course.title}`,
                image: course.background,
                order_id: order.id,
                callback_url: `https://eduvi.up.railway.app/paymentverification?token=${token}&id=${params.id}`,
                notes: {
                    address: "Eduvi Company"
                },
                theme: {
                    color: "#0A033C"
                }
            }

            var razor = new window.Razorpay(options);
            razor.open();
            setprocess(false);
        } else {
            toast.error("You need to login.");
        }
    }

    const showContent = (target) =>{
        const video = document.getElementsByClassName(`video${target}`);
        if(video[0].classList.contains("hide")){
            video[0].classList.remove("hide");
        }else{
            video[0].classList.add("hide");
        }
    }

    return (
        <div width="100vw" height="100vh">
            {course === undefined ? <div style={{margin : "350px auto"}}> <Loader></Loader></div> :
               <>
                
                    <div className="course-banner">
                        <div className="course-title">
                            <h1>{course?.title}</h1>
                            <p>{course?.desc}</p>
                            <div className="more">
                                <div>
                                    <svg xmlns="https://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.15407 7.30116C7.52877 5.59304 9.63674 4.5 12 4.5C12.365 4.5 12.7238 4.52607 13.0748 4.57644L13.7126 5.85192L11.2716 8.2929L8.6466 8.6679L7.36009 9.95441L6.15407 7.30116ZM5.2011 8.82954C4.75126 9.79256 4.5 10.8669 4.5 12C4.5 15.6945 7.17133 18.7651 10.6878 19.3856L11.0989 18.7195L8.8147 15.547L10.3741 13.5256L9.63268 13.1549L6.94027 13.6036L6.41366 11.4972L5.2011 8.82954ZM7.95559 11.4802L8.05962 11.8964L9.86722 11.5951L11.3726 12.3478L14.0824 11.9714L18.9544 14.8135C19.3063 13.9447 19.5 12.995 19.5 12C19.5 8.93729 17.6642 6.30336 15.033 5.13856L15.5377 6.1481L11.9787 9.70711L9.35371 10.0821L7.95559 11.4802ZM18.2539 16.1414C16.9774 18.0652 14.8369 19.366 12.3859 19.4902L12.9011 18.6555L10.6853 15.578L12.0853 13.7632L13.7748 13.5286L18.2539 16.1414ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" fill="#ffff" />
                                    </svg>
                                    <p>{course?.language}</p>
                                </div>
                                <div>
                                    <svg xmlns="https://www.w3.org/2000/svg" width="15px" height="15px" viewBox="-0.5 0 21 21" version="1.1">
                                        <title>content / 34 - content, book, brochure, magazine, read icon</title>
                                        <g id="Free-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <g transform="translate(-155.000000, -451.000000)" id="Group" stroke="#ffff" stroke-width="2">
                                                <g transform="translate(153.000000, 450.000000)" id="Shape">
                                                    <path d="M20.9999958,3.25 L20.9999958,19.5018874 C14.9999958,19.1144138 11.9999958,19.6137847 11.9999958,21 C11.9999958,21 11.9999958,9.95538748 11.9999958,5.61908 C11.9999958,3.25632105 14.9999958,2.46662772 20.9999958,3.25 Z">

                                                    </path>
                                                    <path d="M2.99999577,3.25 L2.99999577,19.5018874 L3.74965625,19.4572404 L3.74965625,19.4572404 L4.4667228,19.4222285 L4.4667228,19.4222285 L5.15119541,19.3968519 L5.15119541,19.3968519 L5.80307409,19.3811106 C5.90900437,19.37929 6.01357658,19.3778708 6.1167907,19.3768531 L6.71977848,19.3755647 L6.71977848,19.3755647 L7.29017232,19.3839114 L7.29017232,19.3839114 L7.82797223,19.4018935 L7.82797223,19.4018935 L8.33317821,19.4295108 C8.49614788,19.4403224 8.65368522,19.4527399 8.80579025,19.4667633 L9.24580836,19.5136511 C11.0113131,19.7290903 11.9280175,20.1954475 11.9959215,20.9127226 L11.9999958,20.9661174 L11.9999958,20.9661174 L11.9999958,5.61908 L11.9999958,5.61908 C11.9999958,3.69029719 10.0008288,2.809788 6.00249473,2.97755244 L5.38775087,3.01057916 C5.28279461,3.01739396 5.17658886,3.02486392 5.06913363,3.03298906 L4.40940852,3.08960194 C4.18450223,3.11109358 3.95459802,3.13520591 3.7196959,3.16193892 L2.99999577,3.25 L2.99999577,3.25 Z">

                                                    </path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    <p>{course?.content.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="course-buy">
                            <div className="course-buy-img">
                                <img src={course?.background} alt="" />
                            </div>
                            <div className="info">
                                <p>Price</p>
                                <p style={{ color: "var(--primary-color)" }}>₹{course?.price}</p>
                                <p>Instructor</p>
                                <p>{course?.creator}</p>
                                <p>Lessons</p>
                                <p>{course?.content.length}</p>
                                <p>Certificate</p>
                                <p>{course?.certificate ? "Yes" : "No"}</p>
                                <p>Language</p>
                                <p>{course?.language}</p>
                                <p>Access</p>
                                <p>Lifetime</p>
                            </div>
                            <button onClick={() => handlePayment(course?.price, cookies.get("token"))}>Buy this course</button>
                        </div>
                    </div>
                    <div className="course-details">
                        <h1>What you'll learn </h1>
                        <p>{course?.learnthis.split("\n\n").map(line => "✔ " + line).join("\n")}</p>
                        <h1>Course Content</h1>
                        <ul>
                            {course?.content.map((section,index) =>{
                                return <div className={`section${index} section`} key={index}>
                                    <h3 onClick={() => showContent(index)}><AiFillCaretDown/> {section.title}</h3>
                                    <ul className={`video${index} hide`}>
                                        {section.video.map(v =>{
                                            return <><li><BsFillCameraVideoFill style={{marginRight : "10px"}}/>{v.videotitle}</li></>
                                        })}
                                    </ul>
                                </div>;
                            })}
                        </ul>
                        <h1>Who is this course for</h1>
                        <p>{course?.coursefor}</p>
                        <h1>Prerequisites</h1>
                        <p>{course?.prerequisites.replace(/^/gm, '✔ ')}</p>
                        <h1>Contact Instructor</h1>
                        <div className="instructor">
                            <img src="httpss://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1-744x744.jpg" alt={course?.creator}/>
                            <div>
                                <h2>{course?.creator}</h2>
                                <p>{course?.email}</p>
                            </div>
                    </div>
                    </div>
                    {console.log(course?.learnthis)}
                </>
            }


        </div>
    )
}
import { ReactComponent as Holder2 } from './assets/holder2.svg';
import mentorjoinpic from "./assets/mentor-join.png"

export default function Mentors() {

    const mentors = [{
        name : "Kinsley Nicholson",
        pic : "https://randomuser.me/api/portraits/men/85.jpg"
    },{
        name : "Rosalia Cox",
        pic : "https://randomuser.me/api/portraits/women/81.jpg"
    },{
        name : "Elias Parsons",
        pic : "https://randomuser.me/api/portraits/men/78.jpg"
    },{
        name : "Khaleesi Howe",
        pic : "https://randomuser.me/api/portraits/men/43.jpg"
    },{
        name : "Amaia Blair",
        pic : "https://randomuser.me/api/portraits/women/0.jpg"
    },]

    return (
        <div className="Mentors">
            <h3>Our Mentors</h3>
            <div className="mentor-layout">
                
                {mentors.map((mentor,index) =>{
                    return <div className='mentor' key={index}>
                        <img src={mentor.pic} alt={mentor.name}/>
                        <h2>{mentor.name}</h2>
                    </div>
                })}
            </div>
            
            <div className="mentor-join">
                <div className="mentor-join-img">
                    <img src={mentorjoinpic} alt="" />
                    <Holder2 />
                </div>
                <div className="mentor-join-desc">
                    <h1>Want to share your knowledge? Join us as a Mentor</h1>
                    <p>High-definition video is video of higher resolution and quality than standard-definition. While there is no standardized meaning for high-definition, generally any video.</p>
                    <button>Apply now</button>
                </div>
            </div>
        </div>
    )
}
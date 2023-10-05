import { ReactComponent as Holder } from './assets/holder.svg';
import { ReactComponent as Holder2 } from './assets/holder2.svg';
import { ReactComponent as Audio } from './assets/audio.svg';
import { ReactComponent as Recorded } from './assets/recorded.svg';
import { ReactComponent as Live } from './assets/live.svg';
import registerpic from "./assets/on-desk.png"
import collegestudent from "./assets/college-student.png"
import mentorjoinpic from "./assets/mentor-join.png"
import videopreview from "./assets/videocallpreview.jpeg";
import './App.css';
import Subscribe from './components/Subscribe';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  return (
    <>
      <div className="hero">
        <div className="hero-section-1">
            <h3>Never Stop Learning</h3>
            <h1>Grow up your skills by online courses with Eduvi</h1>
            <p>Eduvi is a Global training across world with specialises in accredited and bespoke training courses. We crush the barriers to getting a degree.</p>
        </div>
        <div className="hero-section-2">
          <Holder/>
          <img src={collegestudent} alt=""/>
        </div>
      </div>
      <div className="section-video-preview">
        <div className="video-preview-desc">
          <h3>High quality video , audio & live classes</h3>
          <p>High-definition video is video of higher resolution and quality than standard-definition. While there is no standardized meaning for high-definition, generally any video image with considerably more than
480 vertical scan lines or 576 vertical lines is considered high-definition.</p>
          <button onClick={() => navigate("/courses")}>Visit Courses</button>
        </div>
        <img src={videopreview} alt=""/>
        <div className="features">
          <div className="feature">
            <Audio/> <h3>Audio Classes</h3>
          </div>
          <div className="feature">
            <Live/> <h3>Live Classes</h3>
          </div>
          <div className="feature">
            <Recorded/> <h3>Recorded Classes</h3>
          </div>
        </div>
      </div>
      <div className="register-now">
        <div className="register-desc">
        <h3>College Level</h3>
          <h1>Don't waste time. Develop your skills. <br/>Start Now! </h1>
          <p>High-definition video is video of higher resolution and quality than standard-definition. While there is no standardized
meaning for high-definition, generally any video</p>
          <button>Register Now</button>
        </div>
        <div className="register-img">
          <img src={registerpic} alt="person coding on laptop on desk" />
        </div>
      </div>
      <div className="mentor-join">
        <div className="mentor-join-img">
          <img src={mentorjoinpic} alt=""/>
          <Holder2/>
        </div>
        <div className="mentor-join-desc">
          <h1>Want to share your knowledge? Join us as a Mentor</h1>
          <p>High-definition video is video of higher resolution and quality than standard-definition. While there is no standardized meaning for high-definition, generally any video.</p>
          <button>Apply now</button>
        </div>
      </div>
      <Subscribe/>
    </>
  );
}

export default App;

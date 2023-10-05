import styles from "./Subscribe.module.css"
import img1 from "../assets/img-1.jpeg"
import img2 from "../assets/img-2.jpeg"
import img3 from "../assets/img-3.jpeg"
import img4 from "../assets/img-4.jpeg"
import img5 from "../assets/img-5.jpeg"
import img6 from "../assets/img-6.jpeg"

export default function Subscribe(){
    return(
        <div className={styles.subscribe}>
            <div className={styles.imgShowcaseRight}>
                <img src={img1} alt="profile pic" />
                <img src={img2} alt="profile pic" />
                <img src={img3} alt="profile pic" />
            </div>
            <div className={styles.subscribeDesc}>
                <h1>Subscribe To Get Update On Every New Course</h1>
                <p>20k+ students daily learn with Eduvi. Subscribe for new courses.</p>
                <input type="text" placeholder="enter your email"/>
                <button>Subscribe</button>
            </div>
            <div className={styles.imgShowcaseLeft}>
                <img src={img4} alt="profile pic" />
                <img src={img5} alt="profile pic" />
                <img src={img6} alt="profile pic" />
            </div>
        </div>
    )
}
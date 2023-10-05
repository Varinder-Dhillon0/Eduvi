import styles from "./Course.module.css"

export default function Course({id, title, background, desc, price, instructor, bought ,time}) {

    return (
        <a href={bought ? "/learn/" + id : "/coursedetails/" + id}>
            <div className={styles.course}>
                <div className={styles.courseImg}>
                    <img src={background} alt="" />
                </div>
                <h2>{title?.length > 52 ? title.substr(0,52) + "..." : title}</h2>
                <p>{desc?.length >= 80 ? desc.substr(0,80) + "..." : desc}</p>
                <h4>{instructor}</h4>
                <h3>₹{price}</h3>
                <p>{time}</p>
            </div>
        </a>
    )
}
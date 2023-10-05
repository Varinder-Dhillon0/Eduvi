import { ReactComponent as Logo } from "../assets/logo.svg"
import { ReactComponent as Facebook } from "../assets/facebook.svg"
import { ReactComponent as Instagram } from "../assets/instagram.svg"
import { ReactComponent as Twitter } from "../assets/twitter.svg"
import { ReactComponent as Linkedin } from "../assets/linkedin.svg"
import styles from "./Footer.module.css"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.companyInfo}>
                <div className={styles.logo}>
                    <Logo />
                    <p>Eduvi</p>
                </div>
                <div className={styles.links}>
                    <a href=""><Facebook /></a>
                    <a href=""><Twitter /></a>
                    <a href=""><Instagram /></a>
                    <a href=""><Linkedin /></a>
                </div>
                <p>© 2021 Eduvi.co</p>
                <p>Eduvi is a registered trademark of Eduvi.co</p>
            </div>
            
        </footer>
    )
}
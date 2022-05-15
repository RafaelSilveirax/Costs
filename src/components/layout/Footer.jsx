import styles from './Footer.module.css'

import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";


export function Footer(props){
    return(
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li><FaFacebookF/></li>
                <li><FaInstagram/></li>
                <li><FaLinkedin/></li>
            </ul>
            <p className={styles.copy_right}><span>Const</span> &copy; 2022</p>
        </footer> 
       
            
    )
}
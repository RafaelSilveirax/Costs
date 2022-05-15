
import { Link } from 'react-router-dom'
import styles from './LinkButton.module.css'
/* import savings from '../../img/savings.svg' */

export function LinkButton({to, text}){
    return(
        <Link className={styles.btn} to={to}>
            {text}
        </Link>
    )
}

import { useLocation } from "react-router-dom";
import { Container } from "../layout/Container";
import { Message } from "../layout/Message";
import { LinkButton } from "../layout/LinkButton";
import styles from './Projects.module.css'


export function Projects(){

    const location = useLocation()
    let message = '' 
    if(location.state){
        message = location.state.message
    }
    console.log(message)
    return(
    <div className={styles.projetc_container}>
        <div className={styles.title_container}>
            <h1>Meus Projetos</h1>
            <LinkButton to="/newproject" text="Criar Projeto"/>
        </div>
        {message && <Message type="success" msg={message}/>}
        <Container customClass="start">
            <p>Projetos...</p>
        </Container>
    </div>
    )
}
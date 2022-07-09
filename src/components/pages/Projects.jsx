
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { Container } from "../layout/Container";
import { Message } from "../layout/Message";
import { LinkButton } from "../layout/LinkButton";
import styles from './Projects.module.css'
import {ProjectCard} from '../project/ProjectCard'

export function Projects(){
    const[projects, setProjects] = useState([])

    const location = useLocation()
    let message = '' 
    if(location.state){
        message = location.state.message
    }

    useEffect(()=>{
        fetch('http://localhost:5000/projects',{
          method:'GET',
           headers:{
             'Content-Type':'application/json',
          },
        })
           .then((resp)=>resp.json())
           .then((data)=>{
             console.log(data)
             setProjects(data)
           })
           .catch((err)=>console.log(err))
       },[])
    return(
    <div className={styles.projetc_container}>
        <div className={styles.title_container}>
            <h1>Meus Projetos</h1>
            <LinkButton to="/newproject" text="Criar Projeto"/>
        </div>
        {message && <Message type="success" msg={message}/>}
        <Container customClass="start">
            {projects.length > 0 &&
                projects.map((projects) =>
                 <ProjectCard
                 id={projects.name}
                 name={projects.name}
                 budget={projects.budget}
                 category={projects.category.name}
                 key={projects.id}
            
                 />
                )
            }
        </Container>
    </div>
    )
}
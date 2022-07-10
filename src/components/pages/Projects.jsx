
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from './Projects.module.css'

import { Container } from "../layout/Container";
import { Message } from "../layout/Message";
import { LinkButton } from "../layout/LinkButton";
import {ProjectCard} from '../project/ProjectCard'
import {Loading} from '../layout/Loading'

export function Projects(){
    const[projects, setProjects] = useState([])
    const[removeLoading, setRemoveLoading] = useState(false)
    const[projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = '' 
    if(location.state){
        message = location.state.message
    }

    useEffect(()=>{
        setTimeout(
            () =>{
                fetch('http://localhost:5000/projects',{
                    method:'GET',
                     headers:{
                       'Content-Type':'application/json',
                    },
                  })
                     .then((resp)=>resp.json())
                     .then((data)=>{
                       setProjects(data)
                       setRemoveLoading(true)
                     })
                     .catch((err)=>console.log(err))
            }, 300)
       },[])

       function removeProject(id){
            fetch(`http://localhost:5000/projects/${id}`,{
                method:'DELETE',
                    headers:{
                    'Content-Type':'application/json',
                },
            })
            .then(resp => resp.json())
            .then(() => {
                setProjects(projects.filter((project) => project.id !== id))
                setProjectMessage('Projeto removido com sucesso!')
                console.log("teste")
            })
            .catch(err => console.log(err))
        }


    return(
    <div className={styles.projetc_container}>
        <div className={styles.title_container}>
            <h1>Meus Projetos</h1>
            <LinkButton to="/newproject" text="Criar Projeto"/>
        </div>
        {message && <Message type="success" msg={message}/>}
        {projectMessage && <Message type="success" msg={projectMessage}/>}
        <Container customClass="start">
            {projects.length > 0 &&
                projects.map((projects) =>
                 <ProjectCard
                 id={projects.id}
                 name={projects.name}
                 budget={projects.budget}
                 category={projects.category.name}
                 key={projects.id}
                 handleRemove={removeProject}
                 />
                )
            }
            {!removeLoading && <Loading/>}
            {removeLoading && projects.length === 0 &&
                <p>Não há projetos cadastrado</p>
            }
        </Container>
    </div>
    )
}
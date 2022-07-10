import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";

import styles from './Project.module.css'

import {Loading} from '../layout/Loading'
import {Container} from '../layout/Container'

export function Project(){
    const {id} = useParams()

    const[project, setProject] = useState([])
    const[showProjectForm, setShowProjectForm] = useState(false)

    useEffect(()=>{
        fetch(`http://localhost:5000/projects/${id}`,{
            method:'GET',
            headers:{
            'Content-Type':'application/json',
            },
        })
            .then((resp)=>resp.json())
            .then((data)=>{
                console.log("🚀 ~ file: Project.jsx ~ line 20 ~ .then ~ data", data)
                setProject(data)
            })
            .catch((err)=>console.log(err))
       },[id])

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    return(
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column"> 
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> {project.budget}
                                    </p>
                                    <p>
                                        <span>Total de Utilizado:</span> {project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>Detalhes do Projeto</div>
                            )}
                        </div>
                    </Container>
                </div>
            ):(
                <Loading/>
            )}
        </>
    )
}
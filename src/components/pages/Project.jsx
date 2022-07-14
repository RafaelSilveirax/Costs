import { parse, v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";


import styles from './Project.module.css'

import {Loading} from '../layout/Loading'
import {Container} from '../layout/Container'
import {ProjectForm} from '../project/ProjectForm'
import {Message} from '../layout/Message'
import {ServiceForm} from '../service/ServiceForm'
import {ServiceCard} from '../service/ServiceCard'

export function Project(){
    const {id} = useParams()

    const[project, setProject] = useState([])
    const[services, setServices] = useState([])
    const[showProjectForm, setShowProjectForm] = useState(false)
    const[showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

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
                setServices(data.services)
            })
            .catch((err)=>console.log(err))
       },[id])

    function editPost(project){
        setMessage("") //IPC isso é feito para não ter o bug e não aparecer a msg quando é repetido seu style 
        // budget validation
        if(project.budget < project.cost){
            setMessage("O oarçamento não pode ser menor que o custo do projeto !")
            setType('error')
            return false;
        }

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method:'PATCH',
            headers:{
            'Content-Type':'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp)=>resp.json())
            .then((data)=>{
                setProject(data)
                setShowProjectForm(false)
                setMessage("Projeto atualizado !")
                setType('success')
            })
            .catch((err)=>console.log(err))

        console.log(project)
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    function createService(project){
        setMessage("")
        //last service
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        console.log("🚀 ~ file: Project.jsx ~ line 79 ~ createService ~ lastService", lastService)
        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
       
        //maximn value valudatuin
        
        if(newCost > parseFloat(project.budget)) {
            setMessage("Orçamento ultrapassado, verifique o valor do serviço")
            setType('error')
            project.services.pop()
            return false
        }
        //add service
        project.cost = newCost

        //upadte
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method:'PATCH',
            headers:{
            'Content-Type':'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp)=>resp.json())
            .then((data)=>{
                setMessage("Serviço adicionado !")
                setType('success')
                setShowServiceForm(false)
            })
            .catch((err)=>console.log(err)) 
    }

    function removeService(id, cost){
        const serviceUpadte = project.services.filter(
            (services) => services.id !== id
        )

        const projectUpadted = project
        projectUpadted.services = serviceUpadte
        projectUpadted.cost = parseFloat(projectUpadted.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpadted.id}`,{
            method:'PATCH',
            headers:{
            'Content-Type':'application/json',
            },
            body: JSON.stringify(projectUpadted),
        })
            .then((resp)=>resp.json())
            .then((data)=>{
                setProject(projectUpadted)
                setServices(serviceUpadte)
                setMessage('Serviço removido com sucesso !')
                setType('success')
            })
            .catch((err)=>console.log(err)) 
    }

    return(
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column"> 
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button  className={styles.btn} onClick={toggleProjectForm}>
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
                                <div className={styles.project_info}>
                                    <ProjectForm 
                                    handleSubmit={editPost} 
                                    btnText="Concluir Edição" 
                                    projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                    textBtn="Adicionar Serviço"
                                    projectData={project}
                                    handleSubmit={createService}
                                    />
                                    
                                )
                                }
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 &&
                                services.map((service) => (
                                   <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                    />                                               
                                ))
                            }
                            {services.length == 0 && <p>Não há serviço</p>

                            }
                        </Container>
                    </Container>
                </div>
            ):(
                <Loading/>
            )}
        </>
    )
}
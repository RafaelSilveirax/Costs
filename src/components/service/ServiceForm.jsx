import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";

import styles from '../project/ProjectForm.module.css'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'


export function ServiceForm({handleSubmit, textBtn, projectData }){

    const[service, setService] = useState({})

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text"
                text="Nome do serviço"
                name="name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
            />
            <Input 
                type="number"
                text="Valor do serviço"
                name="cost"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
            />
            <Input 
                type="text"
                text="Descrição do serviço"
                name="description"
                placeholder="Descreva o serviço"
                handleOnChange={handleChange}
            />
            <SubmitButton text={textBtn} />
        </form>
    )
}
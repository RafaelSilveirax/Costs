import { useEffect, useState } from 'react'

import  Input  from '../form/Input.jsx'
import  Select  from '../form/Select.jsx'
import SubmitButton from '../form/SubmitButton.jsx'
import styles from './ProjectForm.module.css' 

export function ProjectForm({btnText}){


const [categories, setCategories] = useState([]);


useEffect(() => {
    fetch("http://localhost:5000/categories", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data);
        })
        .catch((err) => console.log(err));
}, []);

   
    return(
        <form className={styles.form}>
            <Input type="text" text="Nome do Projeto" 
            name="name" placeholder="Insira o nome do projeto"/>

            <Input type="number" text="Orçamento do projeto" 
            name="budget" placeholder="Insira o orçamento do projeto"/>

            <Select name="category_id" text="Selecione a categoria" options={categories}>
            </Select>

            <SubmitButton text={btnText}/>
    
        </form>
    )
}
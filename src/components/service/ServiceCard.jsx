import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";

import styles from '../project/ProjectCard.module.css'
import {BsFillTrashFill} from 'react-icons/bs'




export function ServiceCard({id, name, cost, description, handleRemove }){

    const[, ] = useState({})

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost)
    }

    return(
        <div className={styles.project_card}>
             <h4>{name}</h4>
            <p>
                <span>Custo Total:</span> R${cost}
            </p>
            <p>
                {description}
            </p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill/> Excluir
                </button>
                
            </div>
           {/*  <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p> */}
        </div>
    )
}
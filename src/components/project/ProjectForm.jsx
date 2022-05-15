import styles from './ProjectForm.module.css' 

export function ProjectForm(){
    return(
        <form>
            <div>
                <input type="text" name="" id="" placeholder='Insira o nome do projeto' />
            </div>
            <div>
                <input type="number" name="" id="" placeholder='Insira o orçamento total' />
            </div>
            <div>
                <select name="categoru_id" id="">
                    <option disabled value="">Selecione a categoria</option>
                </select>
            </div>
            <div>
                <input type="submit" value="Criar Projeto" />
            </div>
        </form>
    )
}
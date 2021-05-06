import React from "react";
import styles from "./styles/styles.scss"

const Modal = ({activate, setModalActivate, data})=>{
    // if(activate===id){
    if(data !==null)
        return(
            <div className={activate?styles.modal + " " +styles.active: styles.modal} onClick={()=>setModalActivate(-1)}>
                <div className={styles.modal__content} onClick={e => e.stopPropagation()}>
                    <div className={styles.IMG}>
                        <img src={`http://covers.openlibrary.org/b/id/${data.cover_i}-L.jpg`} height={"auto"} width={"100%"} style={{ "objectFit": "cover"}}/>

                        <div className={styles.Autor}>
                            {data.author_name?<span>{data.author_name[0]}</span>:<span>Отсутствует</span>}
                        </div>
                    </div>
                    <div className={styles.Description}>
                        <div className={styles.Title}>
                            {data.title}
                            <br/>
                            {data.first_publish_year}
                        </div>
                        <div className={styles.Publicheres}>
                            Список издателей:
                            <div className={styles.PublichersList}>
                                {data.publisher? data.publisher.map((publisher, i)=>(
                                    <span key={i}>{publisher}</span>
                                )):<div>нет издателей</div>}
                            </div>
                        </div>
                        <div className={styles.isbn}>
                            isbn:
                            <div className={styles.isbn_list}>
                                {data.isbn? data.isbn.map((isbn, i)=>(
                                    <span key={i}>{isbn}</span>
                                )):<div>нет</div>}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    else{
    return <div></div>
    }
    // else{
//     return(<div></div>)
// }
    }



export default Modal
//:styles.modal
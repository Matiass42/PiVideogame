import React from 'react';
import style from "./Loading.module.css";
import imgload from '../../img/loadinggame.gif'

export default function Loading(){
    return(
        <div className={style.container}>
            <div className={style.loader}>
               <img src={imgload} alt="img" />
            </div>
            <p className={style.message}>Loading...</p>
        </div>
    )
}
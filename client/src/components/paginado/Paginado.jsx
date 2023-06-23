import React from "react";
import style from "./Paginado.module.css";

export default function Paginado ({gamesPerPage, allVideoGames, paginado}) {
    //Me creo un const que será un array vacio
    const numberPage = []

    for(let i = 0; i < Math.ceil(allVideoGames/gamesPerPage); i++){//Había un error aqui, ya esta solucionado
        //Match.ceil ==>> Devuelve el entero mayor o igual más próximo a un número dado
        // i <= Math.ceil(100/15); ==> i <= Match.ceil(6,67) ==> i <= 7
        numberPage.push(i + 1)
    }

    //Solución al paginado doble para el detail
    // if(numberPage.length > allVideoGames/gamesPerPage){
    //     numberPage.length = numberPage.length - 1;
    // }

    return(
        <nav className={style.paginado}>
            <ul>
                {numberPage &&
                numberPage.map(number => {
                    return(  
                    <li key={number}>
                        <button onClick={() => paginado(number)}>{number}</button>
                    </li>
                )})}
            </ul>
        </nav>
    )
}
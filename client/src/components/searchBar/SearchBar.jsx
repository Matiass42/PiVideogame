import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getVideogameByName } from "../../Redux/Actions";
import Paginado from "../paginado/Paginado";
import style from "./SearchBar.module.css";

//Creo mi función SearchBar(Buscar en Barra)
export default function SearchBar(){
    //me traigo dispatch para despachar
    const dispatch = useDispatch();
    //Me creo un estado local name y lo seteo en un string vacio
    const [name, setName] = useState("");

    //Aqui hacemos la logica para el submit y el button:

    //Logica del submit
    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
        //console.log(name);
        Paginado(1);
    }
    //A esta función se la pasamos al input

    //logica del button
    function handleSubmit(e){
        e.preventDefault();
        if(!name){
            return alert("Please input a name to start the search");
        }else{
            dispatch(getVideogameByName(name));
            setName("");
        }
    }
    
    //Renderizado
    return(
        <div className={style.container}>
            <form className={style.form}>
                <input type="text" placeholder="Search by name..." onChange={(e) => handleInputChange(e)} value={name}/>
                <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
            </form>
        </div>
    )
}
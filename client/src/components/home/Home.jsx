import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllVideogames, orderByName, orderByRating, filterCreated, getGenres, filterGenres } from "../../Redux/Actions";
import Card from "../card/Card";
import Paginado from "../paginado/Paginado";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import style from "./Home.module.css";
import Loading from "../loading/Loading";

export default function Home () {
    const dispatch = useDispatch();

    const allVideoGames = useSelector((state) => state.allVideoGames);
    console.log(allVideoGames);

    //Guardo los generos que voy a utilizar del estado global 
    const allGenres = useSelector((state) => state.genres);
    
    //Estado local para el ordenamiento
    const [order, setOrder] = useState("");

    //Defino varios estados locales
    const [pageCurrent, setPageCurrent] = useState(1)

    //videogames quiero tener por pagina
    const [gamesPerPage, setGamesPerPage] = useState(15)

    //Declaro una const del ultimo videogames
    const indexOfLastGames = pageCurrent * gamesPerPage // =>>

    //Declaro otra que va ser el indice del primer videogame
    //que va a ser igual al indice del ultimo videogames menos los videogames por pagina
    const indexOfFirstGames = indexOfLastGames - gamesPerPage

    //Creamos una nueva const que tendra los videogames de la pagina actual
    const gamesCurrent = allVideoGames.slice(indexOfFirstGames, indexOfLastGames)

    //Declaro un const paginado, que va a recibir como argumento un número de la pagina,
    //y vamos a setear la pagina en ese numero de paginas
    const paginado = (numberPage) => {
        setPageCurrent(numberPage)
      }

    //-----------------------------------------------------//
    const all = useSelector((state) => state.copyAllVideoGames);
    //Estado local para el loading
    const [loading, setLoading] = useState(true);//==> Función inicial en false

    if(allVideoGames.length > 0 && loading){//si fue cargada la pagina 
      setLoading(false)
    }
    //------------------------------------------------------//

    //UseEffect = Recibe dos argumentos un callbacks y un array de dependencia
    useEffect( () => {
        dispatch(getAllVideogames());
        dispatch(getGenres());
    },[dispatch])
    //console.log(allVideoGames);

    //HandleClick nos reseteara de vuelta todo el estado de getAllVideoGames()
     function handleClick(e){
        //console.log(e)
        e.preventDefault();
        dispatch(getAllVideogames());
     }

     //HandleSort despachara la action que nos llegue por e.target.value
     function handleSort(e){
        //console.log(e.target.value);//==>>A-Z o Z-A
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setPageCurrent(1);//Aqui cuando hago el ordenamiento seteame la pagina en la primera
        setOrder(`Ordenado ${e.target.value}`);//Cuando seteo la pagina en 1, me va a modifique el estado local y me lo renderice
     }

     //Despacho el ordemaniemto por rating
     function handleRatingSort(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setPageCurrent(1);
        setOrder(`Ordenado ${e.target.value}`);
     }

     //Realizado el filtrado en el reducer, los despachamos
     function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value));
     }

     //Despacho los generos obtenidos
     function handleGenres(e){
        //El e.preventDefault(), no lo vamos a necesitar en esta funcion
        dispatch(filterGenres(e.target.value));
        setOrder(`${e.target.value}`);
     }

    return(
        <div> 
                {all.length > 0 ? (<div>            
              <div>
                  <button onClick={e => {handleClick(e)}} className={style.button}>
                     Clean Page
                  </button>
                  <Link to='/createVideogames' className={style.button}>Create Videogame</Link>           
              </div>
                <div>
                   <select onChange={e => handleSort(e)} className={style.select}>
                      <option value="Order-Letter">Order by letter</option>
                      <option value="A-Z"> A-Z </option>
                      <option value="Z-A"> Z-A </option>
                    </select>
                    <select onChange={e => handleRatingSort(e)} className={style.select}>
                       <option value="Order-Rating">Order by rating</option>
                       <option value="Men-May">Men-May</option>
                       <option value="May-Men">May-Men</option>
                    </select>
                    <select onChange={e => handleGenres(e)} className={style.select}>
                       <option value="All">Genres</option>
                       {
                          allGenres?.map(el => (<option key={el.id} value={el.name}>{el.name}</option>))
                        }
                    </select>
                    <select onChange={e => handleFilterCreated(e)} className={style.select}>
                       <option value="All">All</option>
                       <option value="Created">Created in DB</option>
                       <option value="Existing">From the API</option>
                    </select>
                </div>        
               <div>
                <SearchBar/>
               </div>
               <Paginado
               gamesPerPage={gamesPerPage}
               allVideoGames={allVideoGames.length}
               paginado={paginado}
               />
               <div className={style.contenedor}>
               <div className={style.cards}>
               {
               gamesCurrent?.map(videogame => {
                 return (
                  <li className={style.li} key={videogame.id}>
                     <Link to={`/detail/${videogame.id}`}>
                       <Card className={style.card}
                        image={videogame.image}
                        name={videogame.name}
                        rating={videogame.rating}
                        genres={videogame.genres}
                        platforms={videogame.platforms}
                        />
                     </Link>
                  </li>
                )
               })
               }
              </div>
            </div>
            </div>): <Loading/>
            }
         </div>
        )
   }

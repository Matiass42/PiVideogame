import React from "react";
import { useState, useEffect } from "react";
import validation from "./Validation";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPlatforms, postVideogames } from "../../Redux/Actions";
import { Link, useHistory } from "react-router-dom";
import style from "./Form.module.css";


export default function Form(){
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const platForms = useSelector((state) => state.platforms);
    const history = useHistory();
    console.log(platForms)

    //Me guardo el formulario en un estado, que tendra mi objeto con todas las propiedades del videogames a crear
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        image: "",
        platforms: [],
        genres: []
    })

    //Creo un estado local para encontrar errores en el formulario
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch])

    //Logica de mi formulario
    //Creo una funcion que recibira los cambios que haya en el input y modifique nuestro estado local
    function handleInputChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        
        //Seteo los errores al mismo tiempo que suceden los cambios en el input
        setErrors(validation({
            ...errors,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    } 

    function handleSelectPlatforms(e){
        //Verifico que no se repitan
        if(!input.platforms.includes(e.target.value)){
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
            setErrors(validation({
                ...input,
                platforms: [...input.platforms, e.target.value]
            }))
        }else{
            setInput({
                ...input
            })
        }
    }

    function handleDeletePlatforms(e){
        setInput({
            ...input,
            platforms: input.platforms.filter(el => el !== e)
        })
    }

    function handleSelectGenres(e){
        //Verifico que no puedam seleccionarse repetidos
        if(!input.genres.includes(e.target.value)){
            //Si el genero seleccionado no esta en el array, entonces incluilo
            setInput({
                ...input,
                genres: [...input.genres, e.target.value] //==>>Traigo lo que ya tengo y lo concateno
            });
            setErrors(validation({
                ...input,
                genres: [...input.genres, e.target.value]
            }));
        }else{
            setInput({
                ...input
            });
        }
    }

    //Agregamos la posibilidad de eliminar los generos seleccionados
    function handleDeleteGenres(e){
        setInput({
            ...input,
            genres: input.genres.filter(el => el !== e)
        });
    }

    function handleSubmit(e){
        //console.log(e.target.value)
        e.preventDefault();
        console.log(input)
        dispatch(postVideogames(input))
        //Mandamos un msj de confirmacion
        alert("Videogame created with success");
        //Seteamos de nuevo el input, para limpiarlo
        setInput({
            name: "",
            description: "",
            released: "",
            rating: "",
            image: "",
            platforms: [],
            genres: []
        })
        //Finalizada la creación redirigo a mi pagina principal
        history.push('/home');
    }

    return(
        <div className={style.container}>
            <Link to='/home'>
                <button className={style.button}>Return Home</button>
            </Link>
            <h1>Create Videogames</h1>
            <form className={style.form}>
                <div>
                    <label>Nombre:</label>
                    <input
                    placeholder="Ingresar nombre..."
                    type="text" 
                    value={input.name} 
                    name="name" 
                    onChange={handleInputChange}
                    />
                    <span className={style.span}>
                        {/*Renderizamos en un condicional el errors*/}
                        {errors.name && <p className={style.error}>{errors.name}</p>}                  
                    </span>
                </div>
                <div>
                    <label>Description:</label>
                    <input
                    placeholder="Ingresar descripción..."
                    type="text" 
                    value={input.description} 
                    name="description" 
                    onChange={handleInputChange} 
                    />
                    <span>
                        {errors.description && <p className={style.error}>{errors.description}</p>}
                    </span>
                </div>
                <div>
                    <label>Released:</label>
                    <input 
                    type="date" 
                    value={input.released} 
                    name="released" 
                    onChange={handleInputChange}
                    />
                    <span>
                        {errors.released && <p className={style.error}>{errors.released}</p>}
                    </span>
                </div>
                <div>
                    <label>Rating:</label>
                    <input 
                    placeholder="Ingresar rating..."
                    type="float" 
                    value={input.rating} 
                    name="rating" 
                    onChange={handleInputChange}
                    />
                    <span>
                        {errors.rating && <p className={style.error}>{errors.rating}</p>}
                    </span>
                </div>
                <div>
                    <label>Image:</label>
                    <input 
                    placeholder="Ingresar imagen..."
                    type="text" 
                    value={input.image} 
                    name="image" 
                    onChange={handleInputChange}
                    />
                    <span>
                        {errors.image && <p className={style.error}>{errors.image}</p>}
                    </span>
                </div>
                <div>
                    <h6>Platforms:</h6>
                    <select onChange={(e) => handleSelectPlatforms(e)}>
                        <option value="All">All</option>
                        {platForms && 
                        platForms.map((platforms) => {
                            return(
                                <option key={platforms} value={platforms}>{platforms}</option>
                            )
                        })
                        }
                    </select>
                    {errors.platforms && <p className={style.error}>{errors.platforms}</p>}
                </div>
                <div className={style.s}>  
                    {input.platforms.map((el) => (
                        <li key={el} className={style.li}>
                            <div className={style.lista}>
                                {el + " "}
                                <button className={style.b} type="button" onClick={() => handleDeletePlatforms(el)}>x</button>
                            </div>
                        </li>
                     ) ) } 
                </div>
                <div>
                    <h6>Genres:</h6>
                    <select onChange={(e) => handleSelectGenres(e)}>
                        <option value="All">All</option>
                        {genres && 
                        genres.map((genre) =>{
                            return(
                            <option  key={genre.id} value={genre.name}>{genre.name}</option>
                        )})
                        }
                    </select>
                </div>
                <div className={style.s}>
                    {input.genres.map((el) => (
                        <li key={el} className={style.li}>
                            <div className={style.lista}>
                               {el + " "} 
                               <button className={style.b} type="button" onClick={() => handleDeleteGenres(el)}>x</button>
                            </div>
                        </li>
                    ))}
                </div>
                <div>
                    {errors.name ? null : <button className={style.create} type="submit" onSubmit={(e) => handleSubmit(e)}>Create</button>}     
                </div>
            </form>
        </div>
    )
}
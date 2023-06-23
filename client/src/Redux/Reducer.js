import { GET_ALL_VIDEOGAMES, GET_VIDEOGAME_BY_NAME, GET_DETAILS, GET_PLATFORMS, ORDER_BY_NAME, ORDER_BY_RATING, FILTER_CREATED,CREATE_VIDEOGAMES, FILTER_GENRES, 
    GET_GENRES, FILTER_PLATFORMS } from "./Actions"

const initialState = {
    allVideoGames: [],
    copyAllVideoGames: [], //==>>Copia de respaldo del estado con todos los videogames
    detail: [], //==>>Nuevo estado para usar en GET-DEATILS
    genres: [], //==>>Nuevo estado para guardar los generos
    platforms: [] //==>>Nuevo estado para guardarme las plataformas
}
//Reducer siempre va a ser una función pura, esto nos dice que siempre vamos a obtener el mismo resultado.
//Jamas debemos cargar de incertidunbre a nuestra función, es decir que nunca debe haber peticiones a un servidor en el reducer.
//Las peticones siempre las vamos a hacer en las actions.js
function rootReducer (state = initialState, action) {
    switch (action.type) {//el switch evaluara los casos(action.type)
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                allVideoGames: action.payload,
                copyAllVideoGames: action.payload
            }
        case GET_VIDEOGAME_BY_NAME:
            return {
                ...state,
                allVideoGames: action.payload
            }
        case GET_DETAILS:
            return {
                ...state,
                detail: action.payload
            }
        case ORDER_BY_NAME:
            //Aplico un ternario para analizar los dos posibles action.payload
            let arrayOrdered = action.payload === "A-Z" ?
            //Si la action.payload es "A-Z" ==>> "asc"
            //Entra en mi estado allVideoGames, hacele un sort() y ordenalos de la A-Z.
            //Caso contrario, ordenalo de la Z-A
            state.allVideoGames.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()){
                    return -1;
                }
                return 0;
            }):
            state.allVideoGames.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                allVideoGames: action.payload === "Order-Alphabetical" ? state.copyAllVideoGames : arrayOrdered
            }
        case ORDER_BY_RATING:
            // let copyStatus = [...state.copyAllVideoGames];
            // if(action.payload === "Order-Rating"){
            //     return copyStatus;
            // }
            let arrayRating = action.payload === "Men-May" ?
            state.allVideoGames.sort(function(a, b){
                if(a.rating > b.rating){// "a" es mayor a "b", entonces pone "a" detras de "b" 
                    return 1;
                }
                if(a.rating < b.rating){
                    return -1;
                }
                return 0;
            }):
            state.allVideoGames.sort(function(a, b){
                if(a.rating < b.rating){
                    return 1;
                }
                if(a.rating > b.rating){
                    return -1;
                }
                return 0;
            })
            return {
                ...state,
                allVideoGames: arrayRating//==>>> revisar para evitar un bugs cuando esta en default nos renderice un estado con todos los videogames
            }
        case FILTER_CREATED:
            const allVideoGamesCopy = state.copyAllVideoGames
            const filtered = action.payload === "Created" ?
            allVideoGamesCopy.filter(el => el.createdInDb) :
            allVideoGamesCopy.filter(el => !el.createdInDb);
            //console.log(allVideoGamesCopy);
            return{
                ...state,
                allVideoGames: action.payload === "All" ? allVideoGamesCopy : filtered 
            }
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
            }
        case FILTER_GENRES:
            //Me guardo una copia del estado con el que voy a ordenar
            const copyVideoGames = state.copyAllVideoGames
            const genresFiltered = action.payload === "All" ?
            copyVideoGames :
            copyVideoGames.filter(el => el.genres.includes(action.payload))
            return{
                ...state,
                allVideoGames: genresFiltered
            }
        case GET_PLATFORMS:
            return{
                ...state,
                platforms: action.payload
            }
        case FILTER_PLATFORMS:
            //Guardo una copia del estado en el cual voy a trabajar
            const copyAllVG = state.copyAllVideoGames
            const platformsFiltered = action.payload === "All" ?
            copyAllVG :
            copyAllVG.filter(el => el.platforms?.includes(action.payload))
            return{
                ...state,
                allVideoGames: platformsFiltered
            }
        case CREATE_VIDEOGAMES:
            //El post no hace nada, solo retorna el estado como esta, "creamos el videogames en una ruta nueva"
            return{
                ...state
            }
        default://El caso default siempre debe estar y retornar el estado inicial
            return {...state}
    }
}

export default rootReducer;
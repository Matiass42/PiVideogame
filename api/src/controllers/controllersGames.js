const axios = require("axios");
require("dotenv").config();  
const { API_KEY } = process.env
const { Videogame, Genre} = require('../db')


const getAllVideogames = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getInfoDB();
    const infoTotal = dbInfo.concat(apiInfo);
   return infoTotal;
   //return apiInfo
  }


const getname = async (name) =>{
  try {
    let response = await axios.get( `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
    const gameApi = response.data.results.map(el => {
      return {
          id: el.id,
          name: el.name,
          description: el.description,
          released: el.released,
          rating: el.rating,
          image: el.background_image,
          genres: el.genres.map(genre => genre.name).join(' '),
          platforms: el.platforms.map((el) => el.platform.name).join(' ')
      }
  })
    return gameApi
   } catch (error) {
    return ('nombre no encontrado')
  }
}

const getIdApi = async (id) => {
  try {
      const gameApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
  
      const gameData = await gameApi.data
      const Infoid = {
          id : gameData.id,
          name: gameData.name,
          image: gameData.background_image,
          genres: gameData.genres.map(e => e.name).join(', '),
          released: gameData.released,
          rating: gameData.rating,
          platforms: gameData.platforms.map((e) => e.platform.name).join(', '),
          description: gameData.description_raw,
      }
      return Infoid;
  } catch (error) {
      console.log(error);
  }
}

const getApiInfo = async () => {
    const oneHundredGames = [];
    for (let i = 1; i <= 5; i++) {
        let api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
        api.data.results.map(e => {
            oneHundredGames.push( {
                id : e.id,
                name: e.name,
                image: e.background_image,
                genres: e.genres.map(e => e.name).join(', '),
                released: e.released,
                rating: e.rating,
                platforms: e.platforms.map((e) => e.platform.name).join(', ')
            })
        })
    }
    return oneHundredGames;
  }

//  const getInfoDB = async () => {
//    const dbData = await Videogame.findAll({
//      include: {
//        model: Genre,
//        attribute: ["name"],
//        through: {
//          attributes: [],
//        },
//      },
//    });
//    return dbData;
//  };
const getInfoDB = async () => {
  try { 
      const dataInfo = await Videogame.findAll()//{
        console.log(dataInfo)
        return dataInfo
  }catch(error){
    console.log(error)
  }
//          include: [
//              {
//                  model: Genre,
//                  attributes: ["name"],
//                  through: {
//                      attributes: []
//                  }
//              }
//
 //         ] 
 //     })
 //if(dataInfo.length>0){
 //     //mapeo la info de la BD y devuelvo un array de obj
 //     const arrayInfoData = dataInfo.map(el => {
 //         //Devolvemos un objeto
 //         return {
 //             id: el.id,
 //             name: el.name,
 //             description: el.description,
 //            platforms:  el.platforms.map(e => e),
 //             image: el.image,
 //             released: el.released,
 //             rating: el.rating,
 //             genres: el.genres.map(e => e.name).join(' '),
 //             createdInDb: el.createdInDb
 //         }
 //     })
 //     console.log(arrayInfoData)
 //     return arrayInfoData;}
 //     else{
 //       return []
 //     }
 //     return dataInfo
 // } catch (error) {
 //     console.log(error);
 // }
}
  

module.exports={
    getInfoDB,
    getApiInfo,
    getAllVideogames,
    getIdApi,
    getname
}
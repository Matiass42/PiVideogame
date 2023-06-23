const { Genre } = require('../db');
const axios = require('axios');
const { API_KEY} = process.env;


const getGenres = async () => {

//busco genres de la api y los guardo en db 

    const apigenre = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
      const genres = apigenre.data.results; // recibo un array de objetos, con los juego filtrados por GENERO
      //los guardo en la DB filtrando solo el nombre
      genres.forEach(async (g) => {
        await Genre.findOrCreate({
          where: {
            name: g.name,
          },
        });
      });
      //(OPTIMIZADO) --> SOLO ENVIO AL FRONT LA INFO NECESARIA (nombre de los generos)
      const genreM = genres.map((game) => {
        return {
          id: game.id,
          name: game.name,
        };
      });
      return genreM
}

module.exports = { getGenres };
const { Router } = require('express')
const { Genre } = require('../db');
const {getGenres} = require('../controllers/controllersGenre')

const router = Router();

  router.get('/', async (req,res) =>{
    try{

  const genresDb = await Genre.findAll();
    if (genresDb.length){
        res.status(200).send(genresDb)
    }
    else{
        const genreapi = await getGenres()
        res.status(200).send(genreapi)
    }
}catch{
    res.status(400).send('No se encontro genre')
}
  })

  module.exports = router
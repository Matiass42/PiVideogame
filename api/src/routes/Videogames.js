const { Router } = require('express')
const {getAllVideogames,getInfoDB,getIdApi,getname} = require("../controllers/controllersGames");
const { Videogame, Genre } = require('../db');

const router = Router();

  router.get('/', async (req,res) =>{
       try {
        const name = req.query.name
        if(name){
        const getName = await getname(name)
      //como antes me traje TODOS de la base de datos, si entro por queries, solo filtro los que coincidan con la busqueda
      const dbname =  await getInfoDB()
      console.log(dbname)
      const filteredGamesDb = await dbname.filter((g) =>  g.name.toLowerCase().includes(name.toLowerCase()));
      //doy prioridad a la DB, y sumo todos, y corto el array en 15
    const results = [...filteredGamesDb, ...getName.splice(0, 15)];
    //const results = getName
    //  console.log(results)
      res.status(200).send(results)
        }
        else{
          let videogamesTotal = await getAllVideogames();
         // return videogamesTotal
          res.status(200).send(videogamesTotal)
        }
       }
        catch{
             res.status(400).send('el nombre que busca no fue encontrado') 
        }
  })
  

  router.get('/:id', async (req,res) =>{
    const id = req.params.id;
    if (!id) {
      res.status(404).send('No se encontro id')
    }
    else{
      const gamedb= await getInfoDB()
      const iddb= gamedb.filter((el) => el.id === id)
      const apiID= await getIdApi(id)
      console.log(iddb)
      if(apiID.length>0){
        res.status(200).send(iddb)
      }
      else{
        res.status(200).send(apiID)
      }

    }

  })


  router.post('/', async (req,res) =>{
    console.log("RUTA PARA CREAR UN VIDEOGAME");
    try {
        const {name, description, released, rating, platforms, genres, image } = req.body;
        console.log(req.body)
        //Valido si me llega info obligatoria
       // if(!name || !description || !platforms){
       //     res.status(400).send("Faltan enviar datos obligatorios")
       // }
        //Tambien validamos en caso sensitive
      //  const videoGameAll = await  getAllVideogames();
      //  //console.log(videGameAll);
      //  const gameFound = videoGameAll.find(
      //      (el) => el.name.toLowerCase() === name.toLowerCase()
      //  )
      //  //console.log(gameFound)
      //  if(gameFound === undefined){
            const newVideoGame = await Videogame.create({
              
                name:name,
                description:description,
                released:released,
                rating:rating,
                image:image,
                platforms:platforms,
                genres:genres
              
            })
            //console.log(newVideoGame);
            //El genero se lo pasamos aparte para armar las relaciones
       //     const genreDB = await Genre.findAll({
       //         where: {
       //             name: genres
       //         }
       //     })
       //     //console.log(genreDB)
       //     newVideoGame.addGenres(genreDB)
       //     console.log(newVideoGame)

            res.status(200).send(newVideoGame)
      //  }else{
      //      res.status(200).send("El nombre del videogame ya existe")
      //  }
    } catch (error) {
        console.log(error)
    }
})


router.get('/db', async (req,res) =>{
  const dbinfo = await getInfoDB()
  res.status(200).send(dbinfo)

})


  module.exports = router;
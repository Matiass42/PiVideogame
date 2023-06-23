const { Router } = require('express');
const videogames = require('./Videogames')
const Genres = require('./Genre') 
const platformsRouter = require('./plataform')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames",videogames)
router.use("/genres",Genres)
router.use('/platforms', platformsRouter);


module.exports = router;
  
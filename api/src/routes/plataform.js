const { Router } = require('express')
const {getApiInfo} = require("../controllers/controllersGames");

const router = Router();
router.get('/', async (req,res) =>{
    try {
        const allInfo = await getApiInfo();
        const containerPlatforms = allInfo.map(el => el.platforms);
        //console.log(containerPlatforms);// ==>> un array con string['.. ..', '... .. ..', '...'];
        
        const containerPlatformsJoin = containerPlatforms.join();
        //console.log(containerPlatformsJoin);//==>>Aqui tengo un string con todos las plataformas "...., ...., ..., ...";

        const containerPlatformsArray = containerPlatformsJoin.split(',')
        //console.log(containerPlatformsArray);//==>> aplico un split(',') para otorgarle su propio indice a mi array de plataformas
        
        //Elimino los espacios vacios
        const containerPlatformsArrayPerfecto = containerPlatformsArray.map(el => el.trim());
        //Elimino los repetidos para obtener todas las plataformas existente 
        const uniquePlatforms = [];
        containerPlatformsArrayPerfecto.forEach(el => {
            if(!uniquePlatforms.includes(el)){
                uniquePlatforms.push(el)
            }
        })
        res.status(200).json(uniquePlatforms) 
        // const allPlatforms = containerPlatforms.map(el => el.map(platform => {
        //     if(!allPlatforms.includes(platform)){
        //         allPlatforms.push(platform)
        //     }
        // }))
    } catch (error) {
        res.status(400).send("Fallo la eliminación de los repetidos")
    }
})
module.exports = router
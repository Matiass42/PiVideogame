const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID, // UUID es un tipo de dato que genera un id unico
      defaultValue: DataTypes.UUIDV4, // UUIDV4 es un tipo de dato que genera un id unico
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false // es para 
    }, 
    releaseDate: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER // integer es 
    },
    
  }, {timestamps: true, // timestamps es para que se cree la fecha de creacion y la fecha de actualizacion
      createdAt: 'creado', // createdAt es para que se cree la fecha de creacion
      updatedAt: false // updatedAt es para que se cree la fecha de actualizacion
  });
  
};
//Videogame.drop()

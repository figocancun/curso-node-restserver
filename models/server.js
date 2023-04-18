const express = require('express')
const cors = require('cors');
const { dbconnection } = require('../db/config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';
    
    //conectar a BD
    this.conectarDB();
    
    //middlewares
    this.middlewares();

    //rutas de mi aplicacion
    this.routes();
  }
 
  async conectarDB(){
    await dbconnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    // lectura y parseo del body
    this.app.use(express.json());
    
    //directorio publico
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }

}

module.exports = Server;
'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const { Connection } = require('./configs/db');
const router = require('./routes/routes');
const swaggerUi = require('swagger-ui-express'); 
const swaggerDocument = require('../swagger.json'); 

require('dotenv').config();

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3030;

const onConnect = () => {
  return new Promise((resolve, reject)=> {
    const { connection } = new Connection();
    connection.authenticate()
      .then( () => resolve('CONECTADO A DB') )
      .catch( (error) => reject(`Error ${error}`) );
  });
}

onConnect()
  .then(async () => {
    app.use(cors());
    app.use(express.json());
    app.use('/', router);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 
    app.listen(port, host, ()=> console.log(`Server Online port ${host}:${port}`));
}).catch( (err)=> console.log(err) );



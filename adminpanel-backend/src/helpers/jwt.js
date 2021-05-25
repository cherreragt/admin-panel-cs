'use strict';

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (uid) =>{
  return new Promise((resolve, reject)=>{
    const payload = {
      uid
    };
    
    jwt.sign(payload, process.env.JWTSECRET, {
      expiresIn: '24h'
    }, (err, token)=>{
      if(err){
          reject(err);
          return;
      }
      resolve(token);
    });
  });
}

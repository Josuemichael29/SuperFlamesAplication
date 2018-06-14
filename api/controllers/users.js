const con = require('../../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


exports.users_signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if(err){
      return res.status(500).json({
        error: err
      });
    }else {
      const user = {
        email: req.body.email,
        password: hash
      };
      var queryEmail = con.query("SELECT * FROM users WHERE email = ?", [user.email], function(error, result){
        if(error){
          throw error;
        }else if (!req.body.email || !user.password) {
          return res.status(422).json({
            message: "Faltan campos."
          });
        }else if (!re.test(user.email)) {
          return res.status(422).json({
            message: "El email debe de seguir el siguiente patron: correo@dominio.com"
          });
        }else if (result == '') {
          var query = con.query("INSERT INTO users(email,password) VALUES(?,?)",[user.email, user.password], function(error, result){
            if(error){
              throw error;
            }else{
              res.status(201).json({
                message: "Se registró correctamente."
              });
            }
          });
        }else{
          res.status(422).json({
            message: "El email que ingresó ya está registrado."
          });
        }
      })
    }
  });
}

exports.users_login = (req, res, next) => {
  const user = {
    user: req.body.user,
    passowrd: req.body.password
  };
  var query = con.query("SELECT * FROM users WHERE email = ?",[user.user], function(error, result) {
    if(error){
      throw error;
    }else if (result == "") {
      res.status(420).json({
        message: "Usuario no registrado."
      });
    }else{
      bcrypt.compare(req.body.password, result[0].password, function(err, resu) {
        if(err){
          return res.status(401).json({
            message: 'Auth failed',
            error: err
          });
        }
        if(resu){
          const token = jwt.sign({
            email: result[0].email,
            id: result[0].id
          }, "secret", {
            expiresIn: "1h"
          }
        );
          res.status(200).json({
            message: "Auth Successful",
            token: token
          });
        }else{
          res.status(200).json({
            message: "Auth failed"
          });
        }
      });
    }
  });
}

const con = require('../../db');

exports.orders_get_all = (req, res, next) => {
  var query = con.query('SELECT * FROM product',[], function(error, result){
    if(error){
      throw error;
    }else{
      res.status(200).json({
        message: 'Sin errores',
        datos: result
      });
    }
  }
);
}

exports.orders_post = (req, res, next) => {
  const order = {
    quantity: req.body.quantity
  }
  if (!order.quantity) {
    res.status(400).json({
      message: 'Faltan parametros o son incorrectos',
    });
  }else if(!Number.isInteger(order.quantity)){
    res.status(400).json({
      message: 'Quantity debe de ser entero y sin comillas.',
    });
  }else{
    var query = con.query("INSERT INTO oder(quantity) VALUES(?)",[order.quantity],function(error, result){
      if(error){
        throw error;
      }else{
        res.status(201).json({
          message: 'Orden creada.',
        });
      }
    });
  }
}

exports.orders_get = (req, res, next) => {
  const id = req.params.orderId;
  var query = con.query("SELECT * FROM oder WHERE id = ?", [id], function(error, result){
    if(error){
      throw error;
    }else if (result == '') {
      res.status(400).json({
        message: 'No existe esta orden',
      });
    }else{
      res.status(200).json({
        orden: result
      });
    }
  })
}

exports.orders_patch = (req, res, next) => {
  const id = req.params.orderId;
  const order = {
    quantity: req.body.quantity
  };
  if(!order.quantity){
    res.status(400).json({
      message: 'Faltan parametros.'
    });
  }else if(!Number.isInteger(order.quantity)){
    res.status(400).json({
      message: 'Revise que quantity sea entero y sin comillas.'
    });
  }else{
    var query = con.query("UPDATE oder SET quantity = ? WHERE id= ?", [order.quantity, id], function(error, result) {
      if(error){
        throw error;
      }else{
        res.status(200).json({
          message: 'Orden actualizada.'
        });
      }
    })
  }
}

exports.orders_delete = (req, res, next) => {
  const id = req.params.orderId;
  var query = con.query("SELECT * FROM oder WHERE id = ?", [id], function(error, result){
    if(error){
      throw error;
    }else if(result == ''){
      res.status(400).json({
        message: 'No existe una orden con ese ID.',
      });
    }else{
      var query = con.query("DELETE FROM oder WHERE id = ?", [id], function(error, result){
        if(error){
          throw error;
        }else{
          res.status(200).json({
            message: 'Orden eliminada',
            orderId: req.params.orderId
          });
        }
      });
    }
  });
}

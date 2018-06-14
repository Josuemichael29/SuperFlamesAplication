const con = require('../../db');

exports.products_get_all = (req, res, next) => {
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

exports.products_post = (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  };
  if (!product.name || !product.price) {
    res.status(400).json({
      message: 'Faltan parametros o son incorrectos',
    });
  }else if(!Number.isInteger(product.price)){
    res.status(400).json({
      message: 'Price debe de ser entero y sin comillas.',
    });
  } else{
    var query = con.query('INSERT INTO product(name, price) VALUES(?, ?)', [product.name, product.price], function(error, result){
      if(error){
        throw error;
      }else{
        res.status(201).json({
          message: 'Producto creado correctamente.',
          id: result.insertId,
          name: product.name,
          price: product.price,
        });
      }
    }
  );
}
}

exports.products_get = (req, res, next) => {
  const id = req.params.productId;
  var query = con.query('SELECT * FROM product WHERE id = ?',[id], function(error, result){
    if(error){
      throw error;
    }else if (result == '') {
      res.status(200).json({
        message: 'No existe este ID',
      });
    }else{
      res.status(200).json({
        datos: result
      });
    }
  }
);
}

exports.products_patch = (req, res, next) => {
  const id = req.params.productId;
  const product = {
    name: req.body.name,
    price: req.body.price
  };
  if (!product.name || !product.price) {
    res.status(400).json({
      message: 'Faltan parametros o son incorrectos.',
    });
  }else if(!Number.isInteger(product.price)){
    res.status(400).json({
      message: 'Price debe de ser entero y sin comillas.',
    });
  }else{
    var query = con.query('UPDATE product SET name=?, price=? WHERE id = ?',[product.name, product.price, req.params.productId], function(error, result){
      if(error){
        throw error;
      }else{
        res.status(200).json({
          message: 'Producto actualizado',
          id: id,
          product: product
        });
      }
    }
  );
}
}

exports.products_delete = (req, res, next) => {
  const id = req.params.productId;
  var query = con.query('DELETE FROM product WHERE id = ?',[id], function(error, result){
    if(error){
      throw error;
    }else if (result.affectedRows == 0) {
      res.status(200).json({
        message: 'No existe un producto con ese ID.',
      });
    }else{
      res.status(200).json({
        message: 'Producto eliminado correctamente.',
      });
    }
  });
}

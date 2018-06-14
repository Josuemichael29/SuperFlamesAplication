var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "nodejs"
});

con.connect(function(err) {
  if(err) throw err;
  console.log("Conexión con API exitosa.");
})

module.exports = con;

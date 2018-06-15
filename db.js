var mysql = require('mysql');

var con = mysql.createConnection({
  host: "sql3.freesqldatabase.com",
  user: "sql3243091",
  password: "YJ3JKPBgUU",
  database: "sql3243091"
});

con.connect(function(err) {
  if(err) throw err;
  console.log("Conexión con API exitosa.");
})

module.exports = con;

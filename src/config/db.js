const mysql = require("mysql2/promise");

const connPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "gestion_recette",
  waitForConnections: true,
  connectionLimit: 2,
  connectTimeout: false,
  port: 3308,                                                         
});

connPool.getConnection().then(() => {
  // console.log("CONNECTED");
});
module.exports = connPool;

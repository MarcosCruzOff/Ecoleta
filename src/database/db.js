//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar objeto do banco de dados
const db = new sqlite3.Database("./src/database/database.db")

//inicializa o banco de dados
// db.serialize( () => {
//   //criando uma tabela
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places(
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       image    TEXT,
//       name     TEXT,
//       address  TEXT,
//       address2 TEXT,
//       state    TEXT,
//       city     TEXT,
//       items    TEXT
//     );`
//   )
//   //inseri dados na tabela
//   const query = `
//     INSERT INTO places(
//       image,
//       name,
//       address,
//       address2,
//       state,
//       city,
//       items
//     ) VALUES(?,?,?,?,?,?,?);
//   `

//   const values = [
//     "http://localhost:3000/icons/aulinha.svg",
//     "Colectoria",
//     "Guilherme Gemballa, Jardim América",
//     "Número 260",
//     "Santa Catarina",
//     "Rios do Sul",
//     "Resíduos Eletrônicos, Lãmpadas"
//   ]

//   function afterInsertData(err) {
//     if (err) {

//       return console.log(err)

//     }

//     console.log("Cadastrado com sucesso")
//     console.log(this)

//   }

//  // db.run(query, values, afterInsertData)

//   //consulta os dados da tabela
//   db.all(`SELECT * FROM places`, function(err, rows) {
//     if (err) {

//       return console.log(err)

//     }

//     console.log("Aqui estão seus registros:")
//     console.log(rows)
//   })

//   //deleta os dados da tabela
//   db.run(`DELETE FROM places WHERE id = ?`, [5], function(err){
//     if(err){

//       return console.log(err)

//     }

//     console.log("Registro Deletado")

//   })
  
//  })

module.exports = db
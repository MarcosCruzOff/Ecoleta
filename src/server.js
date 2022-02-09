//Inicia o Servidor
const express = require("express")
const server  = express()

//Inicia o Banco de dados
const db = require ("./database/db")

//Configura pasta 'public'
server.use(express.static("public"))

//habilita o uso do req.body na aplicação
server.use(express.urlencoded({ extended:true }))

//inicializando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
  express: server,
  noCache: true
})

//Configurando a rota da página "index.html"
server.get("/", (req, res) =>{
  return res.render("index.html")
})

//Configurando a rota da página "create-point.html"
server.get("/create-point", (req, res) =>{
  
  return res.render("create-point.html")

})

//Configurando a rota do cadastro com SUCESSO
server.post("/savepoint", (req, res) => {
//inseri dados na tabela
  const query = `
    INSERT INTO places(
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES(?,?,?,?,?,?,?);
  `

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if (err) {

      return console.log(err)

    }

    console.log("Cadastrado com sucesso")
    console.log(this)

    return res.render("create-point.html",  { saved:true })

  }

  db.run(query, values, afterInsertData)

  
})

//Configurando a rota da página "search-point.html"
server.get("/search-point", (req, res) =>{

  const search = req.query.search

  if (search == "") {
    //pesquisa vazia
    return res.render("search-point.html", { total:0 })
  }

  //consulta os dados da tabela onde a busca é feita pela cidade
  db.all(`SELECT * FROM places WHERE  city LIKE '%${search}%'`, function(err, rows) {
    if (err) {

      return console.log(err)

    }

    const total = rows.length
    console.log("Aqui estão seus registros:")
    console.log(rows)

    //mostra a página html com o banco de dados
    return res.render("search-point.html", { places: rows, total })
  })  

})

//Localhost:3000
server.listen(3000)
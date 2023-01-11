const express = require("express")
//const cliente = require("../code/controllers/clientController")
const path = require("path")
const clientes = require("../code/models/clientModel")
const app = express()

//app.use(express.json)
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, "public")))

app.get("/home", (req,res) =>{
    res.render('home')
})
app.get("/login", (req,res) =>{
    res.render('login')
})
app.get("/cadastro", (req,res) =>{
    res.render('cadastro')
})
app.get("/userdashbord", (req, res) =>{ 
    res.render("clientDashbord")
})
app.get("/cliente", (req, res) =>{
    res.send(clientes.list_clients())
})

app.post("/cadpost", (req, res) =>{
    const data = req.body
    clientes.create_client(data)
    res.send('<script>alert("cadastrado com sucesso")</script>')   
})

app.get('/', (req, res) =>{
    return res.send("<h1>Teste</h1>")
})

app.listen(3000, ()=> {
    console.log("ta prestando")
})
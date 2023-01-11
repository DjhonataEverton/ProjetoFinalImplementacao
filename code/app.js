const express = require("express")
const clienteRoutes = require("./routes/clientRoutes")
const path = require("path")
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, "public")))

app.use('/cliente', clienteRoutes)

app.get('/', (req, res) => {
    return res.send("<h1>Teste</h1>")
})

app.listen(3000, () => {
    console.log("ta prestando")
})
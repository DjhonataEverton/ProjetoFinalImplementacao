const express = require("express")
const clientesRoutes = require("./routes/clientRoutes")
const produtosRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const comissionaireRoutes = require("./routes/comissionaireRoutes")
const path = require("path")
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, "public")))

app.use('/clientes', clientesRoutes)
app.use('/produtos', produtosRoutes)
app.use('/orders', orderRoutes)
app.use('/comissionaires', comissionaireRoutes)

app.get('/', (req, res) => {
    return res.send("<h1>Teste</h1>")
})

app.listen(3000, () => {
    console.log("ta prestando")
})
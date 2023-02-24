// TODO: adicionar BCrypt

const express = require("express")
const clientesRoutes = require("./routes/clientRoutes")
const produtosRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const comissionaireRoutes = require("./routes/comissionaireRoutes")
const path = require("path")
const app = express()
const expressSession = require('express-session')
const { PrismaSessionStore } = require('@quixo3/prisma-session-store')
const { PrismaClient } = require('@prisma/client');

app.use(
    expressSession({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
        },
        secret: 'a santa at nasa',
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(
            new PrismaClient(),
            {
                checkPeriod: 2 * 60 * 1000,  //ms
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined,
            }
        )
    })
);

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))

app.use('/clientes', clientesRoutes)
app.use('/produtos', produtosRoutes)
app.use('/orders', orderRoutes)
app.use('/comissionaires', comissionaireRoutes)

app.get('/', (req, res) => {
    return res.render('home', { clientCpf: req.session.clientCpf })
})

app.listen(3000, () => {
    console.log(`Servidor iniciado em http://localhost:3000`)
})

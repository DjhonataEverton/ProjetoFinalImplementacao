// TODO: adicionar BCrypt
const express = require("express")
const path = require("path")
const app = express()
const cookieParser = require('cookie-parser')
const nocache = require('nocache')

// Rotas
const clientesRoutes = require("./routes/clientRoutes")
const produtosRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const comissionaireRoutes = require("./routes/comissionaireRoutes")

// Pacotes de Sessão
const expressSession = require('express-session')
const { PrismaSessionStore } = require('@quixo3/prisma-session-store')
const { PrismaClient } = require('@prisma/client');
const flash = require('express-flash')

// Configurações
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

app.use(cookieParser())
app.use(flash())
app.use(nocache())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash())

// Rotas
app.use('/clientes', clientesRoutes)
app.use('/produtos', produtosRoutes)
app.use('/orders', orderRoutes)
app.use('/comissionaires', comissionaireRoutes)

app.get('/404', (req, res) => {
    return res.render('404')
})

app.get('/', (req, res) => {
    const messages = req.flash('info');
    return res.render('home', { clientCpf: req.session.clientCpf, comissionaireId: req.session.comissionaireId, messages: messages })
})

app.listen(3000, () => {
    console.log(`Servidor iniciado em http://localhost:3000`)
})

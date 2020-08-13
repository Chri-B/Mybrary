if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs') // definisco quale linguaggio utilizzato
app.set('views', __dirname + '/views') // definisco dove trovare le views
app.set('layout', 'layouts/layout') // definisco dove saranno i miei layouts
app.use(expressLayouts) // definisco l'utilizzo di express-ejs-layouts
app.use(express.static('public')) // definisco la cartella public dove ci saranno i file css, js ecc.

// setup di mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { // imposto questa variabile tramite .env
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error)) // alla connessione errata stampo in console l'errore
db.once('open', () => console.log('Connected to Mongoose')) // stampo connessione al DB

app.use('/', indexRouter) // dico all'app di usare l'index router

app.listen(process.env.PORT || 3000) // definisco la porta del server (3000: è quella per lo sviluppo), l'altra invece è per la pubblicazione quando verrà hostata
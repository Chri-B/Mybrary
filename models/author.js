// il model comunica con MongoDB
const mongoose = require('mongoose')

// creo uno schema (equivalente di una tabella in SQL)
const authorSchema = new mongoose.Schema({
    // definisco i campi dello schema
    name: {
        type: String, // tipo
        required: true // required è booleano
    }
})

// esporto il model: definisco il nome (che equivale al nome della mia tabella nel DB) e lo schema corrispondente
module.exports = mongoose.model('Author', authorSchema)
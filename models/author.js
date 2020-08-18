// il model comunica con MongoDB
const mongoose = require('mongoose')
const Book = require('./book')

// creo uno schema (equivalente di una tabella in SQL)
const authorSchema = new mongoose.Schema({
    // definisco i campi dello schema
    name: {
        type: String, // tipo
        required: true // required è booleano
    }
})

// Funzione che permette di eseguire una funzione prima di "remove": così evito di eliminare authors che hanno dei books collegati
authorSchema.pre('remove', function(next) { // questa funzione usa un next
    Book.find({ author: this.id }, (err, books) => { // cerco se l'author ha dei books:
        if (err) { // se c'è un errore, funzione next with err: il remove non viene eseguito
            next(err)
        } else if (books.length > 0) { // se books.length > 0 => esistono books linkati all' author => next con errore e messaggio: il remove non viene eseguito
            next(new Error('This Author has books still'))
        } else { // se invece non ci sono errori: funzione next vuota => viene eseguito il remove
            next()
        }
    })
})

// esporto il model: definisco il nome (che equivale al nome della mia tabella nel DB) e lo schema corrispondente
module.exports = mongoose.model('Author', authorSchema)
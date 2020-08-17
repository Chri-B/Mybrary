// il model comunica con MongoDB
const mongoose = require('mongoose')
const path = require('path')

const coverImageBasePath = 'uploads/bookCovers'

// creo uno schema (equivalente di una tabella in SQL)
const bookSchema = new mongoose.Schema({
    // definisco i campi dello schema
    title: {
        type: String, // tipo
        required: true // required è booleano
    },
    description: {
        type: String
    },
    publishDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author' // specifico a cosa si deve riferire mongoose => Author deve corrispondere con 'Author' del model author.js
    }
})

bookSchema.virtual('coverImagePath').get(function(){
  if(this.coverImageName) {
    return path.join('/', coverImageBasePath, this.coverImageName) // creo il path completo della cover img
  }
})

// esporto il model: definisco il nome (che equivale al nome della mia tabella nel DB) e lo schema corrispondente
module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath
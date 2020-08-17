const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All Authors Route
router.get('/', async (req, res) => {
    // creo una variabile con le opzioni di ricerca
    let searchOptions = {}
    // la ricerca avviene nell'url: se c'è una richiesta query, riempio la variabile
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i') // istanza per ricerca, non case sensitive
    }
    try {
        const authors = await Author.find(searchOptions) // author.find a cui passo un empty object = no condizioni => trova tutti i riferimenti
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch (error) {
        res.redirect('/')
    }
})

// New Authors Route
router.get('/new', (req, res) => {
    res.render('authors/new', { // posso passare come variabile un oggetto corrispondente al model creato ( creo una istanza di Author )
        author: new Author()
    })
})

// Create Author Route
// utilizzo async per rendere codice più pulito
router.post('/', async (req, res) => { // post per creare nuovo autore
    // creo una nuova istanza di Author
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save() // viene atteso il salvataggio su mongoose (che avviene in modo asincrono) e solo dopo viene popolata la newAuthor
        // res.redirect('authors/${newAuthor.id}')
        res.redirect('authors')
    } catch (error) {
        // se c'è un errore reindirizzo indietro e ripopolo i campi con i valori inseriti, e mostro un error Message
        let locals = {
            errorMessage: 'Error creating Author'
        }
        res.render('authors/new', {
            author: author,
            locals
        })
    }
})

module.exports = router
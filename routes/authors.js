const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All Authors Route
router.get('/', (req, res) => {
    res.render('authors/index')
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
        const newAuthor = await author.save() // viene atteso il salvataggio e solo dopo viene popolata la newAuthor
        // res.redirect('authors/${newAuthor.id}')
        res.redirect('authors')
    } catch (error) {
        let locals = {
            errorMessage: 'Error creating Author'
        }
        res.render('authors/new', {
            author: author,
            locals
        })
    }
    // // salvo l'istanza creata tramite callback f. save
    // author.save((err, newAuthor) => {
    //     let locals = {
    //         errorMessage: 'Error creating Author'
    //     }
    //     // se c'è un errore reindirizzo indietro e ripopolo i campi con i valori inseriti, e mostro un error Message
    //     if (err) {

    //         res.render('authors/new', {
    //             author: author,
    //             locals
    //         })
    //     } else {
    //         // res.redirect('authors/${newAuthor.id}')
    //         res.redirect('authors')
    //     }
    // })
    // res.send(req.body.name) // send: invio al server. Tramite body-parser prendo il valore inserito nell'input
})

module.exports = router
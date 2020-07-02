const express = require('express')
const router = express.Router()

const Coaster = require('../models/coaster.model')
const Park = require('../models/park.model')

// Aquí los endpoints

//CREATE
//4
router.get('/new-park', (req, res)=> res.render('parks/new-park'))

//5 y 6
router.post('/new-park', (req, res) =>{

    const {name, description, active} = req.body
    if (name.length > 0 && description.length > 0){
        Park
            .create({name, description, active})
            .then(() => res.redirect('/'))
            .catch(err => console.log("Error en la BBDD", err))
    }
    else{
        res.render('parks/new-park', {errorMsg: 'Por favor, rellena adecuadamente los campos'})
    }
})

//BONUS

//listado
router.get('/', (req, res) => {
    
    Park
        .find()
        .then(parksArr => res.render('parks/park-index', {parksArr}))
        .catch(err => console.log("Error en la BBDD", err))
    
})

//Eliminar


router.get('/delete/:id', (req, res)=> {

    Park
        .findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/park'))
        .catch(err => console.log("Error en la BBDD", err))
})


//edit
router.get('/edit/:id', (req, res) => {

    Park
        .findById(req.params.id)
        .then(park => res.render('parks/park-edit', {park}))
        .catch(err => console.log("Error en la BBDD", err))
    

})

router.post('/edit/:id', (req, res) => {

    const {name, description, active} = req.body

    if (name.length > 0 && description.length > 0){
    Park
        .findByIdAndUpdate(req.params.id, {name, description, active})
        .then(() => res.redirect(`/park`))
        .catch(err => console.log("Error en la BBDD", err))

    }
    else {

        Park
            .findById(req.params.id)
            .then(park => res.render('parks/park-edit', {park: park, errorMsg: 'Por favor, rellena adecuadamente los campos'}))
            .catch(err => console.log("Error en la BBDD", err))

    }

})

//detalles

router.get('/:id', (req, res) =>{

    Park
        .findById(req.params.id)
        .then(park => res.render('parks/park-details',park))
        .catch(err => console.log("Error en la BBDD", err))
})
module.exports = router
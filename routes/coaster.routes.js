const express = require('express')
const router = express.Router()

const Coaster = require('../models/coaster.model')
const Park = require('../models/park.model')

// Aquí los endpoints

//7
router.get('/new-coaster', (req, res)=> {

    //8
    Park
        .find()
        .then(parksArray => res.render('coasters/new-coaster', {parksArray}) )
        .catch(err => console.log("Error en la BBDD", err))

})

//9 y 10
router.post('/new-coaster', (req, res) =>{

    const {name, description, inversions, length, active, park} = req.body
    console.log(name.length)
    console.log(description.length)
    console.log(inversions.length ==0)

    console.log(length.length)

    console.log( park.length)


    if (name.length > 0 && description.length > 0 && inversions.length >0  && length.length >0 && park.length >0 && park != 'Seleccionar'){
        Coaster
        .create({name, description, inversions, length, active, park})
        .then(() => res.redirect ('/'))
        .catch(err => console.log("Error en la BBDD", err))

    }
    else{
        res.render('coasters/new-coaster', {errorMsg: 'Por favor, rellena adecuadamente los campos'})
    }



})

router.get('/delete', (req, res)=> {
    console.log(req.query.id)
    Coaster
        .findByIdAndDelete(req.query.id)
        .populate('park')
        .then(() => res.redirect('/coaster'))
        .catch(err => console.log("Error en la BBDD", err))
})



//16 y 17
router.get('/edit', (req, res) => {

    const park = Park
                    .find()
                    .then(parksArray => {
                        return parksArray} )
                    .catch(err => console.log("Error en la BBDD", err))

    Coaster
        .findById(req.query.id)
        .populate('park')
        .then(coaster => {
            console.log(park)
            return park.then(park => res.render('coasters/coaster-edit', {coaster: coaster, park: park}))})
        .catch(err => console.log("Error en la BBDD", err))

})


router.post('/edit', (req, res) => {

    const {name, description, inversions, length, active, park} = req.body

    if (name.length > 0 && description.length > 0 && inversions.length >0  && length.length >0 && park.length >0 && park != 'Seleccionar'){

        Coaster
            .findByIdAndUpdate(req.query.id, {name, description, inversions, length, active, park})
            .populate('park')
            .then(() => res.redirect(`/coaster`))
            .catch(err => console.log("Error en la BBDD", err))
    }
    else{

        const park = Park
                    .find()
                    .then(parksArray => {
                        return parksArray} )
                    .catch(err => console.log("Error en la BBDD", err))

        Coaster
            .findById(req.query.id)
            .populate('park')
            .then(coaster => park.then(park => res.render('coasters/coaster-edit', {errorMsg: 'Por favor, rellena adecuadamente los campos', coaster: coaster, park: park})))
            .catch(err => console.log("Error en la BBDD", err))

    }

})

//11
router.get('/', (req, res) => {
    Coaster 
        .find()
        .populate('park')
        .then(coasterArr => res.render(('coasters/coasters-index'), {coasterArr}))
        .catch(err => console.log("Error en la BBDD", err))

})


//12 , 13 y 14 

router.get('/:id', (req, res) => {

    Coaster
        .findById(req.params.id)
        .populate('park')
        .then(coaster => res.render('coasters/coaster-details', coaster))
        .catch(err => console.log("Error en la BBDD", err))

})

//15





module.exports = router
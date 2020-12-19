import express from 'express'
const router = express.Router()

import User from '../models/user.js'

const {verificarAuth, verificarAdministrador } = require('../middlewares/autenticacion')

// hash Password
const bcrypt = require('bcrypt')
const saltRounds = 10

//Filter fields on PUT
const _ = require('underscore')

// Importar el modelo User

// POST User
router.post('/new-user', async (req, res) => {
  // const body = req.body
  const body = {
    nombre: req.body.nombre,
    email: req.body.email,
    role: req.body.role
  }
  
  body.pass = bcrypt.hashSync(req.body.pass, saltRounds)

  try {
    const usuarioDB = await User.create(body)
    res.json(usuarioDB)
    
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Something was wrong',
      error
    })
  }
})

// PUT User (Actualizar usuario)
router.put('/user/:id', [verificarAuth, verificarAdministrador], async(req, res) => { 
  const _id = req.params.id
  /*
  con 'underscore' limitamos los campos que el usuario puede modificar
  '_.pick()'
  */
  const body = _.pick(req.body, ['nombre', 'email', 'pass', 'activo'])
  if (body.pass) {
    body.pass = bcrypt.hashSync(req.body.pass, saltRounds)
  }
  try {
    /*
      En esta parte: {new: true} es necesaria, de lo contrario nos devolveria
      el usuario sin actualizar
      En esta parte: {runValidators: true} es para que valide los roles
    */
    const usuarioDB = await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true })
    return res.json(usuarioDB)
    
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Something was wrong',
      error
    })
  }

})

module.exports = router
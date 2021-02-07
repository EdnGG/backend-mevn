import express from 'express'
const router = express.Router()

const jwt = require('jsonwebtoken')

// Importar el modelo User
import User from '../models/user.js'

const {verificarAuth, verificarAdministrador } = require('../middlewares/autenticacion')

// hash Password
const bcrypt = require('bcrypt')
const saltRounds = 10

//Filtering fields on http-PUT
const _ = require('underscore')

// POST User
router.post('/signup' ,async (req, res) => {

console.log(req.files)

  console.log(req.body.image)
  const body = {
    nombre: req.body.nombre,
    email: req.body.email,
    role: req.body.role,
    image: req.body.image
  }
  console.log(body)
  // Encriptando el password
  body.pass = bcrypt.hashSync(req.body.pass, saltRounds)

  try {
    let archivo = req.files.archivo
    console.log('archivo' ,archivo)
  // separara el nombre del archivo en cuanto encuentre un punto '.'
  let nombreArchivoCortado = archivo.name.split('.')
  // Obtenemos la ultima posicion del arreglo
  let extension = nombreArchivoCortado[nombreArchivoCortado.length -1]
  
  let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg']

  // Valida si "extension" esta en alguna posicion index del areglo 'extencionesValidas'
  if (extensionesValidas.indexOf(extension) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        
        message: 'Allowed extensions are: ' + extensionesValidas.join(', '),
        ext: extension
      }
    })

  }
  archivo.mv(`upload/archivo-${new Date().getMilliseconds()}.${extension}`, (err) => {
   if (err) {
      return res.status(500).json({
        ok: false,
        err
        // console.log(err)
       
      })
    }
      return res.json({
        ok: true,
        message: 'Image was sucessfully uploaded'
      
      })
  })

  // Guardando el usuario en MongoDB
    const usuarioDB = await User.create(body)
    /* Aqui genero el token porque pienso que para poder arreglar el error de
    navigation guard que me da vue lo podria solucionar*/
    // Generar token
    const token = jwt.sign({
      data: usuarioDB
    }, 'secret', {expiresIn: 60 * 60})

    res.json({
      usuarioDB,
      token
    })
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
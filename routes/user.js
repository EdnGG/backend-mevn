import express from 'express'
const router = express.Router()

import fileUpload from 'express-fileupload'
const jwt = require('jsonwebtoken')

// Importar el modelo User
import User from '../models/user.js'

const {verificarAuth, verificarAdministrador } = require('../middlewares/autenticacion')

// hash Password
const bcrypt = require('bcrypt')
const saltRounds = 10
//Filtering fields on http-PUT
const _ = require('underscore')

router.use(fileUpload({useTempFiles: true}))

// POST User (Create new user)
router.post('/signup', async (req, res) => {

 try {
  const body = {
    nombre: req.body.nombre,
    email: req.body.email,
    role: req.body.role,
    pass: req.body.pass
  }
  // Encriptando el password
  body.pass = bcrypt.hashSync(req.body.pass, saltRounds)
 
  // Guardando el usuario en MongoDB
    const usuarioDB = await User.create(body)
    console.log('guardando info de usuario en objeto usuario DB' ,usuarioDB)
    
    // Generar token
    const token = jwt.sign({
      data: usuarioDB
    }, 'secret', { expiresIn: 60 * 60 })
   
/*************************** */
  console.log('dentro de req.files',req.files)
  let imagen = req.files.image
  console.log('contenido de imagen ',imagen)
  let nombreArchivoCortado = imagen.name.split('.')
  let extension = nombreArchivoCortado[nombreArchivoCortado.length -1]
  let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg']
    
  if (extensionesValidas.indexOf(extension) < 0) {
    return res.status(500).json({
      ok: false,
      err: {
        message: 'Allowed extensions are: ' + extensionesValidas.join(', '),
        ext: extension
      }
    })
  }
    
  imagen.mv(`upload/archivo-${new Date().getMilliseconds()}.${extension}`, (err) => {
    if (err) {
    //  console.log('Error en el metodo mv ' ,err)
      return res.status(500).json({
        ok: false,
        message: 'Error tratando de subir imagen',
        err       
      })
    }
      return res.json({
        ok: true,
        message: 'Image was sucessfully uploaded'
      })
  })

/************************** */


    res.json({
      usuarioDB,
      token
    })


  } catch (error) {
    // Error al subir la imagen y creacion de usuario
    // console.log('usuario DB' ,usuarioDB)
    console.log('Usuario no se pudo crear ', error.message)
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
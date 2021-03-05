import express from 'express'
const router = express.Router()

// CLOUDINARY
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL)

import User from '../models/user.js'

router.put('/upload/:id', (req, res) => {
  const _id = req.params.id
  console.log('req.files: ', req.files)
  
  try {
  if (!req.files) {
    return res.status(400).json({
      ok: false,
      err: {
        message: 'no files were selected'
      } 
    })
  }

  let archivo = req.files.image

  // separara el nombre del archivo en cuanto encuentre un punto '.'
  let nombreArchivoCortado = archivo.name.split('.')
  // Obtenemos la ultima posicion del arreglo
  let extension = nombreArchivoCortado[nombreArchivoCortado.length -1]

  // Extensiones permitidas
  let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg', 'JPG']

  // Valida si "extension" esta en alguna posicion index del arreglo 'extencionesValidas'
  if (extensionesValidas.indexOf(extension) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message: 'Allowed extensions are: ' + extensionesValidas.join(', '),
        ext: extension
      }
    })
  }
    
  const filePath = req.files.image.tempFilePath
    
  uploadImageCloudinary(_id, filePath, res)
    
  

  // uploadImage(archivo, extension)

  } catch (err) {
    console.log('Error dentro de la peticion: ', err)
  }
})



function uploadImage(archivo, extension, res) {
  archivo.mv(`upload/usuarios/imagen-${new Date().getMilliseconds()}.${extension}`, (err, res) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
  })
  return res.json({
      ok: true,
      message: 'Image was sucessfully uploaded on backend'
    })
}

function uploadImageCloudinary(_id, image, res) {
  cloudinary.uploader.upload(image, { tags: 'basic_sample' }, function (error, result) {
    if (error) {
      console.log('Error al subir a cloudinary', error)
    }
    else {
      User.findById(_id, (err, usuarioDB) => {
        if (err) {
          console.log('Error al relacionar usuario')
        } else {
          usuarioDB.image = result.secure_url
          //console.log('Usuario ya guardado con la imagen: ', usuarioDB)
          usuarioDB.save((err, newUsuarioDB) => {
            //console.log(newUsuarioDB)
            return res.json({
              usuarioDB: newUsuarioDB
            })
          })
        }
      })
    }
  })
}

// function updateImage(imagen) {
//   const nombreArray = modelo.img.split('/')
//   const nombre = nombreArray[nombreArray.length - 1]
//   const [ public_id ] = nombre.split('.')
//   cloudinary.uploader.destroy(public_id)
// }

/*********** Actualizar imagen usuario ***************** */

function imagenUsuario(id, res, filePath) {
  const Usuario = require('../models/user.js')

  Usuario.findById(id, (err, usuarioDB) => {
    console.log('Pintando en consola el usuario: ', usuarioDB)
    
    if (err) {
      console.log('Entre en primer if')
      return res.status(500).json({
        ok: false,
        err: err
      })
    }
    
    // if (!usuarioDB) {
    //   console.log('Entre en segundo if')
    //   return res.status(400).json({
    //     ok: false,
    //     err: {
    //       message: 'Usuario no existente'
    //     }
    //   })
    // }

    cloudinary.uploader.upload(filePath, { tags: 'basic_sample' }, function (error, result) {
    if (error) {
      console.log('Error al subir a cloudinary', error)
    }
    else {
      usuarioDB.image = result.url
      console.log('usuarioDB',usuarioDB)
      usuarioDB.save()
    }
    })
  })
    // usuarioDB.image = nombreArchivo

    // usuarioDB.save((err, usuarioGuardado) => {
    //   console.log(usuarioGuardado)
    //   if (err) {
    //     console.log('Entre en tercer if')
    //     return res.status(400).json({
    //       ok: false,
    //       err: {
    //       message: 'Fallo al guardar el usuario'
    //       }
    //     })
    //   }

    //   res.json({
    //     ok: true,
    //     usuario: usuarioGuardado,
    //     image: nombreArchivo
    //   })
    // })

  // })
}


/**************************************** */

module.exports = router
import express from 'express'
const router = express.Router()

router.post('/upload', (req, res) => {

  console.log(req.files)
  if (!req.files) {
    return res.status(400).json({
      ok: false,
      err: {

        message: 'no files were selected'
      } 
    })
  }

  let archivo = req.files.archivo
  // separara el nombre del archivo en cuanto encuentre un punto '.'
  let nombreArchivoCortado = archivo.name.split('.')
  // Obtenemos la ultima posicion del arreglo
  let extension = nombreArchivoCortado[nombreArchivoCortado.length -1]
  // console.log(nombreArchivo)
  // console.log(extension)


  // Extensiones permitidas
  let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg']

  // Valida si "extension" esta en alguna posicion index del areglo 'extencionesValidas'
  if (extensionesValidas.indexOf(extension) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        // Si se manda el error de esta forma todo queda junto
        // message: 'Allowed extensions are: ' + extencionesValidas
        
        // Si se manda el error de esta forma todo queda separado
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
       
      })
    }
      return res.json({
        ok: true,
        message: 'Image was sucessfully uploaded'
      
      })

  })



})

module.exports = router
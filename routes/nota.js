import express from 'express'
const router = express.Router()

// Importar el modelo nota
import Nota from '../models/nota.js'

// agregar una nota
router.post('/nueva-nota', async (req, res) => {
  // 'req' es lo que envias 'res' es lo que responde el servidor
  const body = req.body
  try {
    const notaDB = await Nota.create(body)
    console.log(notaDB)
    // El status 200 esta por defecto en Express so no se nesesita mandar
    // res.status(200).json(notaDB)
    res.json(notaDB)
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Something was wrong',
      error: error
    })
  }
})

// Get con parametros
router.get('/nota/:id', async(req, res) => {
  const _id = req.params.id
  try {
    const notaDB = await Nota.findOne({ _id })
    res.json(notaDB)
  } catch (error) {
    return res.status(400).json({
      mensaje: 'somwthing was wrong on get using params',
      error
    })
  }
})

// Get con todos los documentos
router.get('/nota', async(req, res) => {
  // const _id = req.params.id
  try {
    const notaDB = await Nota.find()
    res.json(notaDB)
  } catch (error) {
    return res.status(400).json({
      mensaje: 'something was wrong on get using params',
      error
    })
  }
})

// Eliminar una nota
router.delete('/nota/:id', async(req, res) => {
  const _id = req.params.id
  try {
    const notaDB = await Nota.findByIdAndDelete({ _id })
    if (!notaDB) {
      return res.status(400).json({
      mensaje: 'can not find the Id provided',
      error
    })
    }
    res.json(notaDB)
  } catch (error) {
    return res.status(400).json({
      mensaje: 'can not find the Id provided',
      error
    })
  }
})

// Put actualizar una nota

router.put('/nota/:id', async(req, res) => {
  const _id = req.params.id
  const body = req.body
  try {
    const notaDB = await Nota.findByIdAndUpdate( _id , body, { new: true })
    res.json(notaDB)
    
    
    res.json(notaDB)
  } catch (error) {
    return res.status(400).json({
      mensaje: 'can not find the Id provided',
      error
    })
  }
})


// Exportacion de router
// export default router
// esta forma de exportar es de node
module.exports = router


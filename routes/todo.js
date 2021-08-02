import express from 'express'
const router = express.Router()

const {verificarAuth, verificarAdministrador } = require('../middlewares/auth')

// Importar el modelo nota
import Todo from '../models/todo.js'

// agregar una nota
router.post('/new-todo', verificarAuth , async (req, res) => {
  // 'req' es lo que envias 'res' es lo que responde el servidor
  const body = req.body
  /* 'req.usuario._id' tiene el token que se lee desde la autenticacion.js
  se almacena de esta forma porque con esa info vamos a filtrar
  las notas por usuario
  */
  body.usuarioId = req.usuario._id

  try {
    const notaDB = await Todo.create(body)
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
  console.log('ID: ', _id)
  try {
    const notaDB = await Todo.findOne({ _id })
    res.json(notaDB)
  } catch (error) {
    return res.status(400).json({
      mensaje: 'somwthing was wrong on get using params',
      error
    })
  }
})

// Get con todos los documentos
router.get('/notas', verificarAuth , async(req, res) => {
  // const _id = req.params.id
  const usuarioId = req.usuario._id
  try {
    const notasDB = await Todo.find({usuarioId})
    res.json(notasDB)
  } catch (error) {
    return res.status(400).json({
      mensaje: 'something was wrong getting all documents',
      error
    })
  }
})

// Get con paginacion
router.get('/nota', verificarAuth , async(req, res) => {
  // const _id = req.params.id

  const usuarioId = req.usuario._id
  const limit = Number(req.query.limit) || 10
  const skip = Number(req.query.skip) || 0

  try {
    const notaDB = await Todo.find({ usuarioId }).limit(limit).skip(skip)
    
    // Contar documentos
    const totalNotas = await Todo.find({usuarioId}).countDocuments()

    res.json({ notaDB, totalNotas })
    
  } catch (error) {
    return res.status(400).json({
      mensaje: 'something were wrong',
      error
    })
  }
})

// Eliminar una nota
router.delete('/nota/:id', async(req, res) => {
  const _id = req.params.id
  try {
    const notaDB = await Todo.findByIdAndDelete({ _id })
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
    const notaDB = await Todo.findByIdAndUpdate( _id , body, { new: true })
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


import mongoose from 'mongoose'
const Schema = mongoose.Schema

const notaSchema = new Schema({
  nombre: {
    type: String, required: [true, 'name is required']
  },
  description: String,
  usuarioId: String,
  date: { type: Date, default: Date.now },
  activo: { type: Boolean, default: true}
})

// Convertir a modelo
const Nota = mongoose.model('Nota', notaSchema)

export default Nota
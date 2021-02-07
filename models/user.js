import mongoose from 'mongoose'
const Schema = mongoose.Schema

const uniqueValidator = require('mongoose-unique-validator')

const roles = {
  values: ['ADMIN', 'USER'],
  message: '{VALUE} Invalid role'
}

const userSchema = new Schema({
  nombre: { type: String, required: [true, 'Name is required'] },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  pass: { type: String, required: [true, 'Password is required'] },
  date: { type: Date, default: Date.now },
  role: { type: String, default: 'USER', enum: roles },
  activo: { type: Boolean, default: true },
  image: { type: String, required: false }
})

/* { PATH } Sera reemplazado por el campo con el atributo 'unique' declarado
en este caso seria 'email'
*/ 
userSchema.plugin(uniqueValidator, { message: 'Error, waiting for unique {PATH} '})

// Ocultar propiedades de objetos mongoose JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.pass
  return obj
}

const User = mongoose.model('User', userSchema)

export default User
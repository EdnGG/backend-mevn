require('dotenv').config()

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'

const app = express()

const URI_LOCAL = process.env.URI_LOCAL
const URI_CLOUD = process.env.URI_CLOUD

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}
mongoose.connect(URI_LOCAL, options).then(
  () => {
    console.log('conectado a Mongo DB')
  }, err => {
    err
  } 
)

app.use(fileUpload({ useTempFiles: true }))
// app.use(fileUpload())

app.use(morgan('tiny'))
//'CORS' permite acceder a la app desde otro dominio
app.use(cors())
// 'express.json()', sirve para las respuestas
app.use(express.json())
/*
  application/x-www-form-urlencoded
  para poder trabajar con solicitudes o respuestas de aplicaciones 'www', 'form', 'urlencoded'
*/
app.use(express.urlencoded({ extended: true }))

// La ruta de abajo siempre debe de estar antes del middleware de la configuracion del 
// histoy Middleware para vue.js


app.use( require('./routes/todo') )
app.use( require('./routes/user') )
app.use( require('./routes/upload'))
// app.use('/api/login', require('./routes/login'))

// Midleware para vue.js router modo history
const history = require('connect-history-api-fallback')
app.use(history())
/*
El 'path' nos sirve pra ubicarnos dentro del servidor
*/
app.use(express.static(path.join(__dirname, 'public')))

app.set('Port', process.env.PORT || 3000)

app.listen(app.get('Port'), () => {
  console.log('port listeninig on: ', app.get('Port') )
})


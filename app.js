require('dotenv').config()

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'

import fileUpload from 'express-fileupload'

const app = express()

// app.use(fileUpload({useTempFiles: true}))



/*
  DB Connection
*/

// Conexion local
const uri = 'mongodb://localhost:27017/mevn'

// Conexion en la nube
// const uri = 'mongodb+srv://user-mevn:WKBcQor9jVRWpQny@mevn-udemy.c4jbc.mongodb.net/udemy?retryWrites=true&w=majority'

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}
mongoose.connect(uri, options).then(
  () => {
    console.log('conectado a Mongo DB')
  }, err => {
    // El error se puede pintar directo sin pasarlo a un console
    // console.log(err)
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

// app.get('/', (req, res) => {
//   res.send('hello world!!!')
//   console.log('HELLO WORLD from console')
// })

app.use('/api', require('./routes/nota'))
app.use('/api', require('./routes/user'))
app.use('/api', require('./routes/upload'))
app.use('/api/login', require('./routes/login'))
// app.use('/api/upload', require('./routes/upload'))

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


/*
npm i mongoose-unique-validator --save
*/


/*

note # 2
description # 2

*/
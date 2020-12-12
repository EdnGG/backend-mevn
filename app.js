import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'

const app = express()

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

// La ruta de abajo siempre debe de estar antes de la configuracion del 
// histoy Middleware para vue.js

// app.get('/', (req, res) => {
//   res.send('hello world!!!')
//   console.log('HELLO WORLD from console')
// })

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

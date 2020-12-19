const jwt = require('jsonwebtoken')

const verificarAuth = (req, res, next) => {
  const token = req.get('token')
  jwt.verify(token, 'secret', (err, decoded) => {
    
    if (err) {
      return res.status(401).json({
        mensaje: 'Invalid user',
      })
    }
    req.usuario = decoded.data

  next()
  })
}

const verificarAdministrador = (req, res, next) => {
  const role = req.usuario.role

  if (role === 'ADMIN') {
    next()
  } else {
    return res.status(401).json({
        mensaje: 'Invalid user',
      })
  }
}

module.exports = {verificarAuth, verificarAdministrador}
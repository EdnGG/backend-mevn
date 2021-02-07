const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

import User from '../models/user';

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', async (req, res) => {
  const body = req.body
  try {
    // Validating email
    const usuarioDB = await User.findOne({ email: body.email })
    if (!usuarioDB) {
      return res.status(400).json({
        mensaje: 'Email not found'
      })
    } 

    // Validating Password
    if (!bcrypt.compareSync(body.pass, usuarioDB.pass)) {
      return res.status(400).json({
        
        mensaje: 'Wrong password '
      })
    }

    // Generar token
    const token = jwt.sign({
      data: usuarioDB
    }, 'secret', {expiresIn: 60 * 60})

    res.json({
      usuarioDB,
      token
    })

  } catch (err) {
    return res.status(400).json({
      mensaje: 'Something was wrong',
      error
    })
  }
})

module.exports = router;
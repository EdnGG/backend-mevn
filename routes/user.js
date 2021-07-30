import express from 'express'
const router = express.Router()

const jwt = require('jsonwebtoken')

const { check } = require('express-validator');

const { googleSignin } = require('../controllers/auth');


const {verificarAuth, verificarAdministrador } = require('../middlewares/auth')

// User model
import User from '../models/user.js'

// hash Password
const bcrypt = require('bcrypt')
const saltRounds = 10

//Filtering fields on http-PUT
// const _ = require('underscore')

// POST Login
router.post('/login', async (req, res) => {
  const body = req.body
  try {
    // Validating email
    const userDB = await User.findOne({ email: body.email })
    if (!userDB) {
      return res.status(400).json({
        message: 'Email not found'
      })
    } 

    // Validating Password
    if (!bcrypt.compareSync(body.pass, userDB.pass)) {
      return res.status(400).json({
        message: 'Wrong password '
      })
    }

    // Generating token
    const token = jwt.sign({
      data: userDB
    }, process.env.SECRETORPRIVATEKEY , {expiresIn: '4h'})

    res.json({
      userDB,
      token
    })

  } catch (err) {
    return res.status(400).json({
      mensaje: 'Unable to create new user',
      error
    })
  }
})

// POST  New User (Google Login)
router.post('/google', googleSignin);

// POST  New User (Signup)
router.post('/signup', async (req, res) => {

  const body = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }
  // Encriptando el password
  try {

    body.pass = bcrypt.hashSync(req.body.pass, saltRounds)

    if (!body.name && !req.body.pass && !body.email) {
      return res.status(400).json({
        message: 'Please fill up all fields correctly'
      })
    }

    if (!body.name ) {
      return res.status(400).json({
        message: 'Name is required'
      })
    }
  
    if (!body.email) {
      return res.status(400).json({
        message: 'Email is required'
      })
    }

    if (!req.body.pass) {
      return res.status(400).json({
        message: 'Password is required'
      })
    }

    bcrypt.hashSync(req.body.pass, saltRounds)

  const userDB = await User.create(body)
    res.json(userDB)

  } catch (err) {
    return res.status(500).json({
      message: 'Please fiil up all fields',
      err
    })
  }
})

module.exports = router
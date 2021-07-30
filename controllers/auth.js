const { response } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/user.js');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const googleSignin = async(req, res = response) => {

    // id_token from google
    const id_token  = req.body.id_token;
    console.log('token: ', id_token)

    // I receive res.body as undefined
    console.log('res.body: ', res.body)
    
    try {
        const { email, name, image } = await googleVerify( id_token );
        
        let userDB = await User.findOne({ email });

        if ( !userDB ) {
            // Creating new userDB
            const data = {
                name,
                email,
                pass: ':P',
                image,
                google: true
            };

            userDB = new User( data );
            let newUser = await userDB.save();
            console.log('newUser', newUser)

            // Generating  JWT
            // Mongo creates new users setting _id as default
            const token = await generarJWT(newUser._id);
            res.json({
                userDB: newUser,
                token
            });
        }

        // If userDB exists
        if (userDB) {
            res.json({
                userDB,
                token: await generarJWT(userDB._id)
            });
        }
    } catch (err) {
        res.status(400).json({
            msg: 'Google token not valid! ' + err
        })

    }
}



module.exports = {
    googleSignin
}

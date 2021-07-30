const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise( (resolve, reject) => {

        // Saving token_id as an object, { key: value }, payload = { uid }
        const payload = { uid };
        // console.log('payload from generar-token already destructer: ', payload)
        
        // Receiving token_id as number
        // console.log('payload from generar-token: ', uid)

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'Error trying to generate token' )
            } else {
                resolve( token );
            }
        })
    })
}

module.exports = {
    generarJWT
}


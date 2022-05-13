const jwt = require('jsonwebtoken')
const privateKey = 'ch-bejs'

exports.verifyJwt = (req, res, next) => {
    const authHeader = req?.headers['authorization']
    if (!authHeader) {
        return res.status(401).json({
            'message': 'Unauthorized'
        })
    }
    const token = authHeader
    ///const token = authHeader && authHeader.split(' ')[1]

    // if (authHeader.split(' ')[0] != 'Bearer') return res.status(422).json({
    //     'message': 'Invalid Bearer Token'
    // })

    if (token == null) return res.status(401).json({
        'message': 'Unauthorizedddd'
    })

    jwt.verify(token, privateKey, (err, user) => {
        
        req.user = user
        next()
    })
}

// exports.verifyJwtPage = (req, res, next) => {
//     let token = req?.session?.token

//     jwt.verify(token, privateKey, (err, user) => {
//         if (err) res.redirect('/login');
//         req.user = user
//         next()
//     })
// }
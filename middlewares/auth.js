
const jwt = require('jsonwebtoken');

exports.verifyJWT = (req, res, next) =>{
    const token = req.cookies.jwt;
    //console.log(req.cookies.jwt)
    if(!token) return res.status(401).redirect('/')

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        
       if(err) return res.status(401).redirect('/')

        req.userId = decoded.id

        next();

    })
}


var jwt = require('jsonwebtoken');
const JWT_SECRET = 'ASecretKey';

const fetchUser = (req ,res ,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error : "Please valid token ,first"})
    }
    try{
        const data = jwt.verify(token ,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error : "Please valid token"})
    }
}

module.exports = fetchUser;
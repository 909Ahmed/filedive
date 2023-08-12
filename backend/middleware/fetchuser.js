var jwt = require('jsonwebtoken');
const JWT_SECRET = 'ASecretKey';

const fetchUser = (req ,res ,next)=>{
    let token = req.header('auth-token');
    
    if(!token){
        res.status(401).send({error : "Please valid token ,fasdf"})
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
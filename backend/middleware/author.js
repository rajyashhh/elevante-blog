const jwt = require ("jsonwebtoken");
const jwt_pass = process.env.JWT_SECRET_KEY_Author;

function authAuthor(req, res, next){
    const token = req.headers.token;
    const verified = jwt.verify(token, jwt_pass);
    if(verified){
        req.userId = verified.id;
        next()
    }
    else{
        res.json({
            message: "Author is not signed in"
        })
    }
}

module.exports={
    authAuthor : authAuthor,
}
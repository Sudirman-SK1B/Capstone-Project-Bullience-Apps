const jwt = require('jsonwebtoken')

const isAuthorized = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null){
        return response.status(401).json({
            message: "UnAuthorized"
        })
    }
    jwt.verify(token,'secret', (err, result)=> {
        if (err) {
            return response.status(401).json({
                message: "UnAuthorized"
            })
        }
        request.user = result;
        next();
    })

}

module.exports = isAuthorized;
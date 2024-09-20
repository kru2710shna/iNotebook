var jwt = require('jsonwebtoken');
const JWD_SECRET = 'Ohmygodwhatishappeneing612'


const fetchUser = (req, res, next) => {

    // get the user from the jwt token and append id to request object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'Please authetiate using a valid token' })
    }
    try {
        const data = jwt.verify(token, JWD_SECRET)
        req.user = { id: data.id }; 
        next()

    }
    catch (error) {
        console.log(error.message)
        res.status(401).send({ error: 'Please authetiate using a valid token' })
    }

}


module.exports = fetchUser;
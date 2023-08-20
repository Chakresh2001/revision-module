var jwt = require('jsonwebtoken');

const auth = async (req,res,next) =>{

    try {

        const token = req.headers.authorization

        if(!token){
            res.json({error : "Kindly Log in first"})
        }

        jwt.verify(token, '123', function(err, decoded) {
            
            
            if(err){
                res.json({error : "invalid request"})
            }

            req.userInfo = decoded

            next()

        });
        
    } catch (error) {
        res.json({error : error.message})
    }

}

module.exports = auth
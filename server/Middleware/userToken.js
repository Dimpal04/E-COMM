var jwt = require('jsonwebtoken');

const privateKey = 'D#i$m#p$a@l' // replace with your own secret key

const Token = async (req, res, next) => {
    try {
        const token = req.headers.authorization
    
        await jwt.verify(token, privateKey, (err) => {
            if (err) {
                res.status(401).send({ message: "User Unauthorization" });
            } else {
                next();
            }
        })
    } catch (error) {
        res.status(500).send({ message:"Internal Server Error" });
    }
  

}
module.exports = { Token }
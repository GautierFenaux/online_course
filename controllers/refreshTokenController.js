const User = require('../models/User');
const jwt = require('jsonwebtoken');


const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    //Check si il y a des cookies puis si il y a un jwt dans ces mêmes cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    
  
    const refreshToken = cookies.jwt;
    
    const foundUser = await User.findOne({where : { refreshToken : refreshToken }});
    // console.log(foundUser);
    if(!foundUser) return res.sendStatus(401); //Unauthorized

    //Evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.firstname !== decoded.username) return res.sendStatus(403);
            const roles = foundUser.roles;
            const accessToken = jwt.sign(
                { 
                    "UserInfo" : {
                        "username": decoded.username,
                        "roles": roles,
                        "id": foundUser.id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn : '600s'}
            );
            res.json({roles, accessToken})
        }
    );
}

module.exports = { handleRefreshToken };
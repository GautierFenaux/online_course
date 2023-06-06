const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleLogin = async (req, res) => {

    
    const user = req.body.username;
    const pwd = req.body.password;


    if (!user || !pwd)
      return res
        .status(400)
        .json({ message: "Username and password are required!" });
    
    const foundUser = await User.findOne({ where: { firstname: user } });
    // console.log(foundUser);
    if(!foundUser) return res.sendStatus(401); //Unauthorized

    //Evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match) {
        const roles = foundUser.roles ;
        // console.log(foundUser.id);
        // Create JWTs

        // Mettre à 15 min expiresIn
        const accessToken = jwt.sign(
            { 
                "UserInfo": {
                    "username": foundUser.firstname,
                    "roles": roles,
                    "id": foundUser.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '3600s' }
        );
        
        const refreshToken = jwt.sign(
            { "username": foundUser.firstname },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        //Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        res.json({roles: roles, username : foundUser.firstname, accessToken: accessToken });
    } else {
        console.log('ici');
        res.sendStatus(401);
    }
}

module.exports = {handleLogin};


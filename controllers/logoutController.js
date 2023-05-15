const User = require('../models/User');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken
    console.log('yolo');
    const cookies = req.cookies;
    console.log(cookies);
    //Check si il y a des cookies puis si il y a un jwt dans ces mêmes cookies
    if (!cookies?.jwt) return res.sendStatus(204); // No content to send back
    const refreshToken = cookies.jwt;
    
    // Is refreshToken in db ?
    const foundUser = await User.findOne({ where: { refreshToken : refreshToken } });
    if(!foundUser) {
        // res.clearCoookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true  });
        return res.sendStatus(204); // No content to send back
    }

    //delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await User.destroy({
        where: {
            refreshToken: refreshToken
        }
      });
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // secure: true - only serves on https

    res.sendStatus(204);
}

module.exports = { handleLogout };

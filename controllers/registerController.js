const User = require('../models/User')
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {

  const user = req.body.username;
  const lastname = req.body.lastname;
  const pwd = req.body.password;
  const email = req.body.email;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required!" });
  const duplicate  = await User.findOne({ where: { firstname: user } });
  if(duplicate) return res.sendStatus(409)
  
  try {
    // encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const result = await User.create({
      "firstname": user,
      "lastname": lastname,
      "password": hashedPwd,
      "email": email
    });
    //Create and Store new user
    console.log(result);
    res.status(201).json({'success': 'New user ' + user + ' created!'});
  } catch (err){
    
    res.status(500).json({'message': err.message})
  }
}
module.exports = { handleNewUser }
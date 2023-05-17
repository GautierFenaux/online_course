const User = require('../models/User')
const bcrypt = require("bcrypt");
const Timetable = require('../models/Timetable');


/*
  Créer le nouvel utilisateur et son emploi du temps

*/ 
const handleNewUser = async (req, res) => {

  const username = req.body.username;
  const lastname = req.body.lastname;
  const pwd = req.body.password;
  const email = req.body.email;

  if (!username || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required!" });
  const duplicate  = await User.findOne({ where: { email: email } });
  if(duplicate) return res.sendStatus(409)
  
  try {
    // encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const user = await User.create({
      "firstname": username,
      "lastname": lastname,
      "password": hashedPwd,
      "email": email
    });

    const timetable = Timetable.create({
      "userId": user.id
    });

    console.log(user);
    res.status(201).json({'success': 'New user ' + username + ' created!'});
  } catch (err){
    
    res.status(500).json({'message': err.message})
  }
}
module.exports = { handleNewUser }
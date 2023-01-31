import User from '../models/user.model';
const bcrypt = require('bcrypt')
import jwt from 'jsonwebtoken'


//create new user
export const signup = async (body) => {
  const existingUser = await User.findOne({ email: body.email });
  if (!existingUser) {
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    const data = await User.create(body);
    return data;
  }
  else {
    throw new Error("User already exist")
  }
};

export const login = async (body) => {
  try {
    const userdata = await User.findOne({ email: body.email });
    if (!userdata) {
      throw new Error("Invalid Email")
    }
    const validPassword = await bcrypt.compare(body.password, userdata.password);
    if (!validPassword) {
      throw new Error("Invalid Password")
    }
    else {
      let token = jwt.sign({ email: userdata.email , id: userdata._id }, process.env.SECRET_KEY);
      return token;
    }
    
  }
  catch (error) {
    throw new Error(error)
  }

};




import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


export const signup = async (req, res, next) => {
  try {
    const data = await UserService.signup(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data:data,
      message: 'User Registered successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const login =async(req,res,next) => {
  try
  {
    const data = await UserService.login(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data:req.body.email,
      token:data,
      message:"User loggedin successfully"
    });
  } catch (error) {
    next(error);
  }
};

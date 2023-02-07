import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import logger from '../config/logger'

export const signup = async (req, res, next) => {
  try {
    const data = await UserService.signup(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User Registered successfully'
    });
    logger.log('info','User Registered Successfully')
  } catch (error) {
    next(error);
    logger.log('error','Error in Registering')
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: "User loggedin successfully"
    });
    logger.log('info','User Loggedin Successfully')
  } catch (error) {
    next(error);
    logger.log('error','Error in loging in')
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgetPassword(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Reset mail sent to your email.'
    });
    logger.log('info','Mail sent Successfully')
  } catch (error) {
    next(error);
    logger.log('error','Error in sending mail')
  }
};


export const resetPassword = async (req, res, next) => {
  try {
    const data = await UserService.resetPassword(req.body);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Password Updated.'
    });
    logger.log('info','Password changed Successfully')
  }
  catch (error) {
    next(error);
    logger.log('error','Error in reseting password')
  }
};
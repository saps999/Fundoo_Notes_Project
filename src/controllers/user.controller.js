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
    logger.log('error','User can not Registered')
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
  } catch (error) {
    next(error);
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
  } catch (error) {
    next(error);
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

  }
  catch (error) {
    next(error);
  }
};
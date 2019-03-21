import Validator from 'validatorjs';
import { errorResponse } from '../utils/response';
import customErrorMessages from '../utils/customErrorMessages';

export default class UserValidation {
  static validSignUp(req, res, next) {
    /**
     * @description Validates the request payload for user signup
     * @param  {object} req - The request object
     * @param  {object} res - The response object
     * @param {object} next - The next middleware
     * @returns Status code and error message or next()
     */

    const user = req.body;

    const userProperties = {
      firstname: 'required|alpha|min:2|max:50',
      lastname: 'required|alpha|min:2|max:50',
      username: 'required|alpha_num|min:5|max:50',
      email: 'required|email|max:100',
      password: 'required|alpha_num|min:6|max:18',
    };

    const validator = new Validator(user, userProperties, customErrorMessages);
    validator.passes(() => next());
    validator.fails(() => {
      const errors = validator.errors.all();
      return errorResponse(res, 400, errors);
    });
  }

  static validLogin(req, res, next) {
    /**
     * @description Validates the request payload for user login
     * @param  {object} req - The request object
     * @param  {object} res - The response object
     * @param {object} next - The next middleware
     * @returns Status code and error message or next()
     */

    const user = req.body;

    const userProperties = {
      email: 'required|email|max:100',
      password: 'required|alpha_num|min:6|max:18',
    };

    const validator = new Validator(user, userProperties, customErrorMessages);
    validator.passes(() => next());
    validator.fails(() => {
      const errors = validator.errors.all();
      return errorResponse(res, 400, errors);
    });
  }

  static validMessage(req, res, next) {

    /**
     * @description Validates the request payload for create message
     * @param  {object} req - The request object
     * @param  {object} res - The response object
     * @param {object} next - The next middleware
     * @returns Status code and error message or next()
     */

    const message = req.body;

    const messageProperties = {
      subject: 'required|alpha_num|min:2|max:100',
      message: 'required|alpha_num|min:2|max:200',
      email: 'required|email|max:100',
    };

    const validator = new Validator(message, messageProperties, customErrorMessages);
    validator.passes(() => next());
    validator.fails(() => {
      const errors = validator.errors.all();
      return errorResponse(res, 400, errors);
    });
  }
}


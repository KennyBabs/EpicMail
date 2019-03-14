import { middleware } from 'valid_me_js'; 

const signUpValidator = (req, res, next) => {
    const valid = middleware(req, res, next);
    valid
      .hasElement('email')
      .hasElement('firstName')
      .hasElement('lastName')
      .hasElement('userName')
      .hasElement('password')
      .isEmail()
      .isLength('userName', 3)
      .hasSpaces('userName')
      .hasSpaces('password')
      .isLength('password', 8)
      .check();
  };

  const signInValidator = (req, res, next) => {
    const valid = middleware(req, res, next);
    valid
      .hasElement('email')
      .hasElement('password')
      .isEmail()
      .check();
  };
   
   
  export { signUpValidator, signInValidator };  
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },
  
   //========= comparePassword ==============

   // @param {string} hashPassword 
   // @param {string} password 
   // @returns {Boolean} return True or False

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
   * isEpicMail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  // isEpicMail(email) {
  //   const newValue = email.split('@');
  //     const finalCheck = newValue[1];
  //   return finalCheck;
  // },

  
  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(id) {
    const token = jwt.sign(
        {userId: id},process.env.MY_SECRET, { expiresIn: 86400 }
    );
    return token;
  }
}

export default Helper;

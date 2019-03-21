import db from '../models/dbmodel';
import Helper from '../utils/helper';

class UserController {
  static async createUser(req, res) {
    let userData = [];
  
    const findOneEmail = 'SELECT * FROM users WHERE email=$1';
    const { email } = req.body;
    if (email) {
      const { rows } = await db.query(findOneEmail, [req.body.email]);
      userData = rows[0];

      if (userData) {
        return res.status(400).send({ message: 'email already exists' });
      }
    }
    
    const hashedPassword = Helper.hashPassword(req.body.password);
    const text = `
          INSERT INTO users (email, first_name, last_name, user_name, password)
          VALUES($1,$2,$3,$4,$5)
          returning *`;
    const values = [
      req.body.email,
      req.body.firstname,
      req.body.lastname,
      req.body.username,
       hashedPassword
    ];
    try {
      const { rows } = await db.query(text, values);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).send({
        status: 'success',
        data:
           {
             message: `Welcome ${req.body.firstname}`,
             token,
           },
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async loginUser(req, res) {
    let userData = [];
    const findOneEmail = 'SELECT * FROM users WHERE email=$1';

    const { rows } = await db.query(findOneEmail, [req.body.email]);
    userData = rows[0];

    if (!userData) {
      return res.status(400).send({
         message: 'email or password is incorrect' 
        });
    }
    if (userData && !Helper.comparePassword(userData.password, req.body.password)) {
      return res.status(400).send({
         message: 'Username or password is incorrect'
         });
    }
    // eslint-disable-next-line prefer-const
    if (userData) {
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).send({
        status: 'success',
        data:
              [{
                token,
              }],
      });
    }

    res.status(403).send({
      success: 'error',
      message: 'Incorrect username or password',
    });
  }
}

export default UserController;
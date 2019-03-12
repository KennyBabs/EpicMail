import epicMail from '../model/dummydb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class UserController {
    createUser (req, res) {
		if (!req.body.email) {
			return res.status(400).send({
				message : 'Email required'
			});
        }
        if(!req.body.userName) {
            return res.status(400).send({
                message : 'Username required'
            })
        }
        if(!req.body.password) {
            return res.status(400).send({
                message : 'Password required'
            })
        }

		const hashedPassword = bcrypt.hashSync(req.body.password, 8);
		const user = {
			id: 
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			password: hashedPassword,
			userName: req.body.userName
		};
		epicMail['User'].push(user);
		//generate token
		const token = jwt.sign ({ id: user._id}, config.secret, { expiresIn: 86400 });
		res.status(200).send({
			status : 200,
			data: [{
				token: token
			}]
		});


		}
}


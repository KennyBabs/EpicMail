import epicMail from '../model/dummydb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class UserController {
    createUser (req, res) {
		const hashedPassword = bcrypt.hashSync(req.body.password, 8);
		const user = { 
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			password: hashedPassword,
			userName: req.body.userName
		};
		epicMail['User'].push(user);
		//generate token
		const token = jwt.sign ({ id: user._id}, process.env.MY_SECRET, { expiresIn: 86400 });
		res.status(200).send({
			'status' : 200,
			'data': [{
				'token' : token
			}]
		});


    }
    
    loginUser (req, res) {

        const user = epicMail['User'].find(user => user.email === req.body.email);
        if (!user) { 
            return res.status(400).send({
             'status' : "error", 
             'error' : 'invalid credential'
            });
        };

        const passwordIsValid = epicMail['User'].find(user => user.password === req.body.password);
        if (!passwordIsValid) { 
            return res.status(400).send({ 
                'status' : 'error',
                'error' : 'invalid password'
            });
        };

        const token = jwt.sign({ id: user._id}, process.env.MY_SECRET, { expiresIn: 86400 });
            res.status(200).send({ 
                status : "successful", 
                data: [{
                     'token' : token
                    }] 
                });
        
    }
}

const userController = new UserController();
export default userController;


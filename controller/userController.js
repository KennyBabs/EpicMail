import epicMail from '../model/dummydb';
import jwt from 'jsonwebtoken';

class UserController {
    createUser (req, res) {
		// const hashedPassword = bcrypt.hashSync(req.body.password, 8);
		const user = { 
            id : epicMail['User'].length + 1,
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			password: req.body.password,
			userName: req.body.userName
		};
		epicMail['User'].push(user);
		//generate token
		const token = jwt.sign ({ id: user._id}, process.env.MY_SECRET, { expiresIn: 86400 });
		res.status(200).send({
			status : 200,
			data: [{
				'token' : token
			}]
		});

    }
    
    loginUser (req, res) {

        const user = epicMail['User'].find(user => user.email === req.body.email);
        if (!user) { 
            return res.status(400).send({
             status : "error", 
             message : 'invalid credential'
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
                status : "success", 
                data: [{
                     'token' : token
                    }] 
                });
        
    }
}

const userController = new UserController();
export default userController;


import epicMail from '../model/dummydb';

class MessageController {
	getAllMessages (req, res) {
		return res.status(200).send({
			status: 200,
			data: epicMail['Message']
		});

		}
		createMessages (req, res) {
		
			if(!req.body.subject || !req.body.message) {
				return res.status(400).send({
					status : 400,
					error : 'fields required'
				});
			}
		
		const message = [{
			id :req.body.id,
			createdOn: Date.now(),
			subject: req.body.subject,
		  message: req.body.message,
		  parentMessageId: req.body.parentMessageId,
		  status: req.body.status,
		}];

		epicMail['Message'].push(message);	
		 res.status(200).send({
			status : 200,
			data: message
		});
	}

}

const messageController = new MessageController();

export default messageController;
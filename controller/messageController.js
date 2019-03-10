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

	getMessage (req, res) {
		const id = parseInt(req.params.id, 10);
		 const message = epicMail['Message'].find(message => message.id === id);
			if (!message) {
				return res.status(400).send({
					status: 400,
					data: 'message not found'
				});
			}
			return res.status(200).send({
				status: 200,
				data: message
			});
	}



}

const messageController = new MessageController();

export default messageController;
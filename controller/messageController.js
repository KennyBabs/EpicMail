import epicMail from '../model/dummydb';

class MessageController {
	getAllMessages (req, res) {
		    res.status(200).send({
			status: 'successful',
			data: epicMail['Message']
		});

		}
		createMessages (req, res) {
		
			if(!req.body.subject) {
				return res.status(400).send({
					status : 'error',
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
			status : 'successful',
			data: message
		});
	}

	getMessage (req, res) {
		const id = parseInt(req.params.id, 10);
		 const message = epicMail['Message'].find(message => message.id === id);
			if (!message) {
				return res.status(400).send({
					status: 'error',
					data: 'message not found'
				});
			}
			return res.status(200).send({
				status: 'successful',
				data: message
			});
	}

	deleteMessage(req, res) {
		const id = parseInt(req.params.id, 10);
		let messageFound;
		let itemIndex;
		epicMail['Message'].filter((message, index) => {
			if (message.id === id) {
				messageFound = message;
				itemIndex = index;
			}
		});

		if (!messageFound) {
			return res.status(400).send({
				status: 'error',
				data: 'message not found'
			});

		}
			epicMail['Message'].splice(itemIndex, 1);

			let message = epicMail['Message'].splice(itemIndex, 1);
			return res.status(200).send({
				status: 'successful',
				data: [{
					"message" :message[0].message

				}]	

			});

	}



}

const messageController = new MessageController();

export default messageController;
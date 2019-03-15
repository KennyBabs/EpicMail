import epicMail from '../model/dummydb';

class MessageController {
	getAllMessages (req, res) {
		  res.status(200).send({
		     status: 'success',
		     data: epicMail['Message']
		});
	}
	getAllDraftMessages (req, res) {
		  res.status(200).send({
  	          status: 'success',
  	          data: epicMail['DraftMessage']
});
}


	getAllUnreadMessages (req, res) {
		res.status(200).send({
	  	    status: 'success',
		    data: epicMail['UnreadMessage']
	});
}

	getAllSentMessages (req, res) {
		res.status(200).send({
	status: 'success',
	data: epicMail['SentMessage']

});
	}

		createMessages (req, res) {
		
			if(!req.body.subject) {
				return res.status(400).send({
					status : 'error',
					error : 'invalid credentials'
				});
			}
			if(!req.body.message) {
				return res.status(400).send({
					status : 'error',
					error : 'invalid credentials'
				});
			}
		
		const message = [{
		 id : epicMail['Message'].length + 1,
		 createdOn: new Date(),
		 subject: req.body.subject,
		 message: req.body.message,
		 parentMessageId: epicMail['Message'].length + 2
		}];

		epicMail['Message'].push(message);	
		 res.status(200).send({
			status : 'success',
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
				status: 'success',
				data: [{
					"message" :message[0].message

				}]	

			});

	}



}

const messageController = new MessageController();

export default messageController;
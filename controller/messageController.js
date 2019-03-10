import epicMail from '../model/dummydb';

class MessageController {
	getAllMessages (req, res) {
		return res.status(200).send({
			status: 200,
			data: epicMail['Message']
		});

    }
}

const messageController = new MessageController();

export default messageController;
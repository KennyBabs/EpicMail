import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const should = chai.should();

describe('EpicMail endpoints', () => {
	const message = {
		id : 1,
		createdOn : 2017,
		subject : 'Andela',
		message: 'This is Andela',
		parentMessageId: 2,
		status : 'sent',
	};

	describe('GET /api/v1/messages', () => {
		it('it should get all messages', (done) => {
			chai.request(app)
			.get('/api/v1/messages')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				done();
			});
		});
		});

		describe('GET /api/v1/messages/unread', () => {

			it('it should get unread messages', (done) => {
				chai.request(app)
				.get('/api/v1/messages/unread')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
			});
			});

			describe('GET /api/v1/messages/sent', () => {
				it('it should get sent messages', (done) => {
					chai.request(app)
					.get('/api/v1/messages/sent')
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						done();
					});
				});
				});

				describe('POST /api/v1/messages', () => {
					it('it should post email messages', (done) => {
						chai.request(app)
						.post('/api/v1/messages')
						.send(message)
						.end((err, res) => {
							if(!message.subject){
								return err
							}
							res.should.have.status(200);
							res.body.should.be.a('object');
							done();
						});
					});
				});
	

});
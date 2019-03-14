import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('EpicMail endpoints', () => {
	const message = {
		id : 1,
		createdOn : Date.now(),
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
							res.should.have.status(200);
							res.body.should.be.a('object');
							done();
						});
					});
				});
	
				describe('GET /api/v1/messages:id', () => {
					it('it should get a particular message', (done) =>{
						const id = message['id']
           
						chai.request(app)
						.get(`/api/v1/messages/${id}`)
						.end((err, res) => {
							res.should.have.status(200);
							res.body.should.be.a('object');
							done();
						});
					});

					it('it should not get a particular message', (done) =>{
						const id = 3;
           
						chai.request(app)
						.get(`/api/v1/messages/${id}`)
						.end((err, res) => {
							res.should.have.status(400);
							res.body.should.be.a('object');
							done();
						});
					});
				});

				describe('GET /api/v1/messages:id', () => {
					it('it should get a particular message', (done) =>{
						const id = message['id']
           
						chai.request(app)
						.delete(`/api/v1/messages/${id}`)
						.end((err, res) => {
							res.should.have.status(200);
							res.body.should.be.a('object');
							done();
						});
					});
				});
					





});
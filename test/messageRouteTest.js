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
		it('should get all messages', (done) => {
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

			it('should get unread messages', (done) => {
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
				it('Should get sent messages', (done) => {
					chai.request(app)
					.get('/api/v1/messages/sent')
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						done();
					});
				});
				});

				describe('GET /api/v1/messages/draft', () => {
					it('Should get draft messages', (done) => {
						chai.request(app)
						.get('/api/v1/messages/draft')
						.end((err, res) => {
							res.should.have.status(200);
							res.body.should.be.a('object');
							done();
						});
					});
					});

				describe('GET /api/v1/messages/draft', () => {
					it('Should get sent messages', (done) => {
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
					it('Should post email messages', (done) => {
						chai.request(app)
						.post('/api/v1/messages')
						.send(message)
						.end((err, res) => {
							res.should.have.status(200);
							res.body.should.be.a('object');
							done();
						});
					});

					it('Should not create email messages', (done) => {
						const message1 = {
							id : 1,
		                    createdOn : new Date(),
		                     subject : '',
		                    message: 'This is Andela',
		                    parentMessageId: 2,
		                    status : 'sent',
						};

						chai.request(app)
						.post('/api/v1/messages')
						.send(message1)
						.end((err, res) => {
							res.should.have.status(400);
							res.body.should.be.a('object');
							done();
						});
					});

				});
	
				describe('GET /api/v1/messages:id', () => {
					it('Should get a particular message', (done) =>{
						const id = message['id']
           
						chai.request(app)
						.get(`/api/v1/messages/${id}`)
						.end((err, res) => {
							res.should.have.status(200);
							res.body.should.be.a('object');
							done();
						});
					});

					it('Should not get a particular message', (done) =>{
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
					it('Should get a particular message', (done) =>{
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
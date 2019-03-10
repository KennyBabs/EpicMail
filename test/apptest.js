import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const should = chai.should();

describe('EpicMail endpoints', () => {
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

});
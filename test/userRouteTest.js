import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const expect = chai.expect();

describe('EpicMail User Endpoint', () => {
    describe('POST /api/vi/auth/signup', () => {
        it('it should allow user login', (done) => {
            const new_user = {
                email : 'ayo@epicmail.com',
                firstName : 'ayo',
                lastName : 'babson',
                password: 'andela',
                userName : 'ayobabson'
            }
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send(new_user)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.equal('object');
                expect(res.body.data).to.be.equal('array');
                expect(res.body.data).to.be.equal('token');
            }).catch(err => {
               return err.message;
            });

        });
    });
});
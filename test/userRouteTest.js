import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai'
import app from '../app';

chai.use(chaiHttp);


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
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });

        });
    });
});
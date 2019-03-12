import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai'
import app from '../app';

chai.use(chaiHttp);


describe('EpicMail User login Endpoint', () => {
    describe('POST /api/vi/auth/signup', () => {
        it('it should allow user signup', (done) => {
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

    describe('POST /api/vi/auth/login', () => {
        it('it should allow user login', (done) => {
            const new_user = {
                email : 'hayobabson@epicmail.com',
                password: 'grammar',
            }
            chai.request(app)
            .post('/api/v1/auth/login')
            .send(new_user)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });

        });

        it('it should not allow user login, if email is not supply or incorrect', (done) => {
            const new_user = {
                email : '',
                password: 'grammar',
            }
            chai.request(app)
            .post('/api/v1/auth/login')
            .send(new_user)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });

        });

        it('it should not allow user login, if password is incorrect', (done) => {
            const new_user = {
                email : 'hayobabson@epicmail.com',
                password: '',
            }
            chai.request(app)
            .post('/api/v1/auth/login')
            .send(new_user)
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
    
        });
    });

});
import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai'
import app from '../app';

chai.use(chaiHttp);


describe('EpicMail User login Endpoint', () => {
    describe('POST /api/v1/auth/signup', () => {
        it('it should allow user signup', (done) => {
            const new_user = {
                email : 'ayo@epicmail.com',
                firstName : 'ayo',
                lastName : 'babson',
                password: 'andelaisepic',
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

    describe('POST /api/v1/auth/login', () => {
        it('it should allow user login', (done) => {
            const new_user = {
                email : 'hayobabson@epicmail.com',
                password: 'grammarson',
            }
            chai.request(app)
            .post('/api/v1/auth/login')
            .send(new_user)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });

        });
    });

        describe('POST /api/v1/auth/login', () => {
            it('should not allow user login,if email is incorrect', (done) => {
                const new_user = {
                    email : 'hayobabs@epicmail.com',
                    password: 'grammarson',
                }
                chai.request(app)
                .post('/api/v1/auth/login')
                .send(new_user)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
    
            });

        it('it should not allow user login, if email is not supply', (done) => {
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
                expect(res).to.have.status(400);
                done();
            });
    
        });
        it('it should not allow user login, if password length is than 10 ', (done) => {
            const new_user = {
                email : 'hayobabson@epicmail.com',
                password: 'dsafsfsqr',
            }
            chai.request(app)
            .post('/api/v1/auth/login')
            .send(new_user)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    
        });
    });

    describe('POST /api/v2/auth/signup', () => {
        it('should not accept null values', (done) => {
          chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
              email: '',
              firstname: '',
              lastname: '',
              username: '',
              password: '',
            })
            .end((err, res) => {
              expect(res).to.have.status(400);
              done();
            });
        });
      
        it('should not allow invalidemail', (done) => {
          chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
              email: 't',
              firstname: 'tolani',
              lastname: 'bankole',
              username: 'bosslady',
              password: 'password',
            })
            .end((err, res) => {
              expect(res).to.have.status(400);
              done();
            });
        });
      
        it('should sign up a user', (done) => {
          chai.request(app)
            .post('/api/v2/auth/signup')
            .send({
              email: 'rob@epicmail.com',
              firstname: 'Robinson',
              lastname: 'Tijani',
              username : 'RobTj',
              password: 'edward1234',
            })
            .end((err, res) => {
              expect(res).to.have.status(400);
              done();
            });
        });
        
      });

      describe('POST /api/v2/auth/login', () => {
        it('should not accept null values', (done) => {
          chai.request(app)
            .post('/api/v2/auth/login')
            .send({
              email: '',
              password: '',
            })
            .end((err, res) => {
              expect(res).to.have.status(400);
            //   expect(res.body.message).to.eql('email and password are required');
              done();
            });
        });

        it('should not allow invalid credentials', (done) => {
          chai.request(app)
            .post('/api/v2/auth/login')
            .send({
              email: 'Rob@epicmail.com',
              password: '1234',
            })
            .end((err, res) => {
              expect(res).to.have.status(400);
              done();
            });
        });

        it('should not allow invalid credentials', (done) => {
            chai.request(app)
              .post('/api/v2/auth/login')
              .send({
                email: 'Rob@epic.com',
                password: 'edward1234',
              })
              .end((err, res) => {
                expect(res).to.have.status(400);
                done();
              });
          });

        it('should login a user', (done) => {
          chai.request(app)
            .post('/api/v2/auth/login')
            .send({
              email: 'Rob@epicmail.com',
              password: 'edward1234',
            })
            .end((err, res) => {
              expect(res).to.have.status(400);
              done();
            });
        });
      });
});
import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';


chai.should();
chai.use(chaiHttp);

const wrongUrl = '/api/v1/sdfghj';
const url = '/api/v1';
const redirectUrl = '/';

// defaults
describe('All Tests', () =>{
    it('Should get url successfully', (done) => {
        chai
            .request(app)
            .get(url)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.be.eql('Welcome to FreeMentor');
                done();
            });
    });
    it('should signup a new user', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send({
                "firstName": "Davies",
                "lastName": "Wabuluka",
                "email": "two@test.com",
                "password": "test123",
                "address": "nalumunye",
                "bio": "a good man",
                "occupation": "teacher",
                "expertise": "cooking"
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    });
    it('should login a user', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/login')
            .send({
                "email": "two@test.com",
                "password": "test123"
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    });
    it('should signup a new admin', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/admin/signup')
            .send({
                "email":"test@admin.com",
	            "password":"test123"
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    });
    it('should login admin', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/admin/login')
            .send({
                "email":"test@admin.com",
	            "password":"test123"
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    })
})
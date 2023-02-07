import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

<<<<<<< HEAD
  // testing user registration api
=======
  // testing user registration apis
>>>>>>> forgetAndResetPassword
  describe('User Registration ', () => {

    it('ValidUserDetailsAreGivenItShouldBeSaveInDatabase', (done) => {
      const inputBody = {
        "fname": "saptarshi",
        "lname": "biswas",
        "email": "saptarshi@gmail.com",
        "password": "saps99"
      }
      request(app)
        .post('/api/v1/users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });


    it('InvalidFirstnameIsGivenItShouldThrowAnError', (done) => {
      const inputBody = {
        "fname": "sap",
        "lname": "biswas",
        "email": "saptarshi@gmail.com",
        "password": "saps99"
      }
      request(app)
        .post('/api/v1/users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });


    it('InvalidLastnameIsGivenItShouldThrowAnError', (done) => {
      const inputBody = {
        "fname": "saptarshi",
        "lname": "bis",
        "email": "saptarshi@gmail.com",
        "password": "saps99"
      }
      request(app)
        .post('/api/v1/users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });

    it('InvalidEmailIsGivenItShouldThrowAnError', (done) => {
      const inputBody = {
        "fname": "saptarshi",
        "lname": "biswas",
        "email": "saptarshi@.com",
        "password": "saps99"
      }
      request(app)
        .post('/api/v1/users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });


    it('InvalidPasswordIsGivenItShouldThrowAnError', (done) => {
      const inputBody = {
        "fname": "saptarshi",
        "lname": "biswas",
        "email": "saptarshi@gmail.com",
        "password": 1234
      }
      request(app)
        .post('/api/v1/users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
<<<<<<< HEAD

  // testing user login api
  describe('User Login', async () => {

    it('ValidUserLoginDetailsAreGivenItShouldLogInSuccessfully.', (done) => {
      const inputBody = {
        "email": "saptarshi@gmail.com",
        "password": "saps99"
      }
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          let token = res.body.data
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });

    it('InvalidEmailIsGivenItShouldThrowAnError', (done) => {
      const inputBody = {
        "email": "saptarshi@.com",
        "password": "saps99"
      }
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });

    it('InvalidPasswordIsGivenItShouldThrowAnError', (done) => {
      const inputBody = {
        "email": "saptarshi@gmail.com",
        "password": 123456
      }
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
=======
>>>>>>> forgetAndResetPassword
});

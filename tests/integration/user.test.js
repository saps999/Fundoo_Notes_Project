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

  describe('User Registration ', () => {

    it('ValidUserDetailsAreGivenItShouldBeSaveInDatabase', (done) => {
      const inputBody = {
        "fname": "Dhanshree",
        "lname": "Patil",
        "email": "patilds@gmail.com",
        "password": "dhanshree"
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
        "fname": "ddd",
        "lname": "maneg",
        "email": "dhanu@gmail.com",
        "password": "dhanshree2000"
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
        "fname": "Dhanshree",
        "lname": "pat",
        "email": "dhanshree@gmail.com",
        "password": "dhanshree123"
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
        "fname": "dhanshree",
        "lname": "patil",
        "email": "dhanshree@.com",
        "password": "dhanshree"
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
        "fname": "dhanshree",
        "lname": "patil",
        "email": "dhanshree@gmail.com",
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
});

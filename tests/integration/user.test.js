import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/index';
let token;
var id;

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

  // testing user registration api
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

  // // testing user login api
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
          token = res.body.data
          console.log("---------------------------------------------------------------------------------------------",token);
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

  
  describe('Create Note', () => {
    const inputBody = {
      "title": "Title Note",
      "description": "Description Note",
    }
    it('NoteCreatedSucessfully', (done) => {
      request(app)
        .post('/api/v1/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          id = res.body.data._id;
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  describe('creating new note without Description', () => {
    const inputBody = {
      "title": "title Note"
    }
    it('DescriptionShouldBeRequired', (done) => {
      request(app)
        .post('/api/v1/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  describe('creating new note without Title', () => {
    const inputBody = {
      "description": "Description Note"
    }
    it('TitleShouldBeRequired', (done) => {
      request(app)
        .post('/api/v1/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  describe('Get All notes of the user', () => {
    it('AllNotesFetchedSuccessfully', (done) => {
      request(app)
        .get('/api/v1/notes/')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          //console.log(res.body);
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  describe('Get note by id', () => {
    it('NoteWithParticularIdIsFetchedSuccessfully', (done) => {
      request(app)
        .get(`/api/v1/notes/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });

  describe('Update The Note', () => {
    const inputBody = {
      "title": "Updated Titel",
      "description": "Updated Description"
    }
    it('NoteUpdatedSuccessfully', (done) => {
      request(app)
        .put(`/api/v1/notes/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });

  describe('Delete note by id', () => {
    it('GivenNoteShouldBeDeletedFromDatabaseById', (done) => {
      request(app)
        .delete(`/api/v1/notes/${id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          console.log(res.body);
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });
});

import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { redisCheckGetAll, redisCheckGetById } from '../middlewares/redis.middleware';

const router = express.Router();


//route to create a new note
router.post('/', newNoteValidator, userAuth, noteController.createNote);

//route to get all notes
router.get('/', userAuth,redisCheckGetAll, noteController.getAll);

//route to update a note by its id
router.put('/:_id', userAuth, noteController.updateNote);

//routes to get a note by id
router.get('/:_id', userAuth, noteController.getById);

//router to delete a note by id
router.delete('/:_id', userAuth, noteController.deleteById);

//router to add note in trash by id
router.put('/:_id/trash', userAuth, noteController.trashIn);

//router to remove note from trash by id
router.put('/:_id/trashout', userAuth, noteController.trashOut);

//router to add note in archive by id
router.put('/:_id/archive', userAuth, noteController.archiveIn);

//router to remove note from archive by id
router.put('/:_id/archiveout', userAuth, noteController.archiveOut);

export default router;
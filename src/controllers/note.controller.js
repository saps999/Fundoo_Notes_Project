import HttpStatus from 'http-status-codes';
import logger from '../config/logger';
import * as NoteService from '../services/note.service';

export const createNote = async (req, res, next) => {
    try {
        const data = await NoteService.createNote(req.body);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Note created successfully'
        });
        logger.log('info','created note successfully')
    } catch (error) {
        next(error);
        logger.log('error','error in creatin note')
    }
};

export const updateNote = async (req, res, next) => {
    try {
        const data = await NoteService.updateNote(req.body.userId, req.params._id, req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Note updated successfully'
        });
        logger.log('info','updated note successfully')
    } catch (error) {
        next(error);
        logger.log('error','error in updating note')
    }
};

export const getAll = async (req, res, next) => {
    try {
        const data = await NoteService.getAll(req.body.userId);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: "All notes fetched successfully"
        })
        logger.log('info','Fetched all notes successfully')
    } catch (error) {
        next(error)
        logger.log('error','error in fetching all notes')
    }
};

export const getById = async (req, res, next) => {
    try {
        const data = await NoteService.getById(req.body.userId, req.params._id);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Note fetched successfully'
        });
        logger.log('info','Fetched note successfully')
    } catch (error) {
        next(error);
        logger.log('error','error in fetching note')
    }
};

export const deleteById = async (req, res, next) => {
    try {
        const data = await NoteService.deleteById(req.body.userId, req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Note deleted successfully'
        });
        logger.log('info','Deleted note successfully')
    } catch (error) {
        next(error);
        logger.log('error','error in deleting note')
    }
};

export const trashIn = async (req, res, next) => {
    try {
        const data = await NoteService.trashIn(req.params._id, req.body.userId);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Note added to trash'
        });
        logger.log('info','trashed in note successfully')
    } catch (error) {
        next(error);
        logger.log('error','error in trashing in note')
    }
};

export const trashOut = async (req, res, next) => {
    try {
        const data = await NoteService.trashOut(req.params._id, req.body.userId);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Note removed from trash'
        });
        logger.log('info','trashed out note successfully')
    } catch (error) {
        next(error);
        logger.log('error','error in trashing out note')
    }
};

export const archiveIn = async (req, res, next) => {
    try {
        const data = await NoteService.archiveIn(req.params._id, req.body.userId);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Note added to archive'
        });
        logger.log('info','archived in note successfully')
    } catch (error) {
        next(error);
        logger.log('error','error in archiving in note')
    }
};

export const archiveOut = async (req, res, next) => {
    try {
        const data = await NoteService.archiveOut(req.params._id, req.body.userId);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Note removed from archive'
        });
        logger.log('info','archived out note successfully')
    } catch (error) {
        next(error);
        logger.log('error','error in archiving out note')
    }
};
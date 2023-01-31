import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

export const createNote = async (req, res, next) => {
    try {
        const data = await NoteService.createNote(req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Note created successfully'
        });
    } catch (error) {
        next(error);
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
    } catch (error) {
        next(error);
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
    } catch (error) {
        next(error)
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
    } catch (error) {
        next(error);
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
    } catch (error) {
        next(error);
    }
};
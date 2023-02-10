import HttpStatus from 'http-status-codes'
import { client } from '../config/redis'

export const redisCheckGetAll = async (req, res, next) => {

    const radisData = await client.get('getAllNotes')
    const notes = JSON.parse(radisData);
    if (notes != null) {
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: notes,
            message: 'notes fetched from redis successfully'
        });
    } else {
        next();
    }
}

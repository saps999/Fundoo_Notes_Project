import { id } from '@hapi/joi/lib/base';
import Note from '../models/notes.model';

export const createNote = async (body) => {
  const note = await Note.create(body);
  return note;
}

export const updateNote = async (userId, _id, body) => {
  const data = await Note.findByIdAndUpdate(
    {
      userId,
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

export const getAll = async (userId) => {
  const data = await Note.find({ userId: userId });
  return data
};

// export const getById = async (userId,_id) => {
//   const data = await Note.findById(userId,_id);
//   return data;
// };

export const getById = async (userId, _id) => {
  const data = await Note.find({ userId: userId, _id: _id });
  return data;
};

export const deleteById = async (userId, _id) => {
  await Note.findOneAndDelete({ userId: userId, _id: _id });
  return '';
};
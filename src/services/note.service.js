import { id } from '@hapi/joi/lib/base';
import Note from '../models/notes.model';

export const createNote = async (body) => {
  const note = await Note.create(body);
  return note;
}

export const updateNote = async (_id, body) => {
  const data = await Note.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

export const getAll= async ()=>{
  const data = await Note.find();
  return data
};

export const getById = async (_id) => {
  const data = await Note.findById(_id);
  return data;
};

export const deleteById = async (_id) => {
  await Note.findByIdAndDelete(_id);
  return '';
};
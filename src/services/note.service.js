import { id } from '@hapi/joi/lib/base';
import Note from '../models/notes.model';
import { client } from '../config/redis';

export const createNote = async (body) => {
  const note = await Note.create(body);
  await client.DEL('getAllNotes');
  return note;
}

export const updateNote = async ( _id, body) => {
  const data = await Note.findOneAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  await client.DEL('getAllNotes');
  return data;
};

export const getAll = async (userId) => {
  const data = await Note.find({ userId: userId, trash: false, archive: false  });
  await client.set('getAllNotes',JSON.stringify(data));
  return data
};

export const getById = async (userId, _id) => {
  const data = await Note.find({ userId: userId, _id: _id });
  return data;
};

export const deleteById = async (userId, _id) => {
  await Note.findOneAndDelete({ userId: userId, _id: _id, trash: false, archive: false });
  return '';
};

export const trashIn = async (_id, userId) => {
  const data = await Note.findOneAndUpdate(
    {
      _id,
      userId: userId
    },
    { trash: true },
    { new: true }
  );
  return data;
};

export const trashOut = async (_id, userId) => {
  const data = await Note.findOneAndUpdate(
    {
      _id,
      userId: userId
    },
    { trash: false },
    { new: true }
  );
  return data;
};

export const archiveIn = async (_id, userId) => {
  const data = await Note.findOneAndUpdate(
    {
      _id,
      userId: userId
    },
    { archive: true },
    { new: true }
  );
  return data;
};

export const archiveOut = async (_id, userId) => {
  const data = await Note.findOneAndUpdate(
    {
      _id,
      userId: userId
    },
    { archive: false },
    { new: true }
  );
  return data;
};

const Note = require('../models/Note');

const createNoteService = {
  preProcess: async ({ req, res }) => {
    const { title, content } = req.body;
    const userId = req.user.userId;
    console.log(userId);
    return { title, content, userId };
  },
  process: async (data) => {
    const { title, content, userId } = data;
    const note = await Note.create({ title, content, owner: userId });
    return { note };
  },
  postProcess: async (result, res) => {
    const { note } = result;
    res.status(201).json({ note });
  },
};

const getAllNotesService = {
  preProcess: async ({ req, res }) => {
    const userId = req.user.userId;
    return { userId };
  },
  process: async (data) => {
    const { userId } = data;
    const notes = await Note.find({ owner: userId });
    return { notes };
  },
  postProcess: async (result, res) => {
    const { notes } = result;
    res.json({ notes });
  },
};

const getNoteByIdService = {
  preProcess: async ({ req, res }) => {
    const { id } = req.params;
    const userId = req.user.userId;
    return { id, userId };
  },
  process: async (data) => {
    const { id, userId } = data;
    const note = await Note.findOne({ _id: id, owner: userId });
    if (!note) {
      throw new Error('Note not found');
    }
    return { note };
  },
  postProcess: async (result, res) => {
    const { note } = result;
    res.json({ note });
  },
};

const updateNoteService = {
  preProcess: async ({ req, res }) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.userId;
    return { id, title, content, userId };
  },
  process: async (data) => {
    const { id, title, content, userId } = data;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, owner: userId },
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      throw new Error('Note not found');
    }
    return { updatedNote };
  },
  postProcess: async (result, res) => {
    const { updatedNote } = result;
    res.json({ note: updatedNote });
  },
};

const deleteNoteService = {
  preProcess: async ({ req, res }) => {
    const { id } = req.params;
    const userId = req.user.userId;
    return { id, userId };
  },
  process: async (data) => {
    const { id, userId } = data;
    const deletedNote = await Note.findOneAndDelete({ _id: id, owner: userId });
    if (!deletedNote) {
      throw new Error('Note not found');
    }
  },
  postProcess: async (res) => {
    res.status(204).end();
  },
};

const shareNoteService = {
  preProcess: async ({ req, res }) => {
    const { id } = req.params;
    const { targetUserEmail } = req.body;
    const userId = req.user.userId;
    return { id, targetUserEmail, userId };
  },
  process: async (data) => {
    const { id, targetUserEmail, userId } = data;

    const targetUser = await User.findOne({ email: targetUserEmail });
    if (!targetUser) {
      throw new Error('Target user not found');
    }

    const note = await Note.findOne({ _id: id, owner: userId });
    if (!note) {
      throw new Error('Note not found');
    }

    if (note.sharedWith.includes(targetUser._id)) {
      throw new Error('Note already shared with the target user');
    }

    note.sharedWith.push(targetUser._id);
    await note.save();
  },
  postProcess: async (res) => {
    res.status(204).end();
  },
};


const searchNotesService = {
  preProcess: async ({ req, res }) => {
    const { q } = req.query;
    const userId = req.user.userId;
    return { q, userId };
  },
  process: async (data) => {
    const { q, userId } = data;

    const results = await Note.find({ owner: userId, $text: { $search: q } });
    return { results };
  },
  postProcess: async (result, res) => {
    const { results } = result;
    res.json({ results });
  },
};


module.exports = {
  createNoteService,
  getAllNotesService,
  getNoteByIdService,
  updateNoteService,
  deleteNoteService,
  shareNoteService,
  searchNotesService,
};

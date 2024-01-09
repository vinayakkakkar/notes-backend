const noteServices = require('../services/noteService');

const createNote = async (req, res, next) => {
  try {
    const { preProcess, process, postProcess } = noteServices.createNoteService;
    const preProcessArray = Array.isArray(preProcess) ? preProcess : [preProcess];
    const preProcessData = await preProcessArray.reduce(async (data, middleware) => middleware(await data), Promise.resolve({ req, res }));
    const result = await process(preProcessData);
    await postProcess(result, res);
  } catch (error) {
    next(error);
  }
};

const getAllNotes = async (req, res, next) => {
  try {
    const { preProcess, process, postProcess } = noteServices.getAllNotesService;
    const preProcessArray = Array.isArray(preProcess) ? preProcess : [preProcess];
    const preProcessData = await preProcessArray.reduce(async (data, middleware) => middleware(await data), Promise.resolve({ req, res }));
    const result = await process(preProcessData);
    await postProcess(result, res);
  } catch (error) {
    next(error);
  }
};

const getNoteById = async (req, res, next) => {
  try {
    const { preProcess, process, postProcess } = noteServices.getNoteByIdService;
    const preProcessArray = Array.isArray(preProcess) ? preProcess : [preProcess];
    const preProcessData = await preProcessArray.reduce(async (data, middleware) => middleware(await data), Promise.resolve({ req, res }));
    const result = await process(preProcessData);
    await postProcess(result, res);
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const { preProcess, process, postProcess } = noteServices.updateNoteService;
    const preProcessArray = Array.isArray(preProcess) ? preProcess : [preProcess];
    const preProcessData = await preProcessArray.reduce(async (data, middleware) => middleware(await data), Promise.resolve({ req, res }));
    const result = await process(preProcessData);
    await postProcess(result, res);
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const { preProcess, process, postProcess } = noteServices.deleteNoteService;
    const preProcessArray = Array.isArray(preProcess) ? preProcess : [preProcess];
    const preProcessData = await preProcessArray.reduce(async (data, middleware) => middleware(await data), Promise.resolve({ req, res }));
    const result = await process(preProcessData);
    await postProcess(result, res);
  } catch (error) {
    next(error);
  }
};

const shareNote = async (req, res, next) => {
  try {
    const { preProcess, process, postProcess } = noteServices.shareNoteService;
    const preProcessArray = Array.isArray(preProcess) ? preProcess : [preProcess];
    const preProcessData = await preProcessArray.reduce(async (data, middleware) => middleware(await data), Promise.resolve({ req, res }));
    const result = await process(preProcessData);
    await postProcess(result, res);
  } catch (error) {
    next(error);
  }
};

const searchNotes = async (req, res, next) => {
  try {
    const { preProcess, process, postProcess } = noteServices.searchNotesService;
    const preProcessArray = Array.isArray(preProcess) ? preProcess : [preProcess];
    const preProcessData = await preProcessArray.reduce(async (data, middleware) => middleware(await data), Promise.resolve({ req, res }));
    const result = await process(preProcessData);
    await postProcess(result, res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  shareNote,
  searchNotes,
};

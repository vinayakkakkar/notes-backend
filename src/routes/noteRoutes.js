const express = require('express');
const noteController = require('../controllers/noteController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticateToken);

router.post('/notes', noteController.createNote);
router.get('/notes', noteController.getAllNotes);
router.get('/notes/:id', noteController.getNoteById);
router.put('/notes/:id', noteController.updateNote);
router.delete('/notes/:id', noteController.deleteNote);
router.post('/notes/:id/share', noteController.shareNote);
router.get('/search', noteController.searchNotes);

module.exports = router;

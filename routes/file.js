const express = require('express');
const multer = require('multer');
const { uploadFile, getFile, getFilePublic } = require('../controllers/fileController');
const { authenticateApiKey } = require('../middleware/auth');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', authenticateApiKey, upload.single('file'), uploadFile);
router.get('/:id', getFile);
router.get('/public/:id', getFilePublic);

module.exports = router;

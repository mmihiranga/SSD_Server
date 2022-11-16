const router = require('express').Router();
const { uploadFile } = require('../controllers/file.controller');
const upload = require("../middleware/multer.middleware")

const { verifyManagerAuth } = require('../middleware/auth.manager.middleware');

router.post('/upload', verifyManagerAuth,upload.single('file'), uploadFile);

module.exports = router;

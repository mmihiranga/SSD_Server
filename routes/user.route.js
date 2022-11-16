const router = require('express').Router();
const { saveUser, getUsers, loginUser, deleteUser, getUser, checkLoggedIn } = require('../controllers/user.controller');
const { verifyAdminAuth } = require('../middleware/auth.admin.middleware');

router.get('/', verifyAdminAuth, getUsers);
router.post('/register', saveUser);
router.post('/login', loginUser);
router.get('/logged', checkLoggedIn);
router.get('/:id', verifyAdminAuth, getUser);
router.delete('/:id', verifyAdminAuth, deleteUser);

module.exports = router;

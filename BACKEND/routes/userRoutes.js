const express = require('express');
const { addUser,getAllUsers} = require('../controllers/userController');

const router = express.Router();

// Route to add a new user
router.post('/add', addUser);

router.get('/getallusers', getAllUsers);

module.exports = router;

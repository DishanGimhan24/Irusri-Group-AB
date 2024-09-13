const express = require('express');
const router = express.Router();
const { getAllTodos,addTodo,updateTodo,deleteTodo,getTodoById,toggleTodoCompletion} = require('../controllers/todoController.js');
// Get all todos
router.get('/all', getAllTodos);

// Add a new todo
router.post('/new',addTodo);

// Update a todo
router.patch('/edit/:id', updateTodo);

// Delete a todo
router.delete('/:id', deleteTodo);

router.get('/:id', getTodoById);



// Route to toggle completion status of a todo
router.patch('/toggle/:id', toggleTodoCompletion);

module.exports = router;

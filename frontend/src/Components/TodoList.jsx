import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all"); // Possible values: "all", "completed", "incomplete"

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:8070/api/todo/all');
                setTodos(response.data);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/api/todo/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleToggle = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:8070/api/todo/toggle/${id}`);
            setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
        } catch (error) {
            console.error('Error toggling todo completion:', error);
        }
    };

    // Filtering todos based on search term and status filter
    const filteredTodos = todos.filter(todo => {
        const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              todo.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filter === "all" || 
                              (filter === "completed" && todo.completed) ||
                              (filter === "incomplete" && !todo.completed);
        return matchesSearch && matchesStatus;
    });

    return (
        <section className="vh-100" style={{ backgroundColor: '#eee' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-12 col-xl-10">
                        <div className="card rounded-3 shadow-lg">
                            <div className="card-body p-4">
                                <h4 className="text-center my-3 pb-3">To Do App</h4>

                                {/* Search and Filter Controls */}
                                <div className="d-flex mb-4">
                                    <input
                                        type="text"
                                        placeholder="Search tasks..."
                                        className="form-control me-2"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <select 
                                        className="form-select"
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                    >
                                        <option value="all">All</option>
                                        <option value="completed">Completed</option>
                                        <option value="incomplete">Incomplete</option>
                                    </select>
                                </div>

                                {/* Add Todo Button */}
                                <Link to="/todo/add" className="btn btn-primary mb-3">Add Todo</Link>

                                {/* Todos Table */}
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">No.</th>
                                            <th scope="col">Todo Task</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Created At</th>
                                            <th scope="col">Updated At</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTodos.map((todo, index) => (
                                            <tr key={todo._id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{todo.title}</td>
                                                <td>{todo.description}</td>
                                                <td>
                                                    <span
                                                        title={moment(todo.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                                    >
                                                        {moment(todo.createdAt).format('MMM Do YYYY')}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span
                                                        title={moment(todo.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                                                    >
                                                        {moment(todo.updatedAt).format('MMM Do YYYY')}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`badge ${todo.completed ? 'bg-success' : 'bg-warning'}`}>
                                                        {todo.completed ? 'Complete' : 'Incomplete'}
                                                    </span>
                                                </td>
                                                <td className="d-flex justify-content-start align-items-center">
                                                    <button
                                                        onClick={() => handleToggle(todo._id)}
                                                        className={`btn btn-${todo.completed ? 'warning' : 'success'} btn-sm me-2`}
                                                    >
                                                        {todo.completed ? 'Incomplete' : 'Complete'}
                                                    </button>
                                                    <Link to={`/todo/edit/${todo._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                                    <button onClick={() => handleDelete(todo._id)} className="btn btn-danger btn-sm">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TodoList;

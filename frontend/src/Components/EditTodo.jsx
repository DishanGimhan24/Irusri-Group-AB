import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
// Custom CSS file for additional styling

const EditTodo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/api/todo/${id}`);
                const todo = response.data;
                setTitle(todo.title);
                setDescription(todo.description);
                setCompleted(todo.completed);
            } catch (error) {
                console.error('Error fetching todo:', error);
            }
        };

        fetchTodo();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:8070/api/todo/edit/${id}`, { title, description, completed });
            setSuccessMessage('Todo updated successfully!');
            setErrorMessage('');
            setTimeout(() => navigate('/todo'), 2000); // Redirect after 2 seconds
        } catch (error) {
            setErrorMessage('Error updating todo.');
            setSuccessMessage('');
            console.error('Error updating todo:', error);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-6">
                    <div className="card shadow-lg border-0 rounded-lg">
                        <div className="card-body">
                            <h3 className="card-title mb-4 text-center">Edit Todo</h3>
                            {successMessage && (
                                <div className="alert alert-success mb-3" role="alert">
                                    {successMessage}
                                </div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-danger mb-3" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    
                                    <input
                                        type="text"
                                        id="title"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    
                                    <textarea
                                        id="description"
                                        className="form-control"
                                        rows="4"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        id="completed"
                                        className="form-check-input"
                                        checked={completed}
                                        onChange={(e) => setCompleted(e.target.checked)}
                                    />
                                    <label htmlFor="completed" className="form-check-label">Completed</label>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary rounded-pill px-4 py-2">Update Todo</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTodo;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap's JS bundle
import '../Css/UserReg.css'; 

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  // Password validation info
  const passwordInfo = "Password must be at least 6 characters long, contain one uppercase letter, and one special character.";

  // Form validation logic
  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;

    if (!formData.name) {
      tempErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      tempErrors.name = 'Name must be at least 3 characters long';
    }

    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Email is not valid';
    }

    if (!formData.password) {
      tempErrors.password = 'Password must contain at least 6 characters, one uppercase letter, and one special character.';
    } else if (!passwordRegex.test(formData.password)) {
      tempErrors.password = 'Password does not meet the requirements';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post('http://localhost:8070/api/user/add', formData);
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 1000); // Navigate to /login upon success
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding user');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm custom-card-width">
        <div className="card-header text-center">
          <h4 className="mb-0">Registration Form</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-person"></i></span>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-lock"></i></span>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {/* Info Icon with Tooltip inside the input */}
                <span
                  className="input-group-text"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title={passwordInfo}
                >
                  <i className="bi bi-info-circle"></i>
                </span>
              </div>
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100 custom-width-button">Submit</button>

            <div className="text-center mt-3 bg-light p-3 rounded">
              <p className="mb-0">Already have an account? <a href="/login" className="btn btn-link">Sign In</a></p>
            </div>
          </form>
        </div>
        {message && (
          <div className="card-footer text-center mt-3">
            <p className="alert alert-success" style={{ backgroundColor: '#d4edda', color: '#155724' }}>
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserForm;

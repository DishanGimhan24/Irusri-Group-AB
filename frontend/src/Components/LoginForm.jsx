import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/Login.css'; 

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8070/api/user/getallusers');
        setUsers(response.data);
        console.log("Fetched users data:", response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login form submitted");

    const user = users.find(user => user.email === email);

    if (!user) {
      setMessage("Invalid Email");
      console.log("Invalid Email");
      return;
    }

    if (user.password !== password) {
      setMessage("Incorrect Password");
      console.log("Incorrect Password");
      return;
    }

    setMessage("Login successful");
    console.log("Login successful");

    if (rememberMe) {
      localStorage.setItem('userEmail', user.email);
    } else {
      sessionStorage.setItem('userEmail', user.email);
    }

    onLoginSuccess(user.email); // Trigger login success in parent App component

    setTimeout(() => {
      navigate("/todo", { state: { userEmail: user.email } });
    }, 1000); // 1 second delay
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img 
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" 
              className="img-fluid" 
              alt="Login illustration" 
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleLogin}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="bi bi-facebook"></i>
                </button>
                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="bi bi-twitter"></i>
                </button>
                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="bi bi-linkedin"></i>
                </button>
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

              {message && (
                <div className={`alert ${message === "Login successful" ? 'alert-success' : 'alert-danger'} mb-3`} role="alert">
                  {message}
                </div>
              )}

              {loading ? (
                <div className="text-center">
                  <p>Loading...</p>
                </div>
              ) : (
                <>
                  <div className="input-group mb-4">
                    <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter a valid email address"
                      required
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                    />
                  </div>
                </>
              )}

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account? <a href="/" className="link-danger">Register</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2024. All rights reserved.
        </div>
        <div>
          <a href="#!" className="text-white me-4">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="bi bi-google"></i>
          </a>
          <a href="#!" className="text-white">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Login;

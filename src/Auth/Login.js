import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const errors = validate(formData);
        setFormErrors(errors);
        
        if (Object.keys(errors).length === 0) {
            const response = await fetch(`http://localhost:5000/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('user_id', data.data.user_id)
                localStorage.setItem('full_name', data.data.full_name)
                localStorage.setItem('role', data.data.role)
                localStorage.setItem('token', data.data.auth_token)
                navigate("/")
                window.location.reload();
            } else {
                toast.error(data.message);
            }
        }
    }

    const validate = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = 'Username is required';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <>
            <div className="container-scroller d-flex">
                <div className="container-fluid page-body-wrapper full-page-wrapper d-flex">
                    <div className="content-wrapper d-flex align-items-stretch auth auth-img-bg">
                        <div className="row flex-grow">
                            <div className="col-lg-6 d-flex align-items-center justify-content-center">
                                <div className="auth-form-transparent text-left p-3">
                                    <div className="brand-logo">
                                        <img src="assets/images/logo-1.png" alt="logo" />
                                    </div>
                                    <h4>Welcome back!</h4>
                                    <h6 className="font-weight-light">Happy to see you again!</h6>
                                    <form className="pt-3" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="username">Username</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend bg-transparent">
                                                    <span className="input-group-text bg-transparent border-right-0">
                                                        <i className="mdi mdi-account-outline text-warning"></i>
                                                    </span>
                                                </div>
                                                <input type="text"
                                                    className={`form-control form-control-lg border-left-0 ${formErrors.username ? 'is-invalid' : ''}`}
                                                    id="username"
                                                    placeholder="Username"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                />
                                                {formErrors.username && <div className="invalid-feedback">{formErrors.username}</div>}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend bg-transparent">
                                                    <span className="input-group-text bg-transparent border-right-0">
                                                        <i className="mdi mdi-lock-outline text-warning"></i>
                                                    </span>
                                                </div>
                                                <input type="password"
                                                    className={`form-control form-control-lg border-left-0 ${formErrors.password ? 'is-invalid' : ''}`}
                                                    id="password"
                                                    placeholder="Password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                                {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                                            </div>
                                        </div>
                                        <div className="my-3">
                                            <button type="submit" className="btn btn-inverse-warning btn-fw btn-lg font-weight-medium auth-form-btn">LOGIN</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 login-half-bg d-none d-lg-flex flex-row">
                                <p className="text-white font-weight-medium text-center flex-grow align-self-end">Copyright &copy; 2024  All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

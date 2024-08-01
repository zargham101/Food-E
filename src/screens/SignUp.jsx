import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './SignUp.css';

export default function SignUp() {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/createuser", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.location
                })
            });

            const json = await response.json();
            console.log(json);

            if (!response.ok) {
                alert("Invalid Credentials");
            }

            if (json.success) {
                //save the auth toke to local storage and redirect
                localStorage.setItem('token', json.authToken)
                navigate("/login")

            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred while submitting the form. Please try again later.");
        }

    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='container d-flex justify-content-center align-items-center vh-100'>
                <div className='form-wrapper p-4 rounded'>
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" name='location' value={credentials.location} onChange={onChange} />
                        </div>
                        <button type="submit" className="m-3 btn btn-success w-100">Submit</button>
                        <Link to="/login" className='m-3 btn btn-danger w-100'>Already a User</Link>
                    </form>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

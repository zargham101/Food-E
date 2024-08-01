import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Login.css';

export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/loginuser", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            });

            const json = await response.json();
            console.log(json);

            if (!response.ok) {
                alert("Invalid Credentials");
            }
            if (response.ok) {
                localStorage.setItem("userEmail", credentials.email);
                localStorage.setItem("authToken", json.authToken);
                console.log(localStorage.getItem("authToken"));
                navigate("/");
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
        <div >
            <div>
                <Navbar />
            </div>
            <div className="login-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2 className="mb-4 text-center">Login</h2>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: 'black' }}>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            name='email'
                            value={credentials.email}
                            onChange={onChange}
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            required
                            style={{ backgroundColor: '#fff' }}
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label " style={{ color: 'black' }}>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            name='password'
                            value={credentials.password}
                            onChange={onChange}
                            required
                            style={{ backgroundColor: '#fff' }}
                        />
                    </div>
                    <button type="submit" className="m-3 btn btn-success w-100">Submit</button>
                    <Link to="/signUp" className='m-3 btn btn-danger w-100 text-center'>New User? Sign Up</Link>
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

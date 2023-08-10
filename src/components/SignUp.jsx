import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './style/SignIn.css'
import { useDispatch } from 'react-redux';
import { register } from './redux/actions';

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://node-express-conduit.appspot.com/api/users",
                {
                    "user": {
                        "username": username,
                        "email": email,
                        "password": password
                    }
                }
            );
            const token = response.data.user.token;
            localStorage.setItem("token", token);
            dispatch(register(token));
            navigate("/");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const errorMessages = error.response.data.errors;
                if (Array.isArray(errorMessages)) {
                    setError(errorMessages.join(", "));
                } else if (typeof errorMessages === "object") {
                    const messageArray = Object.entries(errorMessages).map(([key, value]) => `${key} ${value}`);
                    setError(messageArray);
                } else {
                    setError("An error occurred");
                }
            } else {
                setError("An error occurred");
            }
        }
    };

    return (
        <div>
            <div class="container page">
                <div class="row">
                    <div class="col-md-6 offset-md-3 col-xs-12">
                        <h1 class="text-xs-center">Sign Up</h1>
                        <p class="text-xs-center">
                            <Link to="/login">Have an account?</Link>
                        </p>
                        {error && (
                            <div style={{ color: "red" }}>
                                {Array.isArray(error) ? (
                                    error.map((errorMessage, index) => (
                                        <li key={index}>{errorMessage}</li>
                                    ))
                                ) : (
                                    <li>{error}</li>
                                )}
                            </div>
                        )}
                        <form onSubmit={handleSignUp}>
                            <div class="form-group">
                                <input
                                    class="form-control form-control-lg"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div class="form-group">
                                <input
                                    class="form-control form-control-lg"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div class="form-group">
                                <input
                                    class="form-control form-control-lg"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div class="form-group d-flex justify-content-center mt-3">
                                <button class="btn btn-lg btn-primary" type="submit">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

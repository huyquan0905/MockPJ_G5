import React, { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from './redux/actions';

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accesstoken = (localStorage.getItem("token"));
    console.log(accesstoken);

    useEffect(() => {
        if(accesstoken){
            navigate('/')
        }
    }, [accesstoken, navigate])

    const handleSignIn = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(
                "https://node-express-conduit.appspot.com/api/users/login",
                {
                    "user": {
                        "email": email,
                        "password": password
                    }
                }
            );
            const token = response.data.user.token;
            localStorage.setItem("token", token);
            dispatch(login(token));

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
                        <h1 class="text-xs-center">Sign In</h1>
                        <p class="text-xs-center">
                            <Link to="/signup">Need an account?</Link>
                        </p>
                        {error && <li style={{ color: "red" }}>{error}</li>}
                        <form onSubmit={handleSignIn}>
                            <div className="form-group">
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
                                <button class="btn btn-lg btn-primary" type="submit">Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
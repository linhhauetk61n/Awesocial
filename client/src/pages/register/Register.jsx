import React from "react";
import "./register.css";
import AuthPage from "../../components/authPage/AuthPage";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../../actions/AuthActions";
import { Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [comfirmPassword, setConfirmPassword] = React.useState("");

    const isFetching = useSelector((state) => state.user.isFetching);
    const dispatch = useDispatch();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== comfirmPassword) {
            console.log("Password isnt matched");
        } else {
            const user = { username, email, password };
            dispatch(register(user));
        }
    };
    return (
        <AuthPage>
            <div className="registerBox">
                <form className="registerForm" onSubmit={handleRegister}>
                    <input
                        type="text"
                        className="registerInput"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        className="registerInput"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="registerInput"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        className="registerInput"
                        placeholder="Password Confirm"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button className="registerButton">
                        {isFetching ? (
                            <CircularProgress
                                style={{ color: "white" }}
                                size="20px"
                            />
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>
                <Link to="/login" className="alink">
                    Log into a account
                </Link>
            </div>
        </AuthPage>
    );
};

export default Register;

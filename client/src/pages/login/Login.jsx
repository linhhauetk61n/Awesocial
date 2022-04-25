import React from "react";
import "./login.css";
import AuthPage from "../../components/authPage/AuthPage";

import { CircularProgress } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/AuthActions";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const isFetching = useSelector((state) => state.user.isFetching);
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };
    return (
        <AuthPage>
            <div className="loginBox">
                <form className="loginForm" onSubmit={handleLogin}>
                    <input
                        type="email"
                        className="loginInput"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="loginInput"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="loginButton">
                        {isFetching ? (
                            <CircularProgress
                                style={{ color: "white" }}
                                size="20px"
                            />
                        ) : (
                            "Log In"
                        )}
                    </button>
                </form>

                <span className="loginForgot">Forgot Password?</span>
                <a className="alink" href="/register">
                    Create a new account
                </a>
            </div>
        </AuthPage>
    );
};

export default Login;

import React from "react";
import "./authPage.css";

const AuthPage = ({ children }) => {
    return (
        <div className="auth">
            <div className="authWrapper">
                <div className="authLeft">
                    <h3 className="authLogo">Awesocial</h3>
                    <span className="authDesc">
                        Connect with friends and the world around you on
                        Awesocial
                    </span>
                </div>
                <div className="authRight">{children}</div>
            </div>
        </div>
    );
};

export default AuthPage;

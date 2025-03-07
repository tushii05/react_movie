import { NavLink } from 'react-router-dom';

const Welcome = () => {
    return (
        <div className="welcome-page">
            <h1>Welcome to ThapaFlix</h1>
            <div className="auth-links">
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </div>
        </div>
    );
};

export default Welcome;
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import { isAuthenticated } from '../components/utils/auth';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/');
        }
    }, [navigate]);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password);
            navigate('/login');
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    return (<div style={{ display: "flex", justifyContent: "center", marginTop: "200px" }}>
        <form onSubmit={handleSignup} style={{ maxWidth: '400px', backgroundColor: '#f7f7f7', borderRadius: '30px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>SignUp</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #e3eaf0', fontSize: '1rem' }}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #e3eaf0', fontSize: '1rem' }}
            />
            <button
                type="submit"
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#4b4f56',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#535bf2')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#4b4f56')}
            >
                SignUp
            </button>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <p>
                        Already have an account?{' '}
                        <span
                            onClick={() => navigate('/login')}
                            style={{
                                color: '#535bf2',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                            }}
                        >
                            Login here
                        </span>
                    </p>
                </div>
        </form></div>
    );
};

export default Signup;
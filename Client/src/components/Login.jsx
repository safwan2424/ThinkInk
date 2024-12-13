import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';

function Login() {
    const [redirect, setRedirect] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUserInfo } = useContext(UserContext);
    const [error, setError] = useState('');

    async function logs(ev) {
        ev.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Ensures cookies are included in the request
            });

            if (response.ok) {
                response.json().then(userInfo => {
                    setUserInfo(userInfo);
                    setRedirect(true);
                });
            } else {
                const errData = await response.json();
                setError(errData.error || 'Login failed');
            }
        } catch (err) {
            setError('Unable to connect to server');
        }
    }

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-gray-400">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full backdrop-blur-lg bg-opacity-40">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-semibold text-gray-800 mb-2">Welcome Back!</h1>
                    <p className="text-lg text-gray-500 italic">Where ideas flow, and stories grow. Your own blog app.</p>
                </div>
                <form className="space-y-6" onSubmit={logs}>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                            <PersonIcon className="text-gray-600" />
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <PasswordIcon className="text-gray-600" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;

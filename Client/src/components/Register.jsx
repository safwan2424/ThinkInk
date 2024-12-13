import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    async function registering(e) {
        e.preventDefault();

        // Client-side validation
        if (!username || !password) {
            setAlertMessage('Please fill out both fields.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User registered successfully:', data);
                setAlertMessage('Registration successful!');
                setUsername('');
                setPassword('');
            } else {
                const errorData = await response.json();
                setAlertMessage(errorData.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setAlertMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-gray-400">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full backdrop-blur-lg bg-opacity-40">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-semibold from-neutral-300 to-gray-600 text-gray-600 mb-2 font-mono ">Create Your Account</h1>
                    <p className="text-lg text-gray-500 italic ">Where ideas flow, and stories grow. Your own blog app.</p>
                </div>
                <form className="register space-y-6" onSubmit={registering}>
                    {alertMessage && (
                        <div
                            className={`p-3 text-white rounded text-center ${
                                alertMessage === 'Registration successful!' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                        >
                            {alertMessage}
                        </div>
                    )}
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
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 text-white rounded-lg ${
                            loading ? 'bg-gray-400' : 'bg-indigo-500 hover:bg-indigo-600 transition-all'
                        }`}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;

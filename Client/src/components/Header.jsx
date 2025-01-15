import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserContext } from '../UserContext';
import logo from "../assets/logo.png";

function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const navigate = useNavigate(); // Use useNavigate hook for navigation
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu

    useEffect(() => {
        fetch('https://think-ink-backend.vercel.app/profile', {
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn) {
                    setUserInfo({ id: data.userId, username: data.username });
                } else {
                    console.log(data.message || 'User not logged in.');
                    setUserInfo(null); // Clear user info if no user is logged in
                }
            })
            .catch(error => console.error('Error fetching profile:', error));
    }, [setUserInfo]);

    function logout() {
        fetch('https://think-ink-backend.vercel.app/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null); // Clear user info from context on logout
        navigate('/'); // Redirect to home page after logout
    }

    const username = userInfo?.username;

    return (
        <header className="bg-gray-800 text-white py-4 px-6 shadow-md">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center text-2xl font-semibold hover:text-gray-300 transition-all">
                    <img src={logo} alt="ThinkInk Logo" className="h-10 mr-3" />
                    ThinkInk
                </Link>

                {/* Hamburger Menu Button (Mobile) */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        )}
                    </svg>
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    {username ? (
                        <>
                            <span className="text-lg">Hello, <span className="font-bold">{username}</span></span>
                            <Link to="/create" className="text-lg hover:text-gray-300 transition-colors">Create New Post</Link>
                            <a onClick={logout} className="text-lg cursor-pointer hover:text-gray-300 transition-colors">Logout</a>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-lg hover:text-gray-300 transition-colors">Login</Link>
                            <Link to="/register" className="text-lg hover:text-gray-300 transition-colors">Register</Link>
                        </>
                    )}
                </nav>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="md:hidden mt-4 space-y-4">
                    {username ? (
                        <>
                            <span className="block text-lg text-center">Hello, <span className="font-bold">{username}</span></span>
                            <Link to="/create" className="block text-lg text-center hover:text-gray-300 transition-colors">Create New Post</Link>
                            <a onClick={logout} className="block text-lg text-center cursor-pointer hover:text-gray-300 transition-colors">Logout</a>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block text-lg text-center hover:text-gray-300 transition-colors">Login</Link>
                            <Link to="/register" className="block text-lg text-center hover:text-gray-300 transition-colors">Register</Link>
                        </>
                    )}
                </nav>
            )}
        </header>
    );
}

export default Header;

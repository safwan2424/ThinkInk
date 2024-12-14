// import React, { useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
// import { UserContext } from '../UserContext';
// import logo from "../assets/logo.png";

// function Header() {
//     const { setUserInfo, userInfo } = useContext(UserContext);
//     const navigate = useNavigate(); // Use useNavigate hook for navigation

//     useEffect(() => {
//         fetch('http://localhost:3000/profile', {
//             credentials: 'include',
//         })
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 }
//                 throw new Error('Failed to fetch user info');
//             })
//             .then(userInfo => {
//                 setUserInfo(userInfo); // Correctly setting user info in context
//             })
//             .catch(error => console.error('Error fetching profile:', error));
//     }, [setUserInfo]);

//     function logout() {
//         fetch('http://localhost:3000/logout', {
//             credentials: 'include',
//             method: 'POST',
//         });
//         setUserInfo(null); // Clear user info from context on logout
//         navigate('/'); // Redirect to home page after logout
//     }

//     const username = userInfo?.username;

//     return (
//         <header className="bg-gray-800 text-white py-4 px-6 shadow-md flex justify-between items-center">
//             <Link to="/" className="flex items-center text-2xl font-semibold hover:text-gray-300 transition-all">
//                 <img src={logo} alt="ThinkInk Logo" className="h-10 mr-3" />
//                 ThinkInk
//             </Link>
//             <nav className="flex space-x-6">
//                 {username ? (
//                     <>
//                         <span className="text-lg">Hello, <span className="font-bold">{username}</span></span>
//                         <Link to="/create" className="text-lg hover:text-gray-300 transition-colors">Create New Post</Link>
//                         <a onClick={logout} className="text-lg cursor-pointer hover:text-gray-300 transition-colors">Logout</a>
//                     </>
//                 ) : (
//                     <>
//                         <Link to="/login" className="text-lg hover:text-gray-300 transition-colors">Login</Link>
//                         <Link to="/register" className="text-lg hover:text-gray-300 transition-colors">Register</Link>
//                     </>
//                 )}
//             </nav>
//         </header>
//     );
// }

// export default Header;
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserContext } from '../UserContext';
import logo from "../assets/logo.png";

function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const navigate = useNavigate(); // Use useNavigate hook for navigation

    // useEffect(() => {
    //     fetch('https://think-ink-backend.vercel.app/profile', {
    //         credentials: 'include',
    //     })
    //         .then(response => {
    //             if (response.ok) {
    //                 return response.json();
    //             }
    //             throw new Error('Failed to fetch user info');
    //         })
    //         .then(userInfo => {
    //             setUserInfo(userInfo); // Correctly setting user info in context
    //         })
    //         .catch(error => console.error('Error fetching profile:', error));
    // }, [setUserInfo]);
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
        <header className="bg-gray-800 text-white py-4 px-6 shadow-md flex justify-between items-center">
            <Link to="/" className="flex items-center text-2xl font-semibold hover:text-gray-300 transition-all">
                <img src={logo} alt="ThinkInk Logo" className="h-10 mr-3" />
                ThinkInk
            </Link>
            <nav className="flex space-x-6">
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
        </header>
    );
}

export default Header;

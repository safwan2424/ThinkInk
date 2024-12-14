
// import React, { createContext, useState, useEffect } from 'react';

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//     const [userInfo, setUserInfo] = useState(null); // Initialize as null to handle user not logged in
//     const [loading, setLoading] = useState(true); // To manage the loading state
//     const [error, setError] = useState(null); // To handle errors

//     // useEffect(() => {
//     //     const fetchUserProfile = async () => {
//     //         try {
//     //             const res = await fetch('https://think-ink-backend.vercel.app/profile', {   //https://think-ink-backend.vercel.app  http://localhost:3000
//     //                 credentials: 'include', // Include cookies for authentication
//     //             });
//     //             const data = await res.json();

//     //             if (data.userId) {
//     //                 setUserInfo({ id: data.userId, username: data.username });
//     //             } else {
//     //                 setUserInfo(null); // Set userInfo to null if no user is found
//     //             }
//     //         } catch (err) {
//     //             console.error('Error fetching profile:', err);
//     //             setError('Failed to fetch user data');
//     //             setUserInfo(null); // Reset to null in case of an error
//     //         } finally {
//     //             setLoading(false); // Stop loading once the fetch is complete
//     //         }
//     //     };
//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const res = await fetch('https://think-ink-backend.vercel.app/profile', {
//                     credentials: 'include',
//                 });
//                 const data = await res.json();
    
//                 if (data.loggedIn) {
//                     setUserInfo({ id: data.userId, username: data.username });
//                 } else {
//                     console.log(data.message || 'User not logged in.');
//                     setUserInfo(null); // Set to null if the user is not logged in
//                 }
//             } catch (err) {
//                 console.error('Error fetching profile:', err);
//                 setError('Failed to fetch user data');
//                 setUserInfo(null); // Reset to null in case of an error
//             } finally {
//                 setLoading(false); // Stop loading once the fetch is complete
//             }
//         };
    
//         fetchUserProfile();
    
//         return () => {
//             setLoading(false); // Cleanup on component unmount
//         };
//     }, []);
    
//     //     fetchUserProfile();

//     //     // Clean up function to handle component unmount
//     //     return () => {
//     //         setLoading(false); // Stop loading if component unmounts
//     //     };
//     // }, []);

//     return (
//         <UserContext.Provider value={{ userInfo, setUserInfo, loading, error }}>
//             {children}
//         </UserContext.Provider>
//     );
// }
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState(null); // Initialize as null to handle user not logged in
    const [loading, setLoading] = useState(true); // To manage the loading state
    const [error, setError] = useState(null); // To handle errors

    useEffect(() => {
        // Function to check user profile when page loads or refreshes
        const fetchUserProfile = async () => {
            try {
                const res = await fetch('https://think-ink-backend.vercel.app/profile', {
                    credentials: 'include', // Ensure cookies are sent with the request
                });
                const data = await res.json();

                // If user is logged in, set user info; else, set userInfo to null
                if (data.loggedIn) {
                    setUserInfo({ id: data.userId, username: data.username });
                } else {
                    setUserInfo(null); // Reset user info if not logged in
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Failed to fetch user data');
                setUserInfo(null); // Reset to null in case of an error
            } finally {
                setLoading(false); // Stop loading once the fetch is complete
            }
        };

        fetchUserProfile();

        return () => {
            setLoading(false); // Stop loading if component unmounts
        };
    }, []); // Empty dependency array ensures this effect runs only on page load or refresh

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, loading, error }}>
            {children}
        </UserContext.Provider>
    );
}

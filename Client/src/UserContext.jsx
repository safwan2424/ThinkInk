// import React, { createContext, useState, useEffect } from 'react';

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//     const [userInfo, setUserInfo] = useState({});

//     useEffect(() => {
//         fetch('http://localhost:3000/profile', {
//             credentials: 'include', // Include cookies for authentication
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.userId) {
//                     setUserInfo({ id: data.userId, username: data.username });
//                 }
//             })
//             .catch((err) => {
//                 console.error('Error fetching profile:', err);
//             });
//     }, []);

//     return (
//         <UserContext.Provider value={{ userInfo, setUserInfo }}>
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
        const fetchUserProfile = async () => {
            try {
                const res = await fetch('http://localhost:3000/profile', {
                    credentials: 'include', // Include cookies for authentication
                });
                const data = await res.json();

                if (data.userId) {
                    setUserInfo({ id: data.userId, username: data.username });
                } else {
                    setUserInfo(null); // Set userInfo to null if no user is found
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

        // Clean up function to handle component unmount
        return () => {
            setLoading(false); // Stop loading if component unmounts
        };
    }, []);

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, loading, error }}>
            {children}
        </UserContext.Provider>
    );
}

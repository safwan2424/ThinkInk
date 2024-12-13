
// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { UserContext } from '../UserContext';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import DeleteIcon from '@mui/icons-material/Delete';

// function PostPages() {
//     const [postInfo, setPostInfo] = useState(null);
//     const { userInfo } = useContext(UserContext);
//     const { id } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetch(`http://localhost:3000/post/${id}`)
//             .then((response) => response.json())
//             .then((postInfo) => setPostInfo(postInfo));
//     }, [id]);

//     const deletePost = async () => {
//         const confirmed = window.confirm('Are you sure you want to delete this post?');
//         if (!confirmed) return;

//         try {
//             const response = await fetch(`http://localhost:3000/post/${id}`, {
//                 method: 'DELETE',
//                 credentials: 'include',
//             });

//             if (response.ok) {
//                 alert('Post deleted successfully');
//                 navigate('/');
//             } else {
//                 alert('Failed to delete the post');
//             }
//         } catch (err) {
//             console.error('Error deleting post:', err);
//         }
//     };

//     // Wait until both `postInfo` and `userInfo` are available
//     if (!postInfo || !userInfo) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="post-page">
//             <h1>{postInfo.title}</h1>
//             <time>
//                 {postInfo.createdAt
//                     ? new Date(postInfo.createdAt).toLocaleString()
//                     : 'Date unavailable'}
//             </time>
//             <div className="author">by @{postInfo.author.username}</div>

//             <div className="image">
//                 <img src={`http://localhost:3000/${postInfo.cover}`} alt="Post cover" />
//             </div>

//             {/* Show edit and delete buttons only if the logged-in user is the author */}
//             {userInfo && userInfo.id === postInfo.author._id && (
//                 <div className="edit-row">
//                     <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
//                         <EditNoteIcon /> Edit this post
//                     </Link>
//                     <button className="delete-btn" onClick={deletePost}>
//                         <DeleteIcon /> Delete this post
//                     </button>
//                 </div>
//             )}

//             <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
//         </div>
//     );
// }

// export default PostPages;
// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { UserContext } from '../UserContext';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import DeleteIcon from '@mui/icons-material/Delete';

// function PostPages() {
//     const [postInfo, setPostInfo] = useState(null);
//     const { userInfo } = useContext(UserContext);  // Access userInfo from context
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         // Fetch post info when the component mounts
//         fetch(`http://localhost:3000/post/${id}`)
//             .then((response) => response.json())
//             .then((postInfo) => {
//                 setPostInfo(postInfo);
//                 setIsLoading(false); // Set loading to false once post data is fetched
//             })
//             .catch((err) => {
//                 console.error('Error fetching post:', err);
//                 setIsLoading(false); // Ensure loading state is cleared in case of error
//             });
//     }, [id]);

//     const deletePost = async () => {
//         const confirmed = window.confirm('Are you sure you want to delete this post?');
//         if (!confirmed) return;

//         try {
//             const response = await fetch(`http://localhost:3000/post/${id}`, {
//                 method: 'DELETE',
//                 credentials: 'include',
//             });

//             if (response.ok) {
//                 alert('Post deleted successfully');
//                 navigate('/');
//             } else {
//                 alert('Failed to delete the post');
//             }
//         } catch (err) {
//             console.error('Error deleting post:', err);
//         }
//     };

//     // If postInfo is not loaded, show loading state
//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="post-page">
//             <h1>{postInfo.title}</h1>
//             <time>
//                 {postInfo.createdAt
//                     ? new Date(postInfo.createdAt).toLocaleString()
//                     : 'Date unavailable'}
//             </time>
//             <div className="author">by @{postInfo.author.username}</div>

//             <div className="image">
//                 <img src={`http://localhost:3000/${postInfo.cover}`} alt="Post cover" />
//             </div>

//             {/* Only show edit and delete buttons if the logged-in user is the author */}
//             {userInfo && userInfo.id === postInfo.author._id && (
//                 <div className="edit-row">
//                     <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
//                         <EditNoteIcon /> Edit this post
//                     </Link>
//                     <button className="delete-btn" onClick={deletePost}>
//                         <DeleteIcon /> Delete this post
//                     </button>
//                 </div>
//             )}

//             <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
//         </div>
//     );
// }

// export default PostPages;
// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { UserContext } from '../UserContext';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import DeleteIcon from '@mui/icons-material/Delete';

// function PostPages() {
//     const [postInfo, setPostInfo] = useState(null);
//     const { userInfo } = useContext(UserContext);
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         fetch(`http://localhost:3000/post/${id}`)
//             .then((response) => response.json())
//             .then((data) => {
//                 setPostInfo(data);
//                 setIsLoading(false);
//             })
//             .catch((err) => {
//                 console.error('Error fetching post:', err);
//                 setError('Failed to load post. Please try again later.');
//                 setIsLoading(false);
//             });
//     }, [id]);

//     const deletePost = async () => {
//         const confirmed = window.confirm('Are you sure you want to delete this post?');
//         if (!confirmed) return;

//         try {
//             const response = await fetch(`http://localhost:3000/post/${id}`, {
//                 method: 'DELETE',
//                 credentials: 'include',
//             });

//             if (response.ok) {
//                 alert('Post deleted successfully');
//                 navigate('/');
//             } else {
//                 alert('Failed to delete the post');
//             }
//         } catch (err) {
//             console.error('Error deleting post:', err);
//         }
//     };

//     if (isLoading) {
//         return <div>Loading...</div>; // You could use a loading spinner here
//     }

//     if (error) {
//         return <div>{error}</div>; // Error message for failed data fetch
//     }

//     return (
//         <div className="post-page">
//             <h1>{postInfo.title}</h1>
//             <time>
//                 {postInfo.createdAt
//                     ? new Date(postInfo.createdAt).toLocaleString()
//                     : 'Date unavailable'}
//             </time>
//             <div className="author">by @{postInfo.author.username}</div>

//             <div className="image">
//                 <img
//                     src={`http://localhost:3000/${postInfo.cover}`}
//                     alt="Post cover"
//                     style={{ maxWidth: '100%', height: 'auto' }} // Ensures image responsiveness
//                 />
//             </div>

//             {userInfo && userInfo.id === postInfo.author._id && (
//                 <div className="edit-row">
//                     <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
//                         <EditNoteIcon /> Edit this post
//                     </Link>
//                     <button className="delete-btn" onClick={deletePost}>
//                         <DeleteIcon /> Delete this post
//                     </button>
//                 </div>
//             )}

//             <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
//         </div>
//     );
// }

// export default PostPages;
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';

function PostPages() {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3000/post/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setPostInfo(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching post:', err);
                setError('Failed to load post. Please try again later.');
                setIsLoading(false);
            });
    }, [id]);

    const deletePost = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this post?');
        if (!confirmed) return;

        try {
            const response = await fetch(`http://localhost:3000/post/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                alert('Post deleted successfully');
                navigate('/');
            } else {
                alert('Failed to delete the post');
            }
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    };

    if (isLoading) {
        return <div className="text-center text-xl">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-gray-800">{postInfo.title}</h1>
            <time className="text-gray-600 text-sm">
                {postInfo.createdAt
                    ? new Date(postInfo.createdAt).toLocaleString()
                    : 'Date unavailable'}
            </time>
            <div className="text-gray-600 text-sm">by @{postInfo.author.username}</div>

            <div className="my-4">
                <img
                    src={`http://localhost:3000/${postInfo.cover}`}
                    alt="Post cover"
                    className="w-full h-auto rounded-lg shadow-md"
                />
            </div>

            {userInfo && userInfo.id === postInfo.author._id && (
                <div className="flex space-x-4 mt-6">
                    <Link
                        className="flex items-center justify-center w-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        to={`/edit/${postInfo._id}`}
                    >
                        <EditNoteIcon /> <span>Edit this post</span>
                    </Link>
                    <button
                        className="flex items-center justify-center w-1/2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        onClick={deletePost}
                    >
                        <DeleteIcon /> <span>Delete this post</span>
                    </button>
                </div>
            )}

            <div
                className="prose prose-lg mt-6"
                dangerouslySetInnerHTML={{ __html: postInfo.content }}
            />
        </div>
    );
}

export default PostPages;

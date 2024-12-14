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
        fetch(`https://think-ink-backend.vercel.app/post/${id}`)   // http://localhost:3000
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
            const response = await fetch(`https://think-ink-backend.vercel.app/post/${id}`, {
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
                    src={postInfo.cover}
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

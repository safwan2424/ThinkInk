import React, { useEffect, useState } from 'react';
import Post from '../components/Post';

function HomePage() {
  const [posts, setPosts] = useState([]); // State to store fetched posts
  const [error, setError] = useState(null); // State to store fetch errors
  const [loading, setLoading] = useState(true); // State to indicate loading

  useEffect(() => {
    fetch(' https://think-ink-backend.vercel.app/post')    //http://localhost:3000
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data); // Update state with fetched posts
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setError(error.message); // Set error state
        setLoading(false); // Set loading to false even if there is an error
      });
  }, []);

  if (loading) {
    return <div className="text-center text-xl text-gray-600">Loading posts...</div>; // Tailwind loading message
  }

  if (error) {
    return <div className="text-center text-xl text-red-600">Error: {error}</div>; // Tailwind error message
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Latest Posts</h1>
      {posts.length > 0 ? (
        <div className="space-y-8">
          {posts.map((post) => (
            <Post
              key={post._id}
              title={post.title}
              summary={post.summary}
              cover={post.cover}
              content={post.content}
              createdAt={post.createdAt}
              author={post.author}
              _id={post._id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-xl text-gray-600">No posts available.</div>
      )}
    </div>
  );
}

export default HomePage;

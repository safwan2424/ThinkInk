import React, { useEffect, useState, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    [{ color: [] }, { background: [] }],
    ['clean'],
  ],
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'align',
  'link', 'image', 'video',
  'color', 'background',
];

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const quillRef = useRef(null);

  useEffect(() => {
    fetch('https://think-ink-backend.vercel.app/post/' + id)  // http://localhost:3000
      .then((response) => response.json())
      .then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch post data');
        setLoading(false);
      });
  }, [id]);

  async function updatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files) {
      data.set('file', files[0]);
    }

    try {
      const response = await fetch('https://think-ink-backend.vercel.app/post/' + id, {
        method: 'PUT',
        body: data,
        credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        setError('Error updating post: ' + response.statusText);
      }
    } catch (err) {
      setError('Failed to update post');
    }
  }

  if (redirect) {
    return <Navigate to={'/post/' + id} />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={updatePost} className="space-y-4 max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <input
        type="file"
        onChange={(e) => setFiles(e.target.files)}
        accept="image/*"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        onChange={(value) => setContent(value)}
        placeholder="Write your blog post here..."
        className="w-full"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        Update Post
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
}

export default EditPost;

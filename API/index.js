require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const PostModel = require('./models/Post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const path = require('path');

const app = express();
const secret = process.env.JWT_SECRET || 'defaultsecret'; // Use the secret from .env or a default value



// Middleware
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173', // Allow your front-end origin
    })
);
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));


// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));


// Register Endpoint
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userDoc = await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully', user: userDoc });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, secret, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });

        res.status(200).json({ message: 'Login successful', username: user.username });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Profile Endpoint
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.json({ userId: info.userId, username: info.username });
    });
});

// Logout Endpoint
app.post('/logout', (req, res) => {
    res.cookie('token', '', { maxAge: 0, httpOnly: true }).json({ message: 'Logged out successfully' });
});

// Post Creation Endpoint
// Post Creation Endpoint
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    try {
        const { originalname, path: tempPath } = req.file;
        const extension = path.extname(originalname);
        const newPath = tempPath + extension;

        fs.renameSync(tempPath, newPath);
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Verify the token
        jwt.verify(token, secret, async (err, info) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            const { title, summary, content } = req.body;

            // Validate request body
            if (!title || !summary || !content) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // Create the post
            const postDoc = await PostModel.create({
                title,
                summary,
                content,
                cover: newPath,
                author: info.userId, // Use info.userId instead of info.id
            });

            // Populate the author field with the user's details
            const populatedPost = await postDoc.populate('author', 'username'); // Populating author with username

            res.status(201).json(populatedPost); // Return the post with author details
        });
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

app.put('/post/:id', uploadMiddleware.single('file'), async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;
    
    // Verify the token and get user info
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) return res.status(401).json({ error: 'Unauthorized' });

        // Find the post by ID
        const postDoc = await PostModel.findById(id);
        if (!postDoc) return res.status(404).json({ error: 'Post not found' });

        // Ensure the user is the author of the post
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.userId);
        if (!isAuthor) return res.status(403).json({ error: 'Forbidden' });

        const { title, summary, content } = req.body;
        // Handle file upload path if file exists
        const newPath = req.file ? req.file.path + path.extname(req.file.originalname) : postDoc.cover;

        // Update fields directly
        postDoc.title = title;
        postDoc.summary = summary;
        postDoc.content = content;
        postDoc.cover = newPath;  // Update cover image if a new file is uploaded

        // Save the updated document
        await postDoc.save();

        // Return the updated post
        res.status(200).json(postDoc);
    });
});
app.delete('/post/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) return res.status(401).json({ error: 'Unauthorized' });

        // Find the post by ID
        const postDoc = await PostModel.findById(id);
        if (!postDoc) return res.status(404).json({ error: 'Post not found' });

        // Ensure the user is the author of the post
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.userId);
        if (!isAuthor) return res.status(403).json({ error: 'Forbidden' });

        // Delete the post
        await PostModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    });
});


app.get('/post', async (req, res) => {
    try {
        const posts = await PostModel.find()
            .populate('author', 'username') // Populating only the 'username' field of 'author'
            .sort({ createdAt: -1 })
            .limit(20);

        res.json(posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});
app.get('/post/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const postDoc = await PostModel.findById(id).populate('author', 'username');
      if (!postDoc) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(postDoc); // Correctly send the post document as a JSON response
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  });


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


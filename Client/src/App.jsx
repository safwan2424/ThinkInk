// import React from 'react';
// import './App.css';
// import Post from './components/Post';
// import Header from './components/Header';
// import { Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
// import Layout from './components/Layout';
// import HomePage from './pages/HomePage';
// import Register from './components/Register';
// import { UserContextProvider } from './UserContext';
// import Create from './components/Create';
// import PostPages from './components/PostPages';
// import EditPost from './components/EditPost';

// function App() {
//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
//       <UserContextProvider>
//         <div className="max-w-screen-xl mx-auto p-4">
//           {/* Main Header Section */}
          
//           <Routes>
//             <Route path="/" element={<Layout />} >
//               <Route index element={<HomePage />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/create" element={<Create />} />
//               <Route path="/post/:id" element={<PostPages />} />
//               <Route path="/edit/:id" element={<EditPost />} />
//             </Route>
//           </Routes>
//         </div>
//       </UserContextProvider>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Create from './components/Create';
import PostPages from './components/PostPages';
import EditPost from './components/EditPost';
import Layout from './components/Layout';
import { UserContextProvider } from './UserContext';

function App() {
  return (
    <div className="app-container">
      <UserContextProvider>
       
        <main>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create" element={<Create />} />
              <Route path="/post/:id" element={<PostPages />} />
              <Route path="/edit/:id" element={<EditPost />} />
            </Route>
          </Routes>
        </main>
        <footer>
          <p>&copy; ThinkInk</p>
        </footer>
      </UserContextProvider>
    </div>
  );
}

export default App;

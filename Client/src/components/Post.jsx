// // import React from 'react';
// // import { format } from 'date-fns';
// // import { Link } from 'react-router-dom';

// // function Post({ _id,title, summary, cover, content, createdAt, author }) {
  
// //   let formattedDate;

// //   // Validate and format the date
// //   try {
// //     formattedDate = createdAt ? format(new Date(createdAt), 'MMM d, yyyy HH:mm') : 'Date unavailable';
// //   } catch (error) {
// //     console.error('Invalid date provided:', createdAt, error);
// //     formattedDate = 'Date unavailable';
// //   }

// //   return (
// //     <div className="post">
// //       <div className="image">
// //         <Link to ={`/post/${_id}`}>
// //         <img
// //           src={'http://localhost:3000/' + cover}
// //           alt="Post cover"
         
// //         />
// //           </Link>
      
// //       </div>
// //       <div className="texts">

// //       <Link to ={`/post/${_id}`}>
// //         <h2>{title}</h2>
// //         </Link>
// //         <p className="info">
// //           {/* Ensure author exists and has a username */}
// //           <a className="author">{author ? author.username : 'Unknown author'}</a>
// //           <time>{formattedDate}</time>
// //         </p>
// //         <p className="summary">{summary}</p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Post;
// import React from 'react';
// import { format } from 'date-fns';
// import { Link } from 'react-router-dom';

// function Post({ _id, title, summary, cover, content, createdAt, author }) {
//   let formattedDate;

//   // Validate and format the date
//   try {
//     formattedDate = createdAt ? format(new Date(createdAt), 'MMM d, yyyy HH:mm') : 'Date unavailable';
//   } catch (error) {
//     console.error('Invalid date provided:', createdAt, error);
//     formattedDate = 'Date unavailable';
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//       {/* Post Image */}
//       <div className="relative">
//         <Link to={`/post/${_id}`}>
//           <img
//             src={'http://localhost:3000/' + cover}
//             alt="Post cover"
//             className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-105"
//           />
//         </Link>
//       </div>

//       {/* Post Text Content */}
//       <div className="p-6">
//         <Link to={`/post/${_id}`}>
//           <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 mb-3">{title}</h2>
//         </Link>
//         <p className="text-sm text-gray-600 mb-2">
//           {/* Ensure author exists and has a username */}
//           <a className="text-blue-500 hover:underline">{author ? author.username : 'Unknown author'}</a>
//           <time className="ml-2 text-gray-500">{formattedDate}</time>
//         </p>
//         <p className="text-gray-700">{summary}</p>
//       </div>
//     </div>
//   );
// }

// export default Post;
import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function Post({ _id, title, summary, cover, content, createdAt, author }) {
  let formattedDate;

  // Validate and format the date
  try {
    formattedDate = createdAt ? format(new Date(createdAt), 'MMM d, yyyy HH:mm') : 'Date unavailable';
  } catch (error) {
    console.error('Invalid date provided:', createdAt, error);
    formattedDate = 'Date unavailable';
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto mb-6">
      {/* Post Image */}
      <div className="relative">
        <Link to={`/post/${_id}`}>
          <img
            src={'http://localhost:3000/' + cover}
            alt="Post cover"
            className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-105"
          />
        </Link>
      </div>

      {/* Post Text Content */}
      <div className="p-6">
        <Link to={`/post/${_id}`}>
          <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 mb-3">{title}</h2>
        </Link>
        <p className="text-sm text-gray-600 mb-2">
          {/* Ensure author exists and has a username */}
          <a className="text-blue-500 hover:underline">{author ? author.username : 'Unknown author'}</a>
          <time className="ml-2 text-gray-500">{formattedDate}</time>
        </p>
        <p className="text-gray-700">{summary}</p>
      </div>
    </div>
  );
}

export default Post;

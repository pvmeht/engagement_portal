import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts'); // Adjust the URL if needed
        console.log(response.data);  // Log the response to verify data
        setPosts(response.data);  // Set the posts in state
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, []);
  

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <header className="text-center py-10 bg-blue-500 text-white">
        <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
        <p className="mt-4 text-lg">Discover the latest updates and news!</p>
      </header>
      <div className="hero mt-10 px-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">New Posts</h2>
        <ul className="mt-6 space-y-4 max-w-2xl mx-auto">
          {posts.map(post => (
            <li key={post.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-gray-600">{post.description}</p>
              <p className="text-gray-500 text-sm">By {post.User ? post.User.name : 'Unknown'}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
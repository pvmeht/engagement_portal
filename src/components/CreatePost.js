import React, { useState } from 'react';
import axios from 'axios';

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem('user_id'); // Assuming user_id is stored in localStorage
      const response = await axios.post('http://localhost:5000/posts', {
        ...formData,
        author_id: userId,
      });

      if (response.status === 201) {
        setMessage('Post created successfully!');
        setFormData({ title: '', description: '' });
      } else {
        setMessage('Failed to create post. Please try again.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setMessage('An error occurred while creating the post.');
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

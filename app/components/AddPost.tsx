import React, { useState } from 'react';
import { addPost } from '../api';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        title,
        body,
        tags: tags.split(',').map(tag => tag.trim())
      };
      await addPost(newPost);
      setTitle('');
      setBody('');
      setTags('');
      setError('');
    } catch (err) {
      setError('Failed to add post');
    }
  };

  return (
    <div>
      <h2>Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div>
          <label>Tags (comma separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;

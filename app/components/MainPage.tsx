"use client";
import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../api';
import Link from 'next/link';
import '../styles.css';
import ThemeToggle from './ThemeToggle';

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (posts.length === 0) return <div>No posts available</div>;

  return (
    <div className="main-container">
      <ThemeToggle /> {}
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <Link href={`/posts/${post.id}`} passHref>
            <div className="post-link">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-description">"{post.body}"</p>
              <p className="post-tags">Tags: {post.tags.join(', ')}</p>
              <p className="post-likes">Likes: 👍 {post.reactions.likes}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MainPage;

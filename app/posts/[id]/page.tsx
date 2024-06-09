"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchPostById, updatePost, deletePost } from '../../api';
import styles from './PostPage.module.css';

const PostPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (id) {
      const getPost = async () => {
        try {
          const postData = await fetchPostById(Number(id));
          setPost(postData);
          setTitle(postData.title);
          setBody(postData.body);
          setTags(postData.tags.join(', '));
        } catch (error) {
          console.error('Failed to fetch post:', error);
        } finally {
          setLoading(false);
        }
      };
      getPost();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      const updatedPost = {
        title,
        body,
        tags: tags.split(',').map(tag => tag.trim())
      };
      await updatePost(id, updatedPost);
      setPost(updatedPost);
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(id);
      router.push('/');
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!post) return <div>Post not found</div>;

  return (
    <div className={styles.postContainer}>
      {editMode ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h1 className={styles.postTitle}>{post.title}</h1>
          <p className={styles.postBody}>{post.body}</p>
          <p className={styles.postTags}>Tags: {post.tags.join(', ')}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default PostPage;

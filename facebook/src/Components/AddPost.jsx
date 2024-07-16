import React, { useState, useEffect, useCallback } from 'react';
import image from '../Images/Profile.jpeg';
import './AddPost.css';
import axios from 'axios';
import { useFacebookPost } from '../Context/FacekbookContext';

function AddPost() {
  const [post, setPost] = useState("");
  const [background, setBackground] = useState("");
  const [initialBackground, setInitialBackground] = useState("");
  const [editPostId, setEditPostId] = useState(null);

   const { posts, UpdatePost, addPost, deletePost,setPosts} = useFacebookPost();
   
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("file", background);
    try {
      let response = await axios.post("http://139.59.47.49:4004/api/upload/image", fd);
      await axios.post("http://139.59.47.49:4004/api/post", {post: post, background: response.data.filename });
      addPost({post: post, background: response.data.filename });
      setPost("")
      setBackground("")
      getData()
    } catch (error) {
      console.log("error", error);
    }};

    const getData=()=>{
      let res=axios.get("http://139.59.47.49:4004/api/posts?limit=10&start=1&orderby=0")
      // setPosts(res.data)
    }
  const handleEdit = async (post) => {
    try {
      let response = await axios.get(`http://139.59.47.49:4004/api/post/${post.id}`);

      setPost(response.data.post)
      setInitialBackground(response.data.background)
      setBackground(null)
      setEditPostId(response.data.id)
    } catch (error) {
      console.log("error", error)
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const fd = new FormData()
    if (background) {
      fd.append("file", background)

      try {
        let response = await axios.post("http://139.59.47.49:4004/api/upload/image", fd)
        await axios.put("http://139.59.47.49:4004/api/post", { id: editPostId, post: post, background: response.data.filename })
        UpdatePost({ id: editPostId, post: post, background: response.data.filename })
        setInitialBackground("")
        setPost("")
        setEditPostId(null)
        setBackground("")
      } catch (error) {
        console.log("error")
      }
    } else {
      try {
        await axios.put(`http://139.59.47.49:4004/api/post`, { id: editPostId, post: post, background: initialBackground })
        UpdatePost({ id: editPostId, post: post, background: initialBackground })
        setInitialBackground("")
        setPost("")
        setEditPostId(null)
        setBackground("")
      } catch (error) {
        console.log("error")
      }
    }
  };
  const handleDelete = async (post) => {
    try {
      await axios.delete(`http://139.59.47.49:4004/api/post/delete/${post.id}`);
      deletePost(post.id);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div>
      <div className='container'>
        <div className="post-header">
          <img src={image} alt="Profile" className="profile-pic" />
          <button type="button" data-toggle="modal" data-target="#myModal" className="btn btn-default navbar-btn">
            <span>What's on your mind?</span>
          </button>
        </div>
        <div className='modal-container'>
          <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{!editPostId ? "Create Post" : "Edit Post"}</h5>
                  <button type="button" id="myModalClose" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="post-body">
                    <img src={image} alt="Profile" className="profile-pic" />
                    <img src={!background ? `http://139.59.47.49:4004/uploads/${initialBackground}` : URL.createObjectURL(background)} className="post-image" alt="Post" />
                  </div>
                  <input
                    type="text"
                    className='text-area'
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    placeholder="What's on your mind?"
                  />
                  <input
                    type="file"
                    id="fileInput"
                    className="file-input"
                    onChange={(e) => setBackground(e.target.files[0])}
                  />
                </div>
                <div className="modal-footer">
                  {!editPostId ? (
                    <button type="button" className="btn btn-primary" data-dismiss="modal" aria-label="Close" onClick={handleSubmit}>Post</button>
                  ) : (
                    <button type="button" className="btn btn-primary" data-dismiss="modal" aria-label="Close" onClick={handleUpdate}>Save & Change</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {posts.map((post) => (
        <div key={post.id} className='post-wrapper'>
          <div className='post'>
            <div className='post-header'>
              <img src={image} className='profile-image' alt="Profile" />
              <span className='profile-name'>John Doe</span>
              <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                  ...
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#" data-toggle="modal" data-target="#myModal" onClick={() => handleEdit(post)}>Edit</a>
                  <a className="dropdown-item" href="#" onClick={() => handleDelete(post)}>Delete</a>
                </div>
              </div>
            </div>
            <div className='post-body'>
              <div className='post-image-container'>
                <div className='post-text'>{post.post}</div>
                <img src={`http://139.59.47.49:4004/uploads/${post.background}`} className='post-image' alt="Post" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AddPost;

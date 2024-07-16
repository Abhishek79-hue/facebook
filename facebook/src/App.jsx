import { useState,useEffect } from 'react'
import ProfileHeader from './Components/ProfileHeader'
import AddPost from './Components/AddPost'

import { FacebookpostProvider } from './Context/FacekbookContext'
import axios from 'axios'

function App() {
  const[posts,setPosts]=useState([])

  const getData =()=>{
    axios.get("http://139.59.47.49:4004/api/posts?limit=10&start=1&orderby=0").then((res) => {
         setPosts(res.data)
     })
  }
  useEffect(() => {
    getData()
 }, [])
    const addPost=()=>{
      getData()
  }
  const UpdatePost = ({ id, post, background }) => {
    setPosts((prev) =>
      prev.map((PrevPost) =>
        PrevPost.id === id ? { ...PrevPost, post, background } : PrevPost
      )
    );
  };
  const deletePost=(id)=>{
    setPosts((prev)=>prev.filter((post)=>post.id!==id))
  }

  return (
    <>
   <FacebookpostProvider value={{posts,UpdatePost,addPost,deletePost,setPosts}}>
<ProfileHeader/>
 <AddPost/>
    
    </FacebookpostProvider>
  
    </>
  )
}

export default App

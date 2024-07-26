import { useState,useEffect } from 'react'
import ProfileHeader from './Components/ProfileHeader'
import AddPost from './Components/AddPost'
// import FiterSection from './Components/FiterSection'
// import PostCart from './Components/PostCart'
import { FacebookpostProvider } from './Context/FacekbookContext'
import axios from 'axios'

function App() {
  const[posts,setPosts]=useState([])

  const getData =()=>{
    try {
      axios.get("http://localhost:1200/api/get/post?limit=10&start=1&orderBy=-1").then((res) => {
        setPosts(res.data.posts)
    })
    } catch (error) {
      console.log("error")
    }
  }
  useEffect(() => {
    getData()
 }, [])
    const addPost=()=>{
      getData()
  }
  const UpdatePost=(id,post)=>{
    setPosts((prev)=>prev.filter((PrevPost)=>(PrevPost.id===id?post:PrevPost)))
    getData()
  }
  const deletePost=(id)=>{
    setPosts((prev)=>prev.filter((post)=>post.id!==id))
    getData()
  }

  return (
    <>
   <FacebookpostProvider value={{posts,UpdatePost,addPost,deletePost}}>
       <ProfileHeader/>
    <AddPost />
    
    </FacebookpostProvider>
  
    </>
  )
}

export default App

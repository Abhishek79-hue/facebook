import { useContext,createContext } from "react";

export const FacebookPostContext=createContext({
posts:[],
addPost:(post)=>{},
UpdatePost:(id,post)=>{},
deletePost:(id)=>{}
})

export const useFacebookPost=()=>{
  return useContext(FacebookPostContext)
}

export const FacebookpostProvider=FacebookPostContext.Provider

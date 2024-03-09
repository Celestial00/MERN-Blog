import { Link, useNavigate } from "react-router-dom"

import { useContext, useState } from "react"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"


const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(false)
  const {setUser}=useContext(UserContext)
  const navigate=useNavigate()

  const handleLogin=async()=>{  
    try{
      const res=await axios.post(URL+"/api/auth/login",{email,password},{withCredentials:true})
      console.log(res.data)
      setUser(res.data)
      navigate("/")

    }
    catch(err){
      setError(true)
      console.log(err);

    }

  }
  return (
    <>
    <div className="flex items-center justify-between px-6 md:px-[200px] py-8">
    <h1 className="text-lg font-primary md:text-[1.5em] "><Link to="/">Blog</Link></h1>
    <h3  className="font-primary"><Link to="/register">Register</Link></h3>
    </div>
<div className="w-full flex justify-center items-center h-[80vh] ">
       <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
         <h1 className="text-[3em] font-primary font-bold font-primary text-left">Log in</h1>
         <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 bg-gray-100 rounded-[10px] border-2 outline-0" type="text" placeholder="Email" />
         <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 bg-gray-100 rounded-[10px]     border-black outline-0" type="password" placeholder="Password" />
         <button onClick={handleLogin} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ">Log in</button>
         {error && <h3 className="text-red-500 font-primary text-sm ">Something went wrong</h3>}
         <div className="flex justify-center items-center space-x-3">
          <p>Don't have a account ?</p>
          <p className="text-gray-500 font-primary hover:text-black"><Link to="/register">Register</Link></p>
         </div>
       </div>
    </div>

    </>
    
  )
}

export default Login
import axios from "axios"

import HomePosts from "../components/HomePosts"
import Navbar from "../components/Navbar"
import { IF, URL } from "../url"
import { useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Loader from '../components/Loader'
import { UserContext } from "../context/UserContext"
import Hero from "../components/Hero"
import AddButton from "../components/AddButton"
 

const Home = () => {
  
  const {search}=useLocation()
  // console.log(search)
  const [posts,setPosts]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const {user}=useContext(UserContext)
  const [ButtonStyle , setButtonStyle ] = useState("fixed bottom-[20px] right-[20px] flex justify-center items-center w-[50px] h-[50px] cursor-pointer rounded-[50px] bg-black")
  // console.log(user)

  const [isScrolled, setIsScrolled] = useState(false);
  const [CssStyle , setCssStyle] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      


      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 0) {

        setIsScrolled(true);
        setButtonStyle("fixed bottom-[20px] right-[20px] flex justify-center items-center w-[50px] h-[50px] cursor-pointer rounded-[50px] bg-black animate-fade-up animate-once") 
        setCssStyle("")

      }
      
      else {
        setIsScrolled(false);
        setButtonStyle("fixed bottom-[20px] right-[20px] flex justify-center items-center w-[50px] h-[50px] cursor-pointer rounded-[50px] bg-black animate-fade-down animate-once") 
      }
    };

       window.addEventListener('scroll', handleScroll);

   
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  const fetchPosts=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(URL+"/api/posts/"+search)
      // console.log(res.data)
      setPosts(res.data)
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
      
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPosts()

  },[search])



  return (
    
    <>
    <Navbar/>

    
    {user && isScrolled ? <AddButton style={ButtonStyle} />: '' }
    
    {user  ?  '' : <Hero/>}


<div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noResults?
        posts.map((post)=>(
          <>
          <Link to={user?`/posts/post/${post._id}`:"/login"}>
          <HomePosts key={post._id} post={post}/>
          </Link>
          </>
          
        )):<h3 className="text-center font-primary font-bold mt-16">No posts available</h3>}
    </div>
   
   <div className="w-[100%] mb-7"></div>

    </>
    
  )
}

export default Home
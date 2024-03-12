import { Link, useLocation, useNavigate } from "react-router-dom"
import { BsSearch } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { RxPencil2 } from "react-icons/rx";
import { useContext, useState } from "react"
import Menu from "./Menu"
import { UserContext } from "../context/UserContext"



const Navbar = () => {

  const [prompt, setPrompt] = useState("")
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()
  const path = useLocation().pathname

  // console.log(prompt)


  const showMenu = () => {
    setMenu(!menu)
  }


  const { user } = useContext(UserContext)

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-8">

      <div className="flex justify-center items-center gap-4">

        <h1 className="text-lg md:text-[1.5em] hover:animate-jump hover:animate-once font-primary font-medium "><Link to="/">WanderLust</Link></h1>
        {path === "/" && <div className="flex justify-center items-center bg-gray-100 py-2 px-2 rounded-[10px]  space-x-0">
         
          <input onChange={(e) => setPrompt(e.target.value)} className="outline-none bg-gray-100  px-3 " placeholder="Search a post" type="text" />
          <p onClick={() => navigate(prompt ? "?search=" + prompt : navigate("/"))} className="cursor-pointer"><BsSearch /></p>
        </div>}

      </div>

      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? <h3 className="font-primary" ><Link to="/write"><RxPencil2 size={25} /></Link></h3> : <h3><Link to="/login">Login</Link></h3>}
        {user ? <div onClick={showMenu}>
          <p className="cursor-pointer relative"><FaBars size={25} /></p>
          {menu && <Menu />}
        </div> : <h3 className="font-primary" ><Link to="/register"><RxPencil2 size={30}  /></Link></h3>}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative"><FaBars size={30} /></p>
        {menu && <Menu />}
      </div>

    </div>
  )
}

export default Navbar 
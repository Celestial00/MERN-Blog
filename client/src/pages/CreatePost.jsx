
import Navbar from '../components/Navbar'
import { CiCirclePlus } from "react-icons/ci";

import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const { user } = useContext(UserContext)
  const [cat, setCat] = useState("")
  const [cats, setCats] = useState([])

  const navigate = useNavigate()

  const deleteCategory = (i) => {
    let updatedCats = [...cats]
    updatedCats.splice(i)
    setCats(updatedCats)
  }

  const addCategory = () => {
    let updatedCats = [...cats]
    updatedCats.push(cat)
    setCat("")
    setCats(updatedCats)
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats
    }

    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("img", filename)
      data.append("file", file)
      post.photo = filename
      // console.log(data)
      //img upload
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data)
        // console.log(imgUpload.data)
      }
      catch (err) {
        console.log(err)
      }
    }
    //post upload
    // console.log(post)
    try {
      const res = await axios.post(URL + "/api/posts/create", post, { withCredentials: true })
      navigate("/posts/post/" + res.data._id)
      // console.log(res.data)

    }
    catch (err) {
      console.log(err)
    }
  }



  return (
    <div>
      <Navbar />
      <div className='px-6 md:px-[200px] mt-8'>
        <div className=" flex justify-between ">

          <h1 className='font-bold font-primary md:text-[4em] text-xl '>Create a post</h1>

          <div className=" flex justify-center items-center gap-2">

            <label htmlFor="img">
              <CiCirclePlus size={40} className=' cursor-pointer ' />
            </label>

            <button onClick={handleCreate} className='bg-black w-full rounded-[10px] md:w-[100px] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Create</button>
            <input id='img' onChange={(e) => setFile(e.target.files[0])} type="file" className='px-4 hidden ' />


          </div>

        </div>
        <form className='w-full flex flex-col space-y-2 md:space-y-1 mt-10'>
          <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title' className=' text-[50px] font-primary px-4 py-2 outline-none' />

          <textarea onChange={(e) => setDesc(e.target.value)} rows={90} cols={30} className='px-4 text-[20px]  font-primary  outline-none' placeholder='Enter post description' />

        </form>

      </div>
      {/* <Footer/> */}
    </div>
  )
}

export default CreatePost
import { useContext, useEffect, useState } from "react"

import Navbar from "../components/Navbar"
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios"
import { URL } from "../url"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"


const EditPost = () => {

  const postId = useParams().id
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState("")
  const [cats, setCats] = useState([])

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId)
      setTitle(res.data.title)
      setDesc(res.data.desc)
      setFile(res.data.photo)
      setCats(res.data.categories)

    }
    catch (err) {
      console.log(err)
    }
  }

  const handleUpdate = async (e) => {
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

    try {
      const res = await axios.put(URL + "/api/posts/" + postId, post, { withCredentials: true })
      navigate("/posts/post/" + res.data._id)
      // console.log(res.data)

    }
    catch (err) {
      console.log(err)
    }
  }



  useEffect(() => {
    fetchPost()
  }, [postId])

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
  return (
    <div>
      <Navbar />
      <div className='px-6 md:px-[200px] mt-10'>

        <div className="flex justify-between ">

          <h1 className='font-bold md:text-[4em] text-xl '>Update a post</h1>

          <div className=" flex gap-2 justify-center items-center">


            <label htmlFor="img">
              <CiCirclePlus size={40} className='cursor-pointer' />
            </label>

            <input onChange={(e) => setFile(e.target.files[0])} type="file" id="img" className='px-4 hidden' />
            <button onClick={handleUpdate} className='bg-black w-full hidd md:w-[100px] mx-auto rounded-[10px] text-white font-semibold px-4 py-2 md:text-xl text-lg'>Update</button>
          </div>

        </div>

        <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-10'>
          <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Title' className='px-4 py-2 text-[50px] outline-none' />

          <textarea onChange={(e) => setDesc(e.target.value)} value={desc} rows={55} cols={30} className='px-4  outline-none' placeholder='Enter post description' />
          {/* <button onClick={handleUpdate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Update</button> */}
        </form>

      </div>

    </div>
  )
}

export default EditPost
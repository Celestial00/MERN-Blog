import { GrAdd } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function AddButton() {
  return (

 <Link to='/write' >
 

    <div className=" animate-fade animate-once  fixed bottom-[20px] right-[20px] flex justify-center items-center w-[50px] h-[50px] cursor-pointer rounded-[50px] bg-black " >
        <GrAdd color="white" size={18} />
    </div>

    </Link>

  )
}

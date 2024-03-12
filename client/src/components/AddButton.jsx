import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { Link } from "react-router-dom";


export default function AddButton(props) {

 

  return (

 <Link to='/write' >
 

    <div className={props.style} >
        <GrAdd color="white" size={18} />
    </div>

    </Link>

  )
}

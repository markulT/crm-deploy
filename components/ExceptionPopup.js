import {Alert} from "@mui/material";
import {FaCross} from "@react-icons/all-files/fa/FaCross";
import {useEffect, useState} from "react";
import {FaCrosshairs} from "@react-icons/all-files/fa/FaCrosshairs";
import {useSelector} from "react-redux";

export default function ExceptionPopup({status, msg}) {

    const [visibility, setVisibility] = useState(true)
    const error = useSelector(state=>state.UiReducer)

    useEffect(()=>{
        setTimeout(()=>{
            setVisibility(false)
        },3000)
    },[])
    useEffect(()=>{
        setVisibility(true)
        setTimeout(()=>{
            setVisibility(false)
        },3000)
    },[error.errorStatus])
    return (
        <div className={`${visibility ? "opacity-100" : "opacity-0"} items-center fixed top-4 right-12 flex justify-end flex-grow-0 duration-500 transition-all`}>
            <Alert className={``} severity={error.errorStatus}>{error.errorMsg}</Alert>
        </div>
    )
    // return (
    //     <Alert className={`${visibility ? "opacity-100" : "opacity-0"} fixed left-[50%] flex flex-grow-0 duration-500 transition-all w-[80vw]`} severity={status}>{msg}</Alert>
    // )
}
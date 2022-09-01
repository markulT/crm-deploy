import {AiOutlineMenu} from "@react-icons/all-files/ai/AiOutlineMenu";
import {useState} from "react";
import {AiOutlineUser} from "@react-icons/all-files/ai/AiOutlineUser";
import {useRouter} from "next/router";
import {GrAnalytics} from "@react-icons/all-files/gr/GrAnalytics";
import {IoAnalytics} from "@react-icons/all-files/io5/IoAnalytics";
import {AiOutlineHome} from "@react-icons/all-files/ai/AiOutlineHome";
import {BiLogIn} from "@react-icons/all-files/bi/BiLogIn";
import {RiAdminLine} from "@react-icons/all-files/ri/RiAdminLine";
import {useSelector} from "react-redux";


export default function Navbar() {
    const admin = useSelector(state => state.authReducer)

    const [open, setOpen] = useState(false)
    const router = useRouter()

    return (
        <div className={`${open ? "w-72" : "w-20"} transition-all duration-300 ease-in-out h-screen bg-navbar relative`}>
            <div className="flex flex-col items-center">
            <AiOutlineMenu onClick={()=>{setOpen(!open)}} className={`mt-8 text-4xl cursor-pointer`} />

                <div className="flex mt-8 items-center justify-center">
                    <div className="rounded-[50%] p-2 bg-icon-bg">
                        <RiAdminLine className="text-3xl text-white" />
                    </div>
                    <h2 className={`text-xl ${open ? 'visible ml-4' : 'hidden'}`}>{admin.login ? admin.login : 'Login firstв'}</h2>
                </div>

                <div onClick={()=>{router.push('/')}} className="flex cursor-pointer mt-8 items-center justify-center">
                    <div className="rounded-[50%] p-2 bg-icon-bg">
                        <AiOutlineHome className="text-3xl text-white" />
                    </div>
                    <h2 className={`text-xl ${open ? 'visible ml-4' : 'hidden'}`}>Home</h2>
                </div>
                <div onClick={()=>{router.push('/clients')}} className="flex cursor-pointer mt-8 items-center justify-center">
                    <div className="rounded-[50%] p-2 bg-icon-bg">
                        <AiOutlineUser className="text-3xl"/>
                    </div>
                    <h2 className={`text-xl ${open ? 'visible ml-4' : 'hidden'}`}>Clients</h2>
                </div>
                <div onClick={()=>{router.push('/analytics')}} className="flex cursor-pointer mt-8 items-center justify-center">
                    <div className="rounded-[50%] p-2 bg-icon-bg">
                        <IoAnalytics className="text-3xl text-white" />
                    </div>
                    <h2 className={`text-xl ${open ? 'visible ml-4' : 'hidden'}`}>Analytics</h2>
                </div>
                <div onClick={()=>{router.push('/auth/login')}} className="flex cursor-pointer mt-8 items-center justify-center">
                    <div className="rounded-[50%] p-2 bg-icon-bg">
                        <BiLogIn className="text-3xl text-white" />
                    </div>
                    <h2 className={`text-xl ${open ? 'visible ml-4' : 'hidden'}`}>Login</h2>
                </div>
            </div>
        </div>
    )
}
// <h2 className={`text-xl ${open ? 'visible' : 'hidden'}`}>Users</h2>
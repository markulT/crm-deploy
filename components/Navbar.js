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
        <div className={`${open ? "w-72" : "w-20"} transition-all duration-300 ease-in-out min-h-full bg-gray-800 relative items-center justify-center`}>
            <div className="flex flex-col items-start pl-4 pr-4">
            <AiOutlineMenu onClick={()=>{setOpen(!open)}} className={`mt-8 text-4xl cursor-pointer self-center`} />

                <div className="flex mt-8 items-center justify-center">
                    <div className="rounded-[50%] p-2 bg-gray-600 ">
                        <RiAdminLine className="text-3xl text-white" />
                    </div>
                    <h2 className={`text-xl ${open ? 'visible ml-4' : 'hidden'}`}>{admin.login ? admin.login : 'Login first'}</h2>
                </div>

                <div onClick={()=>{router.push('/')}} className="flex cursor-pointer mt-8 items-center justify-center">
                    <div className="rounded-[50%] p-2 bg-gray-600 hover:bg-gray-700">
                        <AiOutlineHome className="text-3xl text-white" />
                    </div>
                    <h2 className={`text-xl ${open ? 'visible ml-4' : 'hidden'}`}>Home</h2>
                </div>
                <div onClick={()=>{router.push('/clients/1')}} className="flex cursor-pointer mt-8 items-center justify-center">
                    <div className="rounded-[50%] p-2 bg-gray-600 hover:bg-gray-700">
                        <AiOutlineUser className="text-3xl"/>
                    </div>
                    <h2 className={`text-xl ${open ? 'visible ml-4' : 'hidden'}`}>Clients</h2>
                </div>
                <div onClick={()=>{router.push('/analytics')}} className="flex cursor-pointer mt-8 items-center justify-center">
                    <div className="rounded-[50%] p-2 bg-gray-600 hover:bg-gray-700">
                        <IoAnalytics className="text-3xl text-white" />
                    </div>
                    <h2 className={`text-xl ${open ? 'visible ml-4' : 'hidden'}`}>Analytics</h2>
                </div>
                <div onClick={()=>{router.push('/auth/login')}} className="flex cursor-pointer mt-8 items-center justify-center">
                    <div className="rounded-[50%] p-2 bg-gray-600 hover:bg-gray-700">
                        <BiLogIn className="text-3xl text-white" />
                    </div>
                    <h2 className={`text-xl ${open ? 'visible ml-4' : 'hidden'}`}>Login</h2>
                </div>
            </div>
        </div>
    )
}
// <h2 className={`text-xl ${open ? 'visible' : 'hidden'}`}>Users</h2>
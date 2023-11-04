import {AiOutlineMenu} from "@react-icons/all-files/ai/AiOutlineMenu";
import {useEffect, useState} from "react";
import {AiOutlineUser} from "@react-icons/all-files/ai/AiOutlineUser";
import {useRouter} from "next/router";
import {GrAnalytics} from "@react-icons/all-files/gr/GrAnalytics";
import {IoAnalytics} from "@react-icons/all-files/io5/IoAnalytics";
import {AiOutlineHome} from "@react-icons/all-files/ai/AiOutlineHome";
import {BiLogIn} from "@react-icons/all-files/bi/BiLogIn";
import {RiAdminLine} from "@react-icons/all-files/ri/RiAdminLine";
import {useDispatch, useSelector} from "react-redux";
import {BiTv} from "@react-icons/all-files/bi/BiTv";
import {getRandomUsers} from "../storage/clientsReducer/clientsReducer";
import {MdOutlineAdminPanelSettings, MdOutlineMailOutline} from "react-icons/md";
import {logout} from "../storage/authReducer/authReducer";


const Navbar = ({open, setOpen}) => {
    const admin = useSelector(state => state.authReducer)

    const router = useRouter()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        await dispatch(logout()).then(router.push('/auth/login'))
    }

    useEffect(() => {
    }, [])
    return (
        <div
            className={`${open ? "w-72" : "w-20"} fixed left-0 h-screen z-[999999] transition-all duration-300 ease-in-out bg-white text-primary-text`}>
            <div className="flex flex-col justify-center pl-4 pr-4 h-full">
                <AiOutlineMenu onClick={() => {
                    setOpen(!open)
                }} className={`mt-8 text-4xl cursor-pointer self-center text-gray-200`}/>
                <div className={"flex flex-col justify-center "}>
                    <div className="flex mt-8 items-center justify-center ">
                        <div className="rounded-[50%] p-2 bg-gray-600 ">
                            <RiAdminLine className="text-3xl text-gray-200"/>
                        </div>
                        <h2 className={`text-xl ${open ? 'visible ml-4 text-gray-200' : 'hidden'}`}>{admin.email ? admin.email : 'Не залогинен'}</h2>
                    </div>

                    <div onClick={() => {
                        router.push('/')
                    }} className="flex cursor-pointer mt-8 items-center justify-center">
                        <div className="rounded-[50%] p-2 bg-gray-600 hover:bg-gray-700 transition-all duration-200">
                            <AiOutlineHome className="text-3xl text-gray-200"/>
                        </div>
                        <h2 className={`text-xl ${open ? 'visible ml-4 text-gray-200 hover:text-gray-400 transition-all duration-200' : 'hidden'}`}>Home</h2>
                    </div>
                    <div onClick={() => {
                        router.push('/clients/1')
                    }} className="flex cursor-pointer mt-8 items-center justify-center">
                        <div className="rounded-[50%] p-2 bg-gray-600 hover:bg-gray-700 transition-all duration-200">
                            <AiOutlineUser className="text-3xl text-gray-200"/>
                        </div>
                        <h2 className={`text-xl ${open ? 'visible ml-4 text-gray-200 hover:text-gray-400 transition-all duration-200' : 'hidden'}`}>Clients</h2>
                    </div>
                    <div onClick={() => {
                        router.push('/analytics')
                    }} className="flex cursor-pointer mt-8 items-center justify-center">
                        <div className="rounded-[50%] p-2 bg-gray-600 hover:bg-gray-700 transition-all duration-200">
                            <IoAnalytics className="text-3xl text-gray-200"/>
                        </div>
                        <h2 className={`text-xl ${open ? 'visible ml-4 text-gray-200 hover:text-gray-400 transition-all duration-200' : 'hidden'}`}>Analytics</h2>
                    </div>
                    <div onClick={() => {
                        router.push('/mails')
                    }} className="flex cursor-pointer mt-8 items-center justify-center">
                        <div className="rounded-[50%] p-2 bg-gray-600 hover:bg-gray-700 transition-all duration-200">
                            <MdOutlineMailOutline className="text-3xl text-gray-200"/>
                        </div>
                        <h2 className={`text-xl ${open ? 'visible ml-4 text-gray-200 hover:text-gray-400 transition-all duration-200' : 'hidden'}`}>Mails</h2>
                    </div>
                    {admin.role === "Admin" ?
                        <div onClick={() => {
                        router.push('/ownerControls')
                    }} className="flex cursor-pointer mt-8 items-center justify-center">
                        <div className="rounded-[50%] p-2 bg-gray-600 hover:bg-gray-700 transition-all duration-200">
                            <MdOutlineAdminPanelSettings className="text-3xl text-gray-200"/>
                        </div>
                        <h2 className={`text-xl ${open ? 'visible ml-4 text-gray-200 hover:text-gray-400 transition-all duration-200' : 'hidden'}`}>Owner
                            controls</h2>
                    </div>
                        : <></>
                    }

                    <div onClick={() => admin.email ? handleLogout() : router.push('/auth/login')}
                         className="flex cursor-pointer mt-8 items-center justify-center">
                        <div className="rounded-[50%] p-2 bg-gray-600 hover:bg-gray-700 transition-all duration-200">
                            <BiLogIn className="text-3xl text-gray-200"/>
                        </div>
                        <h2 className={`text-xl ${open ? 'visible ml-4 text-gray-200 hover:text-gray-400 transition-all duration-200' : 'hidden'}`}> {admin.email ? "Logout" : "Login"}</h2>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default Navbar

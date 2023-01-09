import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {getSingleChannel, updateDescription, updateImage} from "../../storage/channelsReducer/channelReducer";
import Link from "next/link";
import {MdNavigateBefore} from "@react-icons/all-files/md/MdNavigateBefore";
import {AiOutlineUser} from "@react-icons/all-files/ai/AiOutlineUser";
import ClientField from "../../components/ClientField";
import {FaRegAddressCard} from "@react-icons/all-files/fa/FaRegAddressCard";
import {AiOutlineCode} from "@react-icons/all-files/ai/AiOutlineCode";
import {AiOutlineShoppingCart} from "@react-icons/all-files/ai/AiOutlineShoppingCart";
import {BiHomeAlt} from "@react-icons/all-files/bi/BiHomeAlt";
import {AiFillPhone} from "@react-icons/all-files/ai/AiFillPhone";
import {FiMail} from "@react-icons/all-files/fi/FiMail";
import {GiAerialSignal} from "@react-icons/all-files/gi/GiAerialSignal";
import {RiFundsFill} from "@react-icons/all-files/ri/RiFundsFill";
import {AiOutlineWifi} from "@react-icons/all-files/ai/AiOutlineWifi";
import {AiFillCloseCircle} from "@react-icons/all-files/ai/AiFillCloseCircle";
import {AiFillCheckCircle} from "@react-icons/all-files/ai/AiFillCheckCircle";
import SubmitButton from "../../components/SubmitButton";
import { AiOutlineLink } from "react-icons/ai";
import { MdOutlineDescription } from "react-icons/md";

export default function ChannelEdit() {
    const router = useRouter()
    const {id} = router.query
    const dispatch = useDispatch()
    const admin = useSelector(state => state.authReducer)
    const channel = useSelector(state => state.channelReducer.currentChannel)
    const [description, setDescription] = useState("")
    const [descEdit, setDescEdit] = useState(false)
    const [imgEdit, setImgEdit] = useState()
    const [image, setImage] = useState()
    const [imageEdit, setImageEdit] = useState(false)
    const descRef = useRef(null)
    const regex = /\.[0-9a-z]+$/i

    useEffect(() => {
        if (!admin.login) {
            router.push("/auth/login")
        }
        dispatch(getSingleChannel(id))
    }, [])

    async function submitDescription() {
        await dispatch(updateDescription(channel._id, description))
        await dispatch(getSingleChannel(id))
        setDescEdit(!descEdit)
    }

    async function handleEditImage() {
        const formData = new FormData()
        formData.append("image", image)
        formData.append("id", channel._id)
        await dispatch(updateImage(formData))
        dispatch(getSingleChannel(id))
    }
    function handleSetImage(e) {
        const image = new Image()
        image.src = e.target.result
        setImage(e.target.files[0])
    }

    return (
        <div className="min-w-screen min-h-screen flex-1 bg-gradient-to-t from-gray-700 to-gray-600">
            <div className="container mx-auto text-gray-200 min-h-screen ">
                <Link href={'/channels/1'}>
                    <MdNavigateBefore
                        className='text-4xl mt-8 cursor-pointer rounded-[50%] bg-gray-800 text-gray-300 mx-10'/>
                </Link>

                <h2 className="text-3xl flex items-center mt-8 text-gray-300 font-[Roboto] font-medium mx-10">
                    <AiOutlineUser className='text-3xl mr-2 text-gray-300'/>
                    {channel.title}
                </h2>

                <div className={"mt-4 "}>
               

               <div className="flex bg-gray-800 rounded-3xl py-3 mx-10 text-gray-200">
                <div className="">
                    <div className={`rounded-xl mt-5 ml-5 w-30 ${imgEdit ? "hidden" : "visible"}`}>
                        <img src={`data:image/${channel?.imgName?.match(regex)[0].substr(1)};base64,${channel.imgData}`} className="object-cover rounded-lg w-40 h-40"/>
                    </div>
                    <div className={`${imgEdit ? "visible" : "hidden"}`}>
                        <input type="file" accept="image/png, image/jpeg, image/webp"  className="text-md px-5 rounded-lg border-8  focus:border-gray-300  focus:border-8 block w-full pl-3 bg-gray-600 border-gray-500  text-gray-400 autofill:bg-gray-800 transition-all duration-300"
                               onChange={handleSetImage}/>
                        <button onClick={handleEditImage}>Подтвердить</button>s
                    </div>
                    <button onClick={()=>{setImgEdit(!imgEdit)}} className="mx-4 mt-2 text-gray-400 hover:text-gray-500">Изменить</button>
                </div>


                <div className="ml-5 self-center">
                    <div className="">

                        <div>
                            <ClientField className="text-gray-200" value={channel.name} title={
                                <div className="flex items-center">
                                    <AiOutlineLink className='mr-2 text-gray-500'/>
                                    Идентификатор канала
                                </div>
                            }/>
                        </div>
                    </div>
                    
                    <div className="rounded-3xl mt-4 pr-40 text-gray-200 col-span-2">
                    <div>
                            
                                <div className="flex items-center text-gray-500 text-xl font-medium">
                                    <MdOutlineDescription className='mr-2 text-gray-500'/>
                                    Описание канала
                                </div>

                        </div>
                    <p className={`${descEdit ? "hidden" : "visible"} text-1xl text-gray-400  font=[Roboto] font-medium`}>{channel.description}</p>
                    <p className={`${descEdit ? "visible" : "hidden"}  text-1xl text-gray-400  font=[Roboto] font-medium`}>Введите новое описание:</p>
                    <textarea ref={descRef}
                              className={`bg-gray-600 rounded-lg p-2 focus:border-indigo-500 resize-none w-full ${descEdit ? "visible" : "hidden"}`}
                              value={description} onChange={(e) => {
                        setDescription(e.target.value)
                    }}/>
                    <button className={`${descEdit ? "visible" : "hidden"} bg-icon-bg p-2 rounded-xl`} onClick={submitDescription}>Подтвердить
                    </button>
                    <button className={`${!descEdit ? "visible" : "hidden"} block mt-4 bg-icon-bg p-2 rounded-xl`} onClick={() => {
                        setDescEdit(!descEdit)
                    }}>Редактировать
                    </button>
                    {/* <button onClick={() => {
                        console.log(channel.imgData)
                    }}>тест
                    </button> */}
                </div>
                </div>

                </div>

                <button onClick={()=>{
                    console.log(channel)}}>Nigga</button>

                </div>
            </div>
        </div>
    )
}
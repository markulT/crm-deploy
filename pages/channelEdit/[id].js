import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {getSingleChannel, updateDescription} from "../../storage/channelsReducer/channelReducer";
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


export default function ChannelEdit() {
    const router = useRouter()
    const {id} = router.query
    const dispatch = useDispatch()
    const admin = useSelector(state => state.authReducer)
    const channel = useSelector(state => state.channelReducer.currentChannel)
    const [description, setDescription] = useState("")
    const [descEdit, setDescEdit] = useState(false)
    const [imgEdit, setImgEdit] = useState()
    const descRef = useRef(null)
    const regex = /\.[0-9a-z]+$/i

    useEffect(() => {
        if (!admin.login) {
            router.push("/auth/login")
        }
        dispatch(getSingleChannel(id))
    }, [])

    function submitDescription() {
        dispatch(updateDescription(channel._id, description))
        dispatch(getSingleChannel(id))
    }

    function handleEditImage() {

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
                <div>
                    <img src={`data:image/${channel?.imgName?.match(regex)[0].substr(1)};base64,${channel.imgData}`}/>
                    <button onClick={handleEditImage}>Изменить</button>
                </div>
                <div className=" bg-gray-800 rounded-3xl p-4 mt-4 mx-10 text-gray-200">
                    <div className="grid gap-2 grid-cols-2">

                        <div>
                            <ClientField className="text-gray-200" value={channel.name} title={
                                <div className="flex items-center">
                                    <FaRegAddressCard className='mr-2 text-gray-500'/>
                                    Идентификатор канала
                                </div>
                            }/>
                        </div>
                    </div>

                </div>
                <div className="block bg-gray-800 rounded-3xl p-4 mt-4 mx-10 text-gray-200">
                    <p className={`${descEdit ? "hidden" : "visible"}`}>{channel.description}</p>
                    <p className={`${descEdit ? "visible" : "hidden"}`}>Введите новое описание:</p>
                    <textarea ref={descRef}
                              className={`bg-transparent border-white resize-none w-full ${descEdit ? "visible" : "hidden"}`}
                              value={description} onChange={(e) => {
                        setDescription(e.target.value)
                    }}/>
                    <button className={`${descEdit ? "visible" : "hidden"}`} onClick={submitDescription}>Подтвердить
                    </button>
                    <button className={"block mt-4 bg-icon-bg p-2 rounded-3xl"} onClick={() => {
                        setDescEdit(!descEdit)
                    }}>Редактировать
                    </button>
                    <button onClick={() => {
                        console.log(channel.imgData)
                    }}>тест
                    </button>
                </div>
            </div>
        </div>
    )
}
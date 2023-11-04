import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    cancelMinistraSub,
    cancelsub, getPage,
    getUser,
    setCurrentClient,
    setCurrentMinstraClient
} from "../../storage/clientsReducer/clientsReducer";
import {useRouter} from "next/router";
import {MdNavigateBefore} from "@react-icons/all-files/md/MdNavigateBefore";
import Link from "next/link";
import ClientField from "../../components/ClientField";
import {AiFillCheckCircle} from "@react-icons/all-files/ai/AiFillCheckCircle";
import {FaCross} from "@react-icons/all-files/fa/FaCross";
import {AiFillCloseCircle} from "@react-icons/all-files/ai/AiFillCloseCircle";
import {AiOutlineUser} from "@react-icons/all-files/ai/AiOutlineUser";
import {AiOutlineShoppingCart} from "@react-icons/all-files/ai/AiOutlineShoppingCart";
import {FaRegAddressCard} from "@react-icons/all-files/fa/FaRegAddressCard";
import {BiHomeAlt} from "@react-icons/all-files/bi/BiHomeAlt";
// import {BsTelephone, MdOutlineSignalWifiStatusbar4Bar} from "react-icons/all";
import {AiOutlineMacCommand} from "@react-icons/all-files/ai/AiOutlineMacCommand";
import {GiAerialSignal} from "@react-icons/all-files/gi/GiAerialSignal";
import {AiOutlineCode} from "@react-icons/all-files/ai/AiOutlineCode";
import {RiFundsFill} from "@react-icons/all-files/ri/RiFundsFill";
import CancelButton from "../../components/CancelButton";
import {FiMail} from "@react-icons/all-files/fi/FiMail";
import {AiOutlineWifi} from "@react-icons/all-files/ai/AiOutlineWifi";
import {AiFillPhone} from "@react-icons/all-files/ai/AiFillPhone";
import SubmitButton from "../../components/SubmitButton";
import {VscDebugRestart} from "@react-icons/all-files/vsc/VscDebugRestart";
import ClientInfo from "../../components/ClientPage/ClientInfo";
import SubscriptionInfo from "../../components/ClientPage/SubscriptionInfo";
import DecoderInfo from "../../components/ClientPage/DecoderInfo";
import MobileSubInfo from "../../components/ClientPage/MobileSubInfo";
import PopUpCreateTestSub from "../../components/PopUps/PopUpCreateTestSub";


export default function ClientPage() {
    const router = useRouter()
    const {id} = router.query
    const dispatch = useDispatch()
    const currentClient = useSelector(state => state.clientsReducer.currentClient)
    const ministraClient = useSelector(state => state.clientsReducer.currentClientMinistra)
    const admin = useSelector(state => state.authReducer)
    const [areYouSure, setAreYouSure] = useState(false)
    const [popUpVisible, setPopUpVisible] = useState(false)


    const handleCancelSub = (id) => {
        dispatch(cancelsub(id))
        dispatch(getUser(id))
    }
    const handleMinistraSub = () => {
        dispatch(cancelMinistraSub(id))
        dispatch(getUser(id))

    }

    const refreshInfo = () => {
        dispatch(getUser(id))
    }

    useEffect(() => {

            console.log(ministraClient)
            console.log(2)
            console.log(currentClient)
            if (!admin.email) {
                router.push('/auth/login')
            }

            dispatch(getUser(id))
            console.log(dispatch(getUser(id)))
            return () => {
                dispatch(setCurrentClient({}))
                dispatch(setCurrentMinstraClient({}))
            }

        },
        [])

    return (
        <div className="w-full h-full flex-1 bg-outline text-primary-text to-gray-600 font-primary px-8 py-8">
            <PopUpCreateTestSub id={currentClient._id} visible={popUpVisible} setVisible={setPopUpVisible} refresh={refreshInfo}/>
            <div className="text-gray-200 ">
                <div className={"flex w-full justify-between bg-white mb-8 items-center rounded-xl p-2"}>
                    <MdNavigateBefore
                        className='text-4xl cursor-pointer text-gray-300'
                        onClick={() => {
                            router.back()
                        }}/>
                    <VscDebugRestart
                        className='text-2xl cursor-pointer text-gray-300 mr-4'
                        onClick={refreshInfo}/>
                </div>

                <main className={"md:grid md:grid-cols-5 md:grid-rows-2 flex flex-col gap-8"}>

                    <ClientInfo/>

                    <SubscriptionInfo refresh={refreshInfo} setPopUpVisible={setPopUpVisible} popUpVisible={popUpVisible}/>

                    <DecoderInfo/>

                    <MobileSubInfo refresh={refreshInfo}/>
                </main>
            </div>
        </div>
    )
}

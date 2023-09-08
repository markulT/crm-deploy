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
import ClientInfo from "../../components/ClienPage/ClientInfo";
import SubscriptionInfo from "../../components/ClienPage/SubscriptionInfo";
import DecoderInfo from "../../components/ClienPage/DecoderInfo";
import MobileSubInfo from "../../components/ClienPage/MobileSubInfo";


export default function ClientPage() {
    const router = useRouter()
    const {id} = router.query
    const dispatch = useDispatch()
    const currentClient = useSelector(state => state.clientsReducer.currentClient)
    const ministraClient = useSelector(state => state.clientsReducer.currentClientMinistra)
    const admin = useSelector(state => state.authReducer)
    const [areYouSure, setAreYouSure] = useState(false)


    const handleCancelSub = (id) => {
        dispatch(cancelsub(id))
        dispatch(getUser(id))
    }
    const handleMinistraSub = () => {
        dispatch(cancelMinistraSub(id))
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
        <div className="w-screen min-h-screen flex-1 bg-outline text-primary-text to-gray-600 font-primary px-16 pb-4">
            <div className="text-gray-200 ">
                <div className={"flex w-full justify-between bg-white my-4 items-center rounded-xl p-2"}>
                    <Link href={'/clients/1'}>
                        <MdNavigateBefore
                            className='text-4xl cursor-pointer text-gray-300'/>
                    </Link>
                    <VscDebugRestart
                        className='text-2xl cursor-pointer text-gray-300 mr-4'
                        onClick={() => {
                            dispatch(getUser(id))
                        }}/>
                </div>

                <main className={"grid grid-cols-5 grid-rows-2 gap-8"}>
                    <ClientInfo/>

                    <SubscriptionInfo/>

                    <DecoderInfo/>

                    <MobileSubInfo/>
                </main>
            </div>
        </div>
    )
}

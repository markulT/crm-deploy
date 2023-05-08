import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    cancelMinistraSub,
    cancelsub,
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
        console.log(admin)
        if (!admin.login) {
            router.push('/auth/login')
        }

        dispatch(getUser(id))
        return () => {
            dispatch(setCurrentClient({}))
            dispatch(setCurrentMinstraClient({}))
        }
    }, [])

    return (
        <div className="min-w-screen min-h-screen flex-1 bg-gradient-to-t from-gray-700 to-gray-600">
            <div className="container mx-auto text-gray-200 min-h-screen ">
                <Link href={'/clients/1'}>
                    <MdNavigateBefore className='text-4xl mt-8 cursor-pointer rounded-[50%] bg-gray-800 text-gray-300 mx-10'/>
                </Link>

                <div className=" bg-gray-800 rounded-3xl p-4 mt-4 mx-10 text-gray-200">
                    <div className="grid gap-2 grid-cols-2">

                    <div>
                    <ClientField className="text-gray-200" value={currentClient?.fullName} title={
                        <div className="flex items-center">
                            <FaRegAddressCard className='mr-2 text-gray-500'/>
                            Full Name:
                        </div>
                    }/>
                    </div>

                    <div>
                    <ClientField value={currentClient?.acqId ? currentClient?.acqId : "Нету" } title={
                        <div className="flex items-center">
                            <AiOutlineCode className='mr-2 text-gray-500'></AiOutlineCode>
                            ID покупателя:
                        </div>
                    }/>
                    </div>

                    <div>
                    <ClientField value={currentClient?.orderId ? currentClient.orderId : "Нету"} title={
                        <div className="flex items-center">
                            <AiOutlineShoppingCart className='mr-2 text-gray-500'></AiOutlineShoppingCart>
                            Order ID:
                        </div>
                    }/>
                    </div>

                    <div>
                    <ClientField value={currentClient?.address} title={
                        <div className="flex items-center">
                            <BiHomeAlt className='mr-2 text-gray-500'></BiHomeAlt>
                            Address:
                        </div>
                    }/>
                    </div>

                    <div>
                    <ClientField value={currentClient?.phone} title={
                        <div className="flex items-center">
                            <AiFillPhone className={'mr-2 text-gray-500'} />
                            Номер телефона:
                        </div>
                    }/>
                    </div>

                    <div>
                    <ClientField value={currentClient?.signDate} title={
                        <div className="flex items-center">
                            <AiFillPhone className={'mr-2 text-gray-500'} />
                            Дата регистрации:
                        </div>
                    }/>
                    </div>

                    <div>
                    <div className="basis-1/2">
                        <h3 className="text-gray-500 text-xl font-medium flex items-center">
                            <FiMail className={'mr-2'} />
                            Email</h3>
                        <h3 className="text-2xl text-gray-400 font=[Roboto] font-medium">{currentClient?.email}</h3>
                    </div>
                    </div>

                    <div>
                    {currentClient?.dealer ? <div className="basis-1/2">
                        <h3 className="text-gray-600 text-xl font-medium">Dealer:</h3>
                        <h3 className="text-2xl text-gray-400 font=[Roboto] font-medium">{currentClient?.dealer}</h3>
                    </div> : <div className="basis-1/2">
                        <h3 className="text-gray-500 text-xl font-medium">Dealer:</h3>
                        <h3 className="text-2xl text-gray-400 font=[Roboto] font-medium">Без дилера</h3>
                    </div>}
                    </div>

                    <div>
                    <div className="basis-1/2">
                        <h3 className="text-gray-500 text-xl font-medium flex items-center">
                            <GiAerialSignal className='mr-2 text-gray-400'/>
                            Mac Address :
                        </h3>
                        <h3 className="text-2xl text-gray-400 font=[Roboto] font-medium">{ministraClient?.stb_mac ? ministraClient.stb_mac : 'Не установлен'}</h3>
                    </div>
                    </div>

                    <div>
<ClientField value={ministraClient?.tariff_plan == "1" ? "Стандарт" : ministraClient?.tariff_plan == "2" ? "Премиум" : ministraClient?.tariff_plan == "0" ? "Нету" : ""}
 title={
                        <div className="flex items-center">
                            <RiFundsFill className='mr-2 text-gray-500'></RiFundsFill>
                            Тарифный план:
                        </div>
                    }/>
                    </div>

                    <div>
                    <ClientField value={ministraClient?.ministraDate ? ministraClient?.ministraDate : "Неизвестно" } title={
                        <div className="flex items-center">
                            <RiFundsFill className='mr-2 text-gray-500'></RiFundsFill>
                            Дата покупки:
                        </div>
                    }/>
                    </div>

                    <div>
                    <ClientField value={ministraClient?.ip} title={'IP:'}/>
                    </div>

                    <div>
                    <div className="basis-1/2">
                        <h3 className="text-gray-500 text-xl font-medium flex items-center">
                            <AiOutlineWifi className={'mr-2 text-gray-500'} />
                            Status
                        </h3>
                        <h3 className="text-2xl text-gray-400 font=[Roboto] font-medium">{ministraClient?.online == '0' ?
                            <div className='flex items-center'>
                                <AiFillCloseCircle className='text-xl inline text-red-600 mr-2'/>
                                <p>Offline</p>
                            </div>
                            :
                            <div className='flex items-center'>
                                <AiFillCheckCircle className='text-xl inline text-green-500 mr-2'/>
                                <p>Online</p>
                            </div>}</h3>
                            </div>
                            </div>
                    </div>

                </div>
                <SubmitButton callback={()=>{
                    handleMinistraSub(currentClient._id)
                }} />
                <h3 className={'text-3xl mt-4 mx-10'}>Подписка Mobile</h3>
                <div className={`flex flex-wrap w-100 bg-gray-800 rounded-3xl p-4 mt-4 mx-10`}>
                    <div className="basis-1/2">
                        <h3 className="text-gray-500 text-xl font-medium flex items-center">

                            <AiOutlineWifi className={'mr-2'} />
                            Статус подписки
                        </h3>
                        <h3 className="text-2xl text-gray-400 font=[Roboto] font-medium">{currentClient.mobileSubExists ?
                            <div className='flex items-center'>
                                <AiFillCheckCircle className='text-xl inline text-green-500 mr-2'/>
                                <p>Подписан</p>
                            </div>
                            :
                            <div className='flex items-center'>
                                <AiFillCloseCircle className='text-xl inline text-red-600 mr-2'/>
                                <p>Не подписан</p>
                            </div>}
                        </h3>
                    </div>
                    <ClientField title={'Уровень подписки'} value={currentClient.mobileSubLevel == '1' ? 'Премиум' : currentClient.mobileSubLevel == '0' ? 'Нету' : ''} />
                    <ClientField title={'Order ID'} value={currentClient.mobileSubOrderId} />
                    <ClientField title={'Дата подписки Mobile Maximum'} value={currentClient.mobileDate} />
                </div>
                <SubmitButton callback={()=>{
                    handleCancelSub(currentClient._id)
                }} />
            </div>
        </div>
    )
}
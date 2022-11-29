import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
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



export default function ClientPage() {
    const router = useRouter()
    const {id} = router.query
    const dispatch = useDispatch()
    const currentClient = useSelector(state => state.clientsReducer.currentClient)
    const ministraClient = useSelector(state => state.clientsReducer.currentClientMinistra)
    const admin = useSelector(state => state.authReducer)

    const handleCancelSub = (id) => {
        dispatch(cancelsub(id))
        dispatch(getUser(id))
    }

    useEffect(() => {

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
        <div className="w-full min-h-screen flex-1 bg-content">
            <div className="container mx-auto text-black min-h-screen">
                <Link href={'/clients/1'}>
                    <MdNavigateBefore className='text-4xl mt-8 cursor-pointer rounded-[50%] bg-icon-bg text-white'/>
                </Link>

                <h2 className="text-3xl flex items-center mt-8 text-black font-[Roboto] font-medium">
                    <AiOutlineUser className='text-3xl mr-2'/>
                    {currentClient?.login}
                </h2>
                <div className="flex flex-wrap w-full bg-content-sec rounded-3xl p-4 mt-4">
                    <ClientField value={currentClient?.fullName} title={
                        <div className="flex items-center">
                            <FaRegAddressCard className='mr-2'/>
                            Full Name:
                        </div>
                    }/>
                    <ClientField value={currentClient?.acqId} title={
                        <div className="flex items-center">
                            <AiOutlineCode className='mr-2'></AiOutlineCode>
                            ID покупателя:
                        </div>
                    }/>
                    <ClientField value={currentClient?.orderId} title={
                        <div className="flex items-center">
                            <AiOutlineShoppingCart className='mr-2'></AiOutlineShoppingCart>
                            Order ID:
                        </div>
                    }/>
                    <ClientField value={currentClient?.address} title={
                        <div className="flex items-center">
                            <BiHomeAlt className='mr-2'></BiHomeAlt>
                            Address:
                        </div>
                    }/>
                    <ClientField value={currentClient?.phone} title={
                        <div className="flex items-center">
                            <AiFillPhone className={'mr-2'} />
                            Номер телефона:
                        </div>
                    }/>
                    <ClientField value={currentClient?.signDate} title={
                        <div className="flex items-center">
                            <AiFillPhone className={'mr-2'} />
                            Дата регистрации:
                        </div>
                    }/>
                    <div className="basis-1/2">
                        <h3 className="text-gray-600 text-xl font-medium flex items-center">
                            <FiMail className={'mr-2'} />
                            Email</h3>
                        <h3 className="text-2xl text-black font=[Roboto] font-medium">{currentClient?.email}</h3>
                    </div>
                    {currentClient?.dealer ? <div className="basis-1/2">
                        <h3 className="text-gray-600 text-xl font-medium">Dealer:</h3>
                        <h3 className="text-2xl text-black font=[Roboto] font-medium">{currentClient?.dealer}</h3>
                    </div> : <div className="basis-1/2">
                        <h3 className="text-gray-600 text-xl font-medium">Dealer:</h3>
                        <h3 className="text-2xl text-black font=[Roboto] font-medium">У этого пользователя нет
                            дилера</h3>
                    </div>}
                    <div className="basis-1/2">
                        <h3 className="text-gray-600 text-xl font-medium flex items-center">
                            <GiAerialSignal className='mr-2'/>
                            Mac Address :
                        </h3>
                        <h3 className="text-2xl text-black font=[Roboto] font-medium">{ministraClient?.stb_mac ? ministraClient.stb_mac : 'Пользователь не установил мак адрес'}</h3>
                    </div>
                    <ClientField value={ministraClient?.tariff_plan} title={
                        <div className="flex items-center">
                            <RiFundsFill className='mr-2'></RiFundsFill>
                            Тарифный план:
                        </div>
                    }/>
                    <ClientField value={ministraClient?.ministraDate} title={
                        <div className="flex items-center">
                            <RiFundsFill className='mr-2'></RiFundsFill>
                            Дата покупки:
                        </div>
                    }/>
                    <ClientField value={ministraClient?.ip} title={'IP:'}/>

                    <div className="basis-1/2">
                        <h3 className="text-gray-600 text-xl font-medium flex items-center">
                            <AiOutlineWifi className={'mr-2'} />
                            Status
                        </h3>
                        <h3 className="text-2xl text-black font=[Roboto] font-medium">{ministraClient?.online == '0' ?
                            <div className='flex items-center'>
                                <AiFillCloseCircle className='text-xl inline text-red-600'/>
                                <p>Offline</p>
                            </div>
                            :
                            <div className='flex items-center'>
                                <AiFillCheckCircle className='text-xl inline text-green-500'/>
                                <p>Online</p>
                            </div>}</h3>
                    </div>

                </div>
                <h3 className={'text-3xl mt-4'}>Подписка Mobile Maximum</h3>
                <div className={`flex flex-wrap w-full bg-content-sec rounded-3xl p-4 mt-4`}>
                    <div className="basis-1/2">
                        <h3 className="text-gray-600 text-xl font-medium flex items-center">

                            <AiOutlineWifi className={'mr-2'} />
                            Статус подписки
                        </h3>
                        <h3 className="text-2xl text-black font=[Roboto] font-medium">{currentClient.mobileSubExists ?
                            <div className='flex items-center'>
                                <AiFillCheckCircle className='text-xl inline text-green-500'/>
                                <p>Подписан</p>
                            </div>
                            :
                            <div className='flex items-center'>
                                <AiFillCloseCircle className='text-xl inline text-red-600'/>
                                <p>Не подписан</p>
                            </div>}
                        </h3>
                    </div>
                    <ClientField title={'Уровень подписки'} value={currentClient.mobileSubLevel == '1' ? 'Стандарт' : ''} />
                    <ClientField title={'Order ID'} value={currentClient.mobileSubOrderId} />
                    <ClientField title={'Дата подписки Mobile Maximum'} value={currentClient.mobileDate} />
                </div>
                <button onClick={()=>{
                    handleCancelSub(currentClient._id)
                }} className={'bg-red-600 rounded-3xl p-4'}>Отменить подписку</button>
                <button onClick={() => {
                    console.log(currentClient)
                }}>Get client
                </button>
            </div>
        </div>
    )
}
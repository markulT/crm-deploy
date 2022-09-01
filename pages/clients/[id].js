import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setCurrentClient, setCurrentMinstraClient} from "../../storage/clientsReducer/clientsReducer";
import {useRouter} from "next/router";


export default function ClientPage() {
    const router =useRouter()
    const {id} = router.query
    const dispatch = useDispatch()
    const currentClient = useSelector(state=>state.clientsReducer.currentClient)
    const ministraClient = useSelector(state=>state.clientsReducer.currentClientMinistra)
    const admin = useSelector(state=>state.authReducer)


    useEffect(()=>{

        if(!admin.login) {
            router.push('/auth/login')
        }

        dispatch(getUser(id))
        return () => {
            dispatch(setCurrentClient({}))
            dispatch(setCurrentMinstraClient({}))
        }
    },[])

    return (
        <div className="w-full min-h-screen flex-1 bg-content">
            <div className="container mx-auto text-black min-h-screen">
                <h2 className="text-3xl mt-8 text-black font-[Roboto] font-medium">{currentClient?.login}</h2>
                <span className="block h-[2px] w-full bg-black"></span>
                <div className="flex flex-wrap w-full bg-content-sec rounded-3xl p-4 mt-4">
                    <div className="basis-1/4">
                        <h3 className="text-gray-600 text-xl font-medium">Full Name:</h3>
                        <h3 className="text-2xl text-black font=[Roboto] font-medium">{currentClient?.fullName}</h3>
                    </div>
                    <div className="basis-1/4">
                        <h3 className="text-gray-600 text-xl font-medium">Acqiurer id:</h3>
                        <h3 className="text-2xl text-black font=[Roboto] font-medium">{currentClient?.acqId}</h3>
                    </div>
                    <div className="basis-1/4">
                        <h3 className="text-gray-600 text-xl font-medium">Order id:</h3>
                        <h3 className="text-2xl text-black font=[Roboto] font-medium">{currentClient?.orderId}</h3>
                    </div>
                    <div className="basis-1/4">
                        <h3 className="text-gray-600 text-xl font-medium">Address:</h3>
                        <h3 className="text-2xl text-black font=[Roboto] font-medium">{currentClient?.address}</h3>
                    </div>
                    <div className="basis-1/4">
                        <h3 className="text-gray-600 text-xl font-medium">Phone:</h3>
                        <h3 className="text-2xl text-black font=[Roboto] font-medium">{currentClient?.phone}</h3>
                    </div>
                    {currentClient?.dealer ? <div className="basis-1/4">
                        <h3 className="text-gray-600 text-xl font-medium">Dealer:</h3>
                        <h3 className="text-2xl text-black font=[Roboto] font-medium">{currentClient?.dealer}</h3>
                    </div> : <div className="basis-1/4">
                        <h3 className="text-gray-600 text-xl font-medium">Dealer:</h3>
                        <h3 className="text-2xl text-black font=[Roboto] font-medium">У этого пользователя нет дилера</h3>
                    </div>}
                    <div className="basis-1/4">
                        <h3 className="text-gray-600 text-xl font-medium">Mac Address : </h3>
                        <h3 className="text-2xl text-black font=[Roboto] font-medium">{ministraClient?.stb_mac ? ministraClient.stb_mac : 'Пользователь не установил мак адрес'}</h3>
                    </div>
                    <div className="basis-1/4">
                        <h3 className="text-gray-600 text-xl font-medium">Тарифный план: </h3>
                        <h3 className="text-2xl text-black font=[Roboto] font-medium">{ministraClient?.tariff_plan}</h3>
                    </div>
                    <div className="basis-1/4">
                        <h3 className="text-gray-600 text-xl font-medium">Ip:</h3>
                        <h3 className="text-2xl text-black font=[Roboto] font-medium">{ministraClient?.ip}</h3>
                    </div>
                    <div className="basis-1/4">
                        <h3 className="text-gray-600 text-xl font-medium">Status</h3>
                        <h3 className="text-2xl text-black font=[Roboto] font-medium">{ministraClient?.online == '0' ? 'Offline' : 'Online'}</h3>
                    </div>

                </div>
                <button onClick={()=>{
                    console.log(ministraClient)}}>Get client</button>
            </div>
        </div>
    )
}
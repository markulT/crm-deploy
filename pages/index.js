import {useSelector, useDispatch} from "react-redux"
import {getGainBy, getPage, getRandomUsers, getUsers, getUsersBy} from "../storage/clientsReducer/clientsReducer"
import {useRouter} from "next/router"
import {useState, useEffect} from "react"
import UserFieldHome from "../components/UserFieldHome"
import UserField from "../components/home/UserField";
import Stats from "../components/Analytics/Stats";
import BarChart from "../components/Analytics/BarChart";
import DoughnutChart from "../components/Analytics/DoughnutChart";

export default function Home() {
    const dispatch = useDispatch()
    const clients = useSelector(state => state.clientsReducer)
    const admin = useSelector(state => state.authReducer)
    const [pageSize, setPageSize] = useState(3)
    const [pageNumber, setPageNumber] = useState(4)
    const router = useRouter()
    const [users, setUsers] = useState([])
    const [subsChartData, setSubsChartData] = useState([])
    const [signDateData, setSignDateData] = useState([])
    const [newUsersLastMonthData, setNewUsersLastMonth] = useState([])
    const [newSubsLastMonthData, setNewSubsLastMonthData] = useState([])
    const [newPremiumLastMonthData, setNewPremiumLastMonth] = useState([])


    const getAllData = async () => {
        await getNewUsersLastMonthData()
        await getNewSubsLastMonthData()
        await getNewPremiumLastMonthData()
        await getSubsChartData()
        await getSignDateChartData()


    }

    const getNewUsersLastMonthData = async () => {
        const data = await dispatch(getGainBy("newUsersLastMonth"));

        setNewUsersLastMonth(data);
    }
    const getNewSubsLastMonthData = async () => {
        const data = await dispatch(getGainBy("newSubsLastMonth"));

        setNewSubsLastMonthData(data);
    }
    const getNewPremiumLastMonthData = async () => {
        const data = await dispatch(getGainBy("newPremiumLastMonth"));

        setNewPremiumLastMonth(data);
    }
    const getSubsChartData = async () => {
        const data = await dispatch(getUsersBy("subscription"));

        setSubsChartData(data);
    }
    const getSignDateChartData = async () => {
        const data = await dispatch(getUsersBy("signDate"));
        setSignDateData(data)
    }

    useEffect(() => {
        getAllData()
        dispatch(getRandomUsers(4))
    }, [])

    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    return (
        <div className='flex flex-col px-8 w-full min-h-screen h-full bg-outline font-primary text-primary-text py-8'>
            <div className="justify-center">
                <h1 className="text-primary-text font-bold text-4xl self-start">Главная</h1>

                <section className={"w-full grid grid-cols-3 gap-8 mt-8 mb-8"}>
                    <Stats title={"Зарегестрировано"} count={newUsersLastMonthData[0]} gain={parseFloat((newUsersLastMonthData[1]/newUsersLastMonthData[0]*100).toFixed(2))}/>
                    <Stats title={"Купили подписку"} count={newSubsLastMonthData[0]} gain={parseFloat((newSubsLastMonthData[1]/newSubsLastMonthData[0]*100).toFixed(2))}/>
                    <Stats title={"Премиум клиентов"} count={newPremiumLastMonthData[0]} gain={parseFloat((newPremiumLastMonthData[1]/newPremiumLastMonthData[0]*100).toFixed(2))}/>
                </section>

                <div className="mt-8 bg-white flex flex-col px-8 rounded-xl">
                    <div className="grid grid-cols-5 text-primary-text font-bold mt-8 p-2 py-3 bg-outline rounded-xl">
                        <div className="">Емейл</div>
                        <div className="">Полное имя</div>
                        <div className="">Номер телефона</div>
                        <div className="">Почта подтверждена</div>
                        <div className="">Подписка</div>
                    </div>
                    <div className={"p-2"}>
                        {
                            clients.users.map(client => (
                                <UserField className="bg-gray-800 " client={client} key={client._id}/>))
                        }
                    </div>

                </div>

                <div className={'lg:h-[32rem] w-full mt-8 lg:grid lg:grid-cols-5 lg:grid-rows-1 flex flex-col gap-8'}>
                    <DoughnutChart label={"Количество пользователей"} data={subsChartData}
                                   labels={['Без подписки', 'Минимум', 'Стандарт', 'Премиум']} title={"Чарт подписок"}/>
                    <BarChart color={"blue"} title={"Чарт дат регистрации по месяцах"} data={signDateData} label={'Зарегистриовано пользователей в 2023 году'} labels={months}/>
                </div>


            </div>

        </div>
    )
}
 




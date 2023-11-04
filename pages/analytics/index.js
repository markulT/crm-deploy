import DoughnutChart from "../../components/Analytics/DoughnutChart";
import {useEffect, useState} from "react";
import {getGainBy, getUsersBy, getUsersBy2} from "../../storage/clientsReducer/clientsReducer";
import {useDispatch} from "react-redux";
import BarChart from "../../components/Analytics/BarChart";
import Stats from "../../components/Analytics/Stats";


export default function Analytics() {

    const [subsChartData, setSubsChartData] = useState([])
    const [signDateData, setSignDateData] = useState([])
    const [ministraDateData, setMinistraDateData] = useState([])
    const [emailsChartData, setEmailsChartData] = useState([])
    const [newUsersLastMonthData, setNewUsersLastMonth] = useState([])
    const [newSubsLastMonthData, setNewSubsLastMonthData] = useState([])
    const [newPremiumLastMonthData, setNewPremiumLastMonth] = useState([])

    const dispatch = useDispatch()

    const getAllData = async () => {
        await getNewUsersLastMonthData()
        await getNewSubsLastMonthData()
        await getNewPremiumLastMonthData()
        await getSubsChartData()
        await getMinistraDateChartData()
        await getSignDateChartData()
        await getEmailsChartData()


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


    const getEmailsChartData = async () => {
        const data = await dispatch(getUsersBy("activated"));

        setEmailsChartData(data);
    }


    const getSubsChartData = async () => {
        const data = await dispatch(getUsersBy("subscription"));

        setSubsChartData(data);
    }

    const getSignDateChartData = async () => {
        const data = await dispatch(getUsersBy("signDate"));
        setSignDateData(data)
    }

    const getMinistraDateChartData = async () => {
        const data = await dispatch(getUsersBy("ministraDate"));
        setMinistraDateData(data)
    }



    useEffect(() => {
        getAllData()
    }, [])

    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    return (
        <div className="flex flex-col bg-outline text-primary-text w-full h-full justify-center items-center font-primary px-8 py-8">
            <h1 className="text-primary-text font-bold text-4xl self-start">Аналитика</h1>
            {/*<h1 className="text-3xl text-center text-gray-200">При большем количестве клиентов у сервиса здесь будут графики,
                <br/>информация и диаграммы, которые будут строиться на основе данных, <br/>которые мы собираем у пользователей.</h1>
            <section className={"bg-white rounded-xl flex flex-col p-4"}>
                <h1 className={"text-4xl font-semibold text-primary-text"}>
                    Общая информация
                </h1>
            </section>*/}
            <section className={"w-full grid grid-cols-3 gap-8 mt-8"}>
                <Stats title={"Зарегестрировано"} count={newUsersLastMonthData[1]} gain={newUsersLastMonthData[1] === 0 ? 0 : parseFloat((newUsersLastMonthData[0]/newUsersLastMonthData[1]*100).toFixed(2))}/>
                <Stats title={"Купили подписку"} count={newSubsLastMonthData[1]} gain={newSubsLastMonthData[1] === 0 ? 0 : parseFloat((newSubsLastMonthData[0]/newSubsLastMonthData[1]*100).toFixed(2))}/>
                <Stats title={"Премиум клиентов"} count={newPremiumLastMonthData[1]} gain={newPremiumLastMonthData[1] === 0 ? 0 : parseFloat((newPremiumLastMonthData[0]/newPremiumLastMonthData[1]*100).toFixed(2))}/>
            </section>
            <section className={"lg:grid lg:grid-cols-5 lg:grid-rows-2 flex flex-col w-full gap-8 mt-8 lg:h-[80rem]"}>
                <DoughnutChart label={"Количество пользователей"} data={subsChartData}
                               labels={['Без подписки', 'Минимум', 'Стандарт', 'Премиум', "Тестовый период"]} title={"Чарт подписок"}/>
                <BarChart color={"orange"} title={"Чарт дат покупки по месяцах"} data={ministraDateData} label={'Куплено подписок в 2023 году'} labels={months}/>
                <BarChart color={"blue"} title={"Чарт дат регистрации по месяцах"} data={signDateData} label={'Зарегистриовано пользователей в 2023 году'} labels={months}/>
                <DoughnutChart label={"Количество пользователей"} data={emailsChartData}
                               labels={['Неактивированый емейл', 'Активырований емейл']} title={"Активированые пользователи"}/>
            </section>

        </div>
    )
}

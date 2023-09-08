import {useSelector, useDispatch} from "react-redux"
import {getPage} from "../storage/clientsReducer/clientsReducer"
import {useRouter} from "next/router"
import {useState, useEffect} from "react"
import UserFieldHome from "../components/UserFieldHome"

export default function Home() {
    const dispatch = useDispatch()
    const clients = useSelector(state => state.clientsReducer)
    const admin = useSelector(state => state.authReducer)
    const [pageSize, setPageSize] = useState(2)
    const [pageNumber, setPageNumber] = useState(1)
    const router = useRouter()
    const {pageId} = router.query
    useEffect(() => {
        setPageNumber(router.query.pageId)
    }, [])
    useEffect(() => {
        setPageNumber(router.query.pageId)
        dispatch(getPage(pageSize, pageId))
    }, [router.query.pageId])
    return (
        <div className='flex-1 min-h-screen bg-outline from-gray-700 to-gray-600 font-primary'>
            <div className="justify-center">
                <div className="justify-center flex">
                    <h2 className="text-primary-text text-4xl mt-5 font-primary">Главная</h2>
                </div>

                <div className="grid gap-1 grid-rows-3 grid-flow-col mt-10 min-h-[80vh]">
                    <div
                        className="bg-gray-800 rounded-xl p-5 justify-center items-center text-center mx-10 row-span-4 ">
                        <h1 className="text-gray-200 text-2xl">Графики</h1>
                        <div className="flex justify-center items-center min-h-full ">
                            <div className="items-center ">
                                <h1 className="text-gray-300 text-2xl mb-40">
                                    В скором времени, тут <br/>будет превью страницы

                                </h1>
                            </div>
                        </div>
                    </div>
                    <div
                        className="bg-gray-800 rounded-xl p-5 py-10 justify-center items-center text-center mx-10 col-span-2 ">
                        <h1 className="text-gray-200 text-2xl">Администраторы
                        </h1>
                        <div className="flex justify-center items-center min-h-full ">
                            <div className="mt-4 items-center ">
                                <h1 className="text-gray-300 mb-10">
                                    Скоро тут будут <br/> отображаться администраторы
                                </h1>
                            </div>
                        </div>
                    </div>
                    {/*<div className="bg-gray-800 rounded-xl p-5 py-10 mt-5 mx-10 row-span-2 col-span-2">*/}
                    {/*    <div className="text-center">*/}
                    {/*        <h1 className="text-gray-200 text-2xl cursor-pointer" onClick={() => {*/}
                    {/*            router.push('/clients/1')*/}
                    {/*        }}>Клиенты</h1>*/}
                    {/*    </div>*/}

                    {/*    <div className="mt-4 grid gap-1 gap-x-4 grid-cols-1 grid-rows-2">*/}
                    {/*        {clients.users.map(client => (*/}
                    {/*            <UserFieldHome className="bg-gray-800 " client={client} key={client._id}/>))}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <section className={"bg-white rounded-xl flex flex-col p-4"}>
                        <h1 className={"text-4xl font-semibold text-primary-text"}>
                            Клиенты
                        </h1>
                        <div className="grid grid-cols-3 text-primary-text mt-8">
                            <div className="rounded-l-xl bg-outline p-2 ">Client ID</div>
                            <div className="bg-outline p-2">Name</div>
                            <div className="rounded-r-xl bg-outline p-2">Email</div>

                            <div className="p-2">1</div>
                            <div className="p-2">John Doe</div>
                            <div className="p-2">johndoe@example.com</div>
                        </div>

                    </section>
                </div>

            </div>

        </div>
    )
}
 




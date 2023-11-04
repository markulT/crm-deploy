import {useDispatch, useSelector} from "react-redux";
import {
    createClient,
    getUsers,
    deleteClient,
    getPage,
    findUsersRegex, getPageBy
} from "../../storage/clientsReducer/clientsReducer";
import {useEffect, useState} from "react";

import {BiSearch} from "@react-icons/all-files/bi/BiSearch";
import {useRouter} from "next/router";

import {VscDebugRestart} from "@react-icons/all-files/vsc/VscDebugRestart";
import UserField from "../../components/home/UserField";
import {useRef} from "react";
import Filter from "../../components/ClientsPage/Filter";
import PopUpCreateLink from "../../components/PopUps/PopUpCreateLink";


export default function Clients() {
    const dispatch = useDispatch()
    const clients = useSelector(state => state.clientsReducer)
    const router = useRouter()
    const {pageId} = router.query


    const [create, setCreate] = useState(false)
    const [search, setSearch] = useState('')
    const [visibleTrigger, setVisibleTrigger] = useState(false)

    const ref = useRef(null);
    const onClickRefresh = () => {
        const refreshAnimate = ref.current;
        dispatch(getPage(pageSize, pageId))
    };
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [invitationLinkVisible, setInvitationLinkVisible] = useState(false)
    const [pageSize, setPageSize] = useState(12)
    const pageCount = useSelector(state => state.clientsReducer.pageCount)
    const [pageNumber, setPageNumber] = useState(1)
    const admin = useSelector(state => state.authReducer)


    const [filters, setFilters] = useState({})

    const submitCreate = async () => {
        setCreate(false)
        await dispatch(createClient(password, fullName, email, phone, address))
        clearForm()
        dispatch(getPage(pageSize, pageId))
    }

    const createInvitationLink = async () => {
        setInvitationLinkVisible(true)
    }
    const clearForm = () => {
        setEmail('');
        setPassword('');
        setPhone('');
        setFullName('');
        setAddress('');
    };

    const deleteUser = async (id) => {
        await dispatch(deleteClient(id))
        dispatch(getUsers())
    }


    useEffect(() => {
        setPageNumber(router.query.pageId)
    }, [])

    useEffect(() => {
        setPageNumber(router.query.pageId)
        dispatch(getPageBy(pageSize, pageId, filters))
    }, [router.query.pageId])

    useEffect(() => {
        setPageNumber(1)
        router.push(`/clients/${Number(1)}`)
        dispatch(getPageBy(pageSize, pageId, filters))
    }, [filters])

    const findUsers = async (searchQuery) => {
        if (searchQuery == '') {
            setPageNumber(router.query.pageId)
            return
        }
        await dispatch(findUsersRegex(searchQuery))
        setSearch("")
    }

    const goToPrevious = () => {
        pageNumber != 1 ?
            router.push(`/clients/${Number(pageNumber) - 1}`)
            : ''
    }

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        // Perform your search action here with the search value
        findUsers(search);
    };

    return (
        <div className="flex relative flex-col h-fit min-h-screen w-full justify-start bg-outline font-primary px-8">
            <PopUpCreateLink visible={invitationLinkVisible} setVisible={setInvitationLinkVisible} dealerCode={admin.email || admin.login} link={`http://localhost:3000/auth/signup?dealerCode=${admin.email || admin.login}`}/>
            <Filter trigger={visibleTrigger} setTrigger={setVisibleTrigger} filters={filters} setFilters={setFilters}/>
            <div className={"flex lg:flex-row flex-col w-full justify-between mt-8"}>
                <h1 className="text-primary-text font-bold text-4xl ">Карточки клиентов</h1>
                <div className={"flex mt-4 lg:mt-0"}>
                    <form onSubmit={handleFormSubmit}>
                        <div className="flex bg-white rounded-xl px-4">
                            <div
                                className="flex items-center text-2xl cursor-pointer text-secondary-text mr-2"
                                onClick={() => {
                                    findUsers(search);
                                }}
                            >
                                <BiSearch/>
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.currentTarget.value);
                                }}
                                className="text-secondary-text bg-transparent border-none outline-none"
                                required
                                placeholder="Поиск"
                            />
                        </div>
                        <button type="submit" style={{display: 'none'}}></button>
                    </form>
                    {admin.role === "Dealer" ? <button
                        className={"bg-success hover:bg-success-dark  transition-all duration-300 ease-in px-8 rounded-xl ml-4"}
                        onClick={
                            createInvitationLink
                        }>Пригласить клиента

                    </button> : <></>}
                    <button
                        className={"bg-button hover:bg-button-dark transition-all duration-300 ease-in  px-8 rounded-xl ml-4"}
                        onClick={() => {
                            // setCreate(!create)
                            router.push("add")
                        }}>Добавить

                    </button>

                    <button
                        className={"bg-active hover:bg-active-dark transition-all duration-300 ease-in px-8 rounded-xl ml-4"}
                        onClick={() => {
                            setVisibleTrigger(!visibleTrigger)
                        }}>Фильтр

                    </button>
                </div>
            </div>


            <section className={"bg-white rounded-xl w-full mt-8"}>
                <div className="mt-4 flex flex-col mx-8 ">
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
                {/*<div className={'flex mt-4 text-center items-center justify-center text-primary-text'}>*/}
                {/*    {pageNumber != 1 && (*/}
                {/*        <Link href={`/clients/${Number(pageNumber) - 1}`}>*/}
                {/*            <MdNavigateBefore className='text-4xl cursor-pointer active:animate-left_pag_animate'/>*/}
                {/*        </Link>*/}
                {/*    )}*/}
                {/*    <p className="text-primary-text text-2xl text-center">{pageId}</p>*/}
                {/*    <Link href={`/clients/${Number(pageNumber) + 1}`}>*/}
                {/*        <MdNavigateNext className='text-4xl cursor-pointer active:animate-right_pag_animate'/>*/}
                {/*    </Link>*/}
                {/*</div>*/}
            </section>
            <div className={"flex w-full justify-end mt-4 mb-8"}>
                <button className={"text-secondary-text border border-secondary-text p-2 px-4 rounded-xl"}
                        onClick={goToPrevious}>
                    Предідущуя
                </button>
                <div className={"bg-secondary-text px-4 p-2 mx-4 rounded-xl"}>
                    {pageId}
                </div>
                {/*{(clients.users.length-1) / pageSize > pageNumber ?*/}
                {/*    <div className={"px-4 p-2 rounded-xl text-secondary-text cursor-pointer"}*/}
                {/*      onClick={() => router.push(`/clients/${Number(pageNumber) + 1}`)}>*/}
                {/*    {Number(pageNumber) + 1}*/}
                {/*</div>*/}
                {/*    : <></>*/}
                {/*}*/}
                {/*{(clients.users.length-1) / pageSize > pageNumber + 1 ?*/}
                {/*    <div className={"px-4 p-2 rounded-xl text-secondary-text cursor-pointer"}*/}
                {/*         onClick={() => router.push(`/clients/${Number(pageNumber) + 2}`)}>*/}
                {/*        {Number(pageNumber) + 2}*/}
                {/*    </div>*/}
                {/*    : <></>*/}
                {/*}*/}
                <button className={"text-secondary-text border border-secondary-text p-2 px-4 rounded-xl"}
                        onClick={() => router.push(`/clients/${Number(pageNumber) + 1}`)}>
                    Следующая
                </button>

                <div className={"flex items-center ml-4"}>
                    <VscDebugRestart ref={ref} onClick={() =>
                        onClickRefresh()
                    }
                                     className="text-2xl text-secondary-text cursor-pointer font-bold mr-4 group-hover:animate-refresh_rotate"/>
                </div>
            </div>

        </div>
    )
}

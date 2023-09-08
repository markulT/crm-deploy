import {useDispatch, useSelector} from "react-redux";
import {
    createClient,
    getUsers,
    deleteClient,
    getPage,
    findUsersRegex
} from "../../storage/clientsReducer/clientsReducer";
import {useEffect, useState} from "react";
import {BiPlus} from "@react-icons/all-files/bi/BiPlus";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {InputAdornment, Pagination, PaginationItem, TextField} from "@mui/material";
import {BiSearch} from "@react-icons/all-files/bi/BiSearch";
import {useRouter} from "next/router";
import {FaCheck} from "@react-icons/all-files/fa/FaCheck";
import {ImCross} from "@react-icons/all-files/im/ImCross";
import Link from "next/link";
import {BiTrash} from "@react-icons/all-files/bi/BiTrash";
import {ImNext} from "@react-icons/all-files/im/ImNext";
import {MdNavigateNext} from "@react-icons/all-files/md/MdNavigateNext";
import {MdNavigateBefore} from "@react-icons/all-files/md/MdNavigateBefore";
import {VscDebugRestart} from "@react-icons/all-files/vsc/VscDebugRestart";
import UserField from "../../components/home/UserField";
import {useRef} from "react";


export default function Clients() {
    const dispatch = useDispatch()
    const clients = useSelector(state => state.clientsReducer)
    const router = useRouter()
    const {pageId} = router.query


    const [create, setCreate] = useState(false)
    const [search, setSearch] = useState('')

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
    const [pageSize, setPageSize] = useState(12)
    const pageCount = useSelector(state => state.clientsReducer.pageCount)
    const [pageNumber, setPageNumber] = useState(1)
    const admin = useSelector(state => state.authReducer)

    const submitCreate = async () => {
        setCreate(false)
        await dispatch(createClient(password, fullName, email, phone, address))
        clearForm()
        dispatch(getPage(pageSize, pageId))
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
        console.log(clients.users[2])
    }, [])
    useEffect(() => {
        setPageNumber(router.query.pageId)
        dispatch(getPage(pageSize, pageId))
    }, [router.query.pageId])

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

    return (
        <div className="flex flex-col h-full min-h-screen w-screen justify-start bg-outline font-primary px-16">

            <div className={"flex w-full justify-between mt-8"}>
                <h1 className="text-primary-text font-bold text-4xl ">Карточки клиентов</h1>
                <div className={"flex"}>
                    <div className="flex bg-white rounded-xl px-4">
                        <div className="flex items-center text-2xl cursor-pointer text-secondary-text mr-2"
                             onClick={() => {
                                 findUsers(search)
                             }}>
                            <BiSearch/>

                        </div>
                        <input type="text" value={search} onChange={(e) => {
                            setSearch(e.currentTarget.value)
                        }}
                               className="text-secondary-text bg-transparent border-none outline-none"
                               required placeholder="Поиск"/>
                    </div>
                    <button className={"bg-button px-8 rounded-xl ml-4"} onClick={() => {
                        setCreate(!create)
                    }}>Добавить

                    </button>
                </div>
            </div>


            <div
                className={`absolute min-w-screen left-0 right-0 top-0 backdrop-blur-sm z-[12] flex flex-col items-center justify-center min-h-screen ${create ? 'visible' : 'hidden'}`}
                onClick={(e) => {
                    if (e.target.closest('div.absolute') == e.target) setCreate(false)
                }}>
                <div className="bg-gray-700 pt-8 pb-8 pr-16 pl-16 rounded-3xl justify-center items-center ">
                    <form className=" grid gap-4 gap-x-10 grid-cols-2 grid-rows-3" onClick={(e) => {

                        e.preventDefault()
                    }}>
                        <div className="group">
                            <input type="text" value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                                   className="text-md px-20 rounded-lg border-8  focus:border-gray-300  focus:border-8 block w-full pl-3 bg-gray-600 border-gray-500  text-gray-300 autofill:bg-gray-800 transition-all duration-300"
                                   required/>
                            <label className="ml-2 text-gray-400">Email</label>
                        </div>
                        <div className="group">
                            <input type="text" value={fullName} onChange={(e) => {
                                setFullName(e.target.value)
                            }}
                                   className="text-md px-20 rounded-lg border-8  focus:border-gray-300  focus:border-8 block w-full pl-3 bg-gray-600 border-gray-500  text-gray-300 autofill:bg-gray-800 transition-all duration-300"
                                   required/>
                            <label className="ml-2 text-gray-400">Имя фамилия</label>
                        </div>
                        <div className="group">
                            <input type="password" value={password} onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                                   className="text-md px-20 rounded-lg border-8  focus:border-gray-300  focus:border-8 block w-full pl-3 bg-gray-600 border-gray-500  text-gray-300 autofill:bg-gray-800 transition-all duration-300"
                                   required/>
                            <label className="ml-2 text-gray-400">Пароль</label>
                        </div>
                        <div className="group">
                            <input type="text" value={phone} onChange={(e) => {
                                setPhone(e.target.value)
                            }}
                                   className="text-md px-20 rounded-lg border-8  focus:border-gray-300  focus:border-8 block w-full pl-3 bg-gray-600 border-gray-500  text-gray-300 autofill:bg-gray-800 transition-all duration-300"
                                   required/>
                            <label className="ml-2 text-gray-400">Phone</label>
                        </div>
                        <div className="group col-span-2">
                            <input type="text" value={address} onChange={(e) => {
                                setAddress(e.target.value)
                            }}
                                   className="text-md px-20 rounded-lg border-8  focus:border-gray-300  focus:border-8 block w-full pl-3 bg-gray-600 border-gray-500  text-gray-300 autofill:bg-gray-800 transition-all duration-300"
                                   required/>
                            <label className="ml-2 text-gray-400">Адресс</label>
                        </div>

                    </form>
                    <div className={"flex justify-center"}>
                        <button onClick={submitCreate}
                                className="bg-violetButton transition-all duration-500 hover:scale-105 hover:bg-violetButtonDark justify-self-center rounded-xl w-2/3 py-3 text-lg font-medium text-content">Отправить
                        </button>
                    </div>
                </div>

            </div>

            {/*add and refresh*/}
            {/*<div*/}
            {/*    className="flex w-full place-content-between items-center relative  mt-4 p-4 rounded-xl bg-gray-800">*/}
            {/*    <div className="flex items-center space-x-6">*/}
            {/*        <div>*/}
            {/*            <button onClick={() => {*/}
            {/*                setCreate(!create)*/}
            {/*            }}*/}
            {/*                    className=" bg-gray-600 hover:bg-gray-700 flex items-center rounded-2xl p-2 px-6  text-gray-200">*/}
            {/*                <FaPlus className="text-xl font-semibold mr-4"/>Add <br/>customer*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*        <div className={'container  text-gray-200'}>*/}
            {/*            <button className={'flex items-center rounded-2xl p-4 bg-gray-600 hover:bg-gray-700'}*/}
            {/*                    onClick={() => {*/}
            {/*                        onClickRefresh()*/}
            {/*                        dispatch(getPage(pageSize, pageId))*/}
            {/*                    }}>*/}
            {/*                <VscDebugRestart ref={ref}*/}
            {/*                                 className="text-xl font-bold mr-4 group-hover:animate-refresh_rotate"/>*/}
            {/*                Refresh*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*</div>*/}
            <section className={"bg-white rounded-xl w-full mt-8"}>
                <div className="mt-4 flex flex-col mx-8 ">
                    <div className="grid grid-cols-3 text-primary-text font-bold mt-8 p-2 py-3 bg-outline rounded-xl">
                        <div className="">Емейл</div>
                        <div className="">Полное имя</div>
                        <div className="">Номер телефона</div>
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
            <div className={"flex w-full justify-end mt-4 "}>
                <button className={"text-secondary-text border border-secondary-text p-2 px-4 rounded-xl"}
                        onClick={goToPrevious}>
                    Предідущуя
                </button>
                <div className={"bg-secondary-text px-4 p-2 ml-4 rounded-xl"}>
                    {pageId}
                </div>
                <div className={"px-4 p-2 rounded-xl text-secondary-text cursor-pointer"}
                     onClick={() => router.push(`/clients/${Number(pageNumber) + 1}`)}>
                    {Number(pageNumber) + 1}
                </div>
                <div className={"px-4 p-2 rounded-xl text-secondary-text cursor-pointer"}
                     onClick={() => router.push(`/clients/${Number(pageNumber) + 2}`)}>
                    {Number(pageNumber) + 2}
                </div>
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

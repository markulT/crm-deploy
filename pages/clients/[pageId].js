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
import UserField from "../../components/UserField";


export default function Clients() {
    const dispatch = useDispatch()
    const clients = useSelector(state => state.clientsReducer)
    const router = useRouter()
    const {pageId} = router.query

    const [create, setCreate] = useState(false)
    const [search, setSearch] = useState('')

    const [userLogin, setUserLogin] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [pageSize, setPageSize] = useState(5)
    const pageCount = useSelector(state => state.clientsReducer.pageCount)
    const [pageNumber, setPageNumber] = useState(1)

    const submitCreate = async () => {
        await dispatch(createClient(userLogin, password, fullName, email, phone, address))
        setCreate(false)
        dispatch(getUsers())

    }

    const deleteUser = async (id) => {
        await dispatch(deleteClient(id))
        dispatch(getUsers())
    }

    useEffect(() => {
        setPageNumber(router.query.pageId)
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
    }


    return (
        <div className="w-full flex-1 h-screen bg-content">
            <div className="container mx-auto text-black">
                <div className="flex justify-between mt-4 lg:mt-8">
                    <h2 className="text-4xl">Clients</h2>
                    <button onClick={() => {
                        setCreate(!create)
                    }} className="bg-wild-orange flex items-center rounded-3xl p-4 font-medium text-white">
                        <FaPlus className="text-xl font-bold mr-4"/>Add customer
                    </button>
                </div>
                <div className={'container mx-auto text-black'}>
                    <button className={'flex items-center rounded-3xl p-4 bg-icon-bg'} onClick={() => {
                        dispatch(getPage(pageSize, pageId))
                    }}>
                        <VscDebugRestart />
                        Refresh</button>
                </div>
                <div
                    className={`absolute left-0 top-0 backdrop-blur-sm w-full z-[12] flex flex-col items-center justify-center min-h-screen ${create ? 'visible' : 'hidden'}`}
                    onClick={(e) => {
                        if (e.target.closest('div.absolute') == e.target) setCreate(false)
                    }}>
                    <form className="bg-navbar pt-8 pb-8 pr-16 pl-16 rounded-3xl" onClick={(e) => {

                        e.preventDefault()
                    }}>

                        <div className="group">
                            <input type="text" value={userLogin} onChange={(e) => {
                                setUserLogin(e.target.value)
                            }} className="bg-transparent" required/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Логин</label>
                        </div>
                        <div className="group">
                            <input type="password" value={password} onChange={(e) => {
                                setPassword(e.target.value)
                            }} className="bg-transparent" required/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Пароль</label>
                        </div>
                        <div className="group">
                            <input type="text" value={fullName} onChange={(e) => {
                                setFullName(e.target.value)
                            }} className="bg-transparent" required/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Имя фамилия</label>
                        </div>
                        <div className="group">
                            <input type="text" value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }} className="bg-transparent" required/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Email</label>
                        </div>
                        <div className="group">
                            <input type="text" value={phone} onChange={(e) => {
                                setPhone(e.target.value)
                            }} className="bg-transparent" required/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Phone</label>
                        </div>
                        <div className="group">
                            <input type="text" value={address} onChange={(e) => {
                                setAddress(e.target.value)
                            }} className="bg-transparent" required/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Адресс</label>
                        </div>
                        <button onClick={submitCreate}
                                className="bg-wild-orange rounded-3xl p-3 text-lg font-medium text-content">Отправить
                        </button>
                    </form>

                </div>
                <div className="flex w-full items-center mt-4 p-4 rounded-xl bg-content-sec">
                    <TextField id="outlined-basic" value={search} onChange={(e) => setSearch(e.currentTarget.value)}
                               label="Search" variant="outlined"/>
                    <div className="p-4 text-2xl cursor-pointer" onClick={() => {
                        findUsers(search)
                    }}>
                        <BiSearch/>
                    </div>
                </div>
                <div className="mt-4">
                    {clients.users.map(client=>(<UserField client={client} key={client._id} />))}

                </div>
                <div className={'flex mt-8'}>
                    {pageNumber != 1 && <Link href={`/clients/${Number(pageNumber) - 1}`}>
                        <MdNavigateBefore className='text-4xl cursor-pointer'/>
                    </Link>}
                    <Link href={`/clients/${Number(pageNumber) + 1}`}>
                        <MdNavigateNext className={'ml-4 text-4xl cursor-pointer'}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

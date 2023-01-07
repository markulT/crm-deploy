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
import { useRef } from "react";


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
  };

    const [userLogin, setUserLogin] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [pageSize, setPageSize] = useState(8)
    const pageCount = useSelector(state => state.clientsReducer.pageCount)
    const [pageNumber, setPageNumber] = useState(1)

    const submitCreate = async () => {
        await dispatch(createClient(userLogin, password, fullName, email, phone, address))
        setCreate(false)

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
        <div className=" flex-1 min-h-screen bg-gradient-to-t from-gray-700 to-gray-600">
            <div className="container px-6 mx-auto text-gray-200">
                <div className="flex justify-center mt-4 lg:mt-8">
                    <div className="text-center">
                    <h2 className="text-gray-200 text-4xl">Clients</h2>
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
                            <input type="text" value={userLogin} onChange={(e) => {
                                setUserLogin(e.target.value)
                            }} className="text-md px-20 rounded-lg border-8  focus:border-gray-300  focus:border-8 block w-full pl-3 bg-gray-600 border-gray-500  text-gray-300 autofill:bg-gray-800 transition-all duration-300" required/>
                            <label className="ml-2 text-gray-400">Логин</label>
                        </div>
                        <div className="group">
                            <input type="password" value={password} onChange={(e) => {
                                setPassword(e.target.value)
                            }} className="text-md px-20 rounded-lg border-8  focus:border-gray-300  focus:border-8 block w-full pl-3 bg-gray-600 border-gray-500  text-gray-300 autofill:bg-gray-800 transition-all duration-300" required/>
                            <label className="ml-2 text-gray-400">Пароль</label>
                        </div>
                        <div className="group">
                            <input type="text" value={fullName} onChange={(e) => {
                                setFullName(e.target.value)
                            }} className="text-md px-20 rounded-lg border-8  focus:border-gray-300  focus:border-8 block w-full pl-3 bg-gray-600 border-gray-500  text-gray-300 autofill:bg-gray-800 transition-all duration-300" required/>
                            <label className="ml-2 text-gray-400">Имя фамилия</label>
                        </div>
                        <div className="group">
                            <input type="text" value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }} className="text-md px-20 rounded-lg border-8  focus:border-gray-300  focus:border-8 block w-full pl-3 bg-gray-600 border-gray-500  text-gray-300 autofill:bg-gray-800 transition-all duration-300" required/>
                            <label className="ml-2 text-gray-400">Email</label>
                        </div>
                        <div className="group">
                            <input type="text" value={phone} onChange={(e) => {
                                setPhone(e.target.value)
                            }} className="text-md px-20 rounded-lg border-8  focus:border-gray-300  focus:border-8 block w-full pl-3 bg-gray-600 border-gray-500  text-gray-300 autofill:bg-gray-800 transition-all duration-300" required/>
                            <label className="ml-2 text-gray-400">Phone</label>
                        </div>
                        <div className="group">
                            <input type="text" value={address} onChange={(e) => {
                                setAddress(e.target.value)
                            }} className="text-md px-20 rounded-lg border-8  focus:border-gray-300  focus:border-8 block w-full pl-3 bg-gray-600 border-gray-500  text-gray-300 autofill:bg-gray-800 transition-all duration-300" required/>
                           <label className="ml-2 text-gray-400">Адресс</label>
                        </div>
                        
                    </form>
                    <button onClick={submitCreate}
                                className="bg-indigo-600 transition-all duration-300  hover:bg-indigo-700 justify-self-center rounded-3xl p-3 text-lg font-medium text-content">Отправить
                        </button>
                        </div>

                </div>
                    <div className="flex w-full place-content-between items-center relative  mt-4 p-4 rounded-xl bg-gray-800">
                    <div className="flex ">
                    {/* <TextField id="outlinedbasic" value={search} onChange={(e) => setSearch(e.currentTarget.value)}
                               label="Поиск" variant="outlined"  /> */}
                              <div>
                               <input type="text" value={search} onChange={(e)=>{setSearch(e.currentTarget.value)}} className="text-md relative  rounded-lg border-8  focus:border-gray-300  focus:border-8 block  pl-3 bg-gray-600 border-gray-500  text-gray-300 autofill:bg-gray-800" required  placeholder="Поиск"/>
                            {/* <label className="ml-2 absolute left-2 top-7 text-gray-400">Поиск</label> */}
                            </div>
                    <div className="p-4 text-2xl cursor-pointer" onClick={() => {
                        findUsers(search)
                    }}>
                        <BiSearch/>
                        
                    </div>
                    </div> 
                    <div className="flex items-center space-x-6">
                    <div>
                    <button onClick={() => {
                        setCreate(!create)
                    }} className=" bg-gray-600 hover:bg-gray-700 flex items-center rounded-2xl p-2 px-6  text-gray-200">
                        <FaPlus className="text-xl font-semibold mr-4"/>Add <br/>customer
                    </button>
</div>
                    <div className={'container  text-gray-200'}>
                    <button className={'flex items-center rounded-2xl p-4 bg-gray-600 hover:bg-gray-700'} onClick={() => {
                        onClickRefresh()
                        dispatch(getPage(pageSize, pageId))
                    }}>
                        <VscDebugRestart ref={ref} className="text-xl font-bold mr-4 group-hover:animate-refresh_rotate" />
                        Refresh</button>
                </div>
                </div>
                   
                </div>
                <div className="mt-4 grid gap-1 gap-x-4 grid-cols-2 grid-rows-1">
                    {clients.users.map(client=>(<UserField className="bg-gray-800 " client={client} key={client._id} />))}

                </div>
                <div className={'flex mt-4'}>
                    {pageNumber != 1 && <Link href={`/clients/${Number(pageNumber) - 1}`}>
                        <MdNavigateBefore className='text-4xl cursor-pointer active:animate-left_pag_animate'/>
                    </Link>}
                    <Link href={`/clients/${Number(pageNumber) + 1}`}>
                        <MdNavigateNext className={'ml-4 text-4xl cursor-pointer active:animate-right_pag_animate'} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

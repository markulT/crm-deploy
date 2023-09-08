import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {BiSearch} from "@react-icons/all-files/bi/BiSearch";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {VscDebugRestart} from "@react-icons/all-files/vsc/VscDebugRestart";
import UserField from "../../components/home/UserField";
import Link from "next/link";
import {MdNavigateBefore} from "@react-icons/all-files/md/MdNavigateBefore";
import {MdNavigateNext} from "@react-icons/all-files/md/MdNavigateNext";
import {useEffect, useRef, useState} from "react";
import {createChannel, getChannels, getImage, getPageChannels} from "../../storage/channelsReducer/channelReducer";
import ChannelField from "../../components/ChannelField";
import {BiImages} from "@react-icons/all-files/bi/BiImages";
import { MdImageSearch } from "react-icons/md";
import { VscDesktopDownload } from "react-icons/vsc";


export default function Channels() {
    const dispatch = useDispatch()
    const router = useRouter()
    const loadedImage = useSelector(state=>state.channelReducer.image)
    const channelArr = useSelector(state=>state.channelReducer.channels)
    const {pageId} = router.query
    const [create, setCreate] = useState(false)
    const ref = useRef(null)
    const onClickRefresh = () => {
        const refreshAnimate = ref.current;
    };
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState()
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(4)

    // useEffect(() => {
    //     setPageNumber(router.query.pageId)
    //     // dispatch(getChannels())
    // }, [])
    useEffect(() => {
        setPageNumber(router.query.pageId)
        dispatch(getPageChannels(pageSize, router.query.pageId))
    }, [router.query.pageId])

    function handleFunction(e) {
        const image = new Image()
        image.src = e.target.result
        image.onload = () => {
        }
        const {height, width} = image
        setImage(e.target.files[0])
    }


    async function submitCreate() {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("title", title)
        formData.append("description", description)
        formData.append("image", image)
        await dispatch(createChannel(formData))
        await dispatch(getPageChannels(pageSize, router.query.pageId))
    }

    return (
        <div className=" flex-1 min-h-screen bg-gradient-to-t from-gray-700 to-gray-600">
            <div className="container px-6 mx-auto text-gray-200">
                <div className="flex justify-center mt-4 lg:mt-8">
                    <div className="text-center">
                        <h2 className="text-gray-200 text-4xl">Channels</h2>
                    </div>


                </div>

                <div
                    className={`absolute min-w-screen left-0 right-0 top-0 backdrop-blur-sm z-[12] flex flex-col items-center justify-center min-h-screen ${create ? 'visible' : 'hidden'}`}
                    onClick={(e) => {
                        if (e.target.closest('div.absolute') == e.target) setCreate(false)
                    }}>
                    <div className="bg-gray-700 pt-8 pb-8 pr-8 pl-8 rounded-3xl justify-center items-center ">
                        <form className=" grid gap-4 gap-x-10 grid-cols-2 grid-rows-2">

                            <div className="group">
                                <input type="text" value={name} onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                       className="text-md px-5 rounded-lg border-8  focus:border-gray-300  focus:border-8 block w-full pl-3 bg-gray-600 border-gray-500  text-gray-300 autofill:bg-gray-800 transition-all duration-300"
                                       required/>
                                <label className="ml-2 text-gray-400">Идентификатор</label>
                            </div>
                            <div className="group">
                                <input type="text" value={title} onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                                       className="text-md px-5 rounded-lg border-8  focus:border-gray-300  focus:border-8 block w-full pl-3 bg-gray-600 border-gray-500  text-gray-300 autofill:bg-gray-800 transition-all duration-300"
                                       required/>
                                <label className="ml-2 text-gray-400">Заголовок</label>
                            </div>
                            <div className="group">
                                <input type="text" value={description} onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                                       className="text-md px-5 rounded-lg border-8  focus:border-gray-300  focus:border-8 block w-full pl-3 bg-gray-600 border-gray-500  text-gray-300 autofill:bg-gray-800 transition-all duration-300"
                                       required/>
                                <label className="ml-2 text-gray-400">Описание</label>
                            </div>
                            <div>
                                <input type="file" accept="image/png, image/jpeg, image/webp"  className="text-md px-5 rounded-lg border-8  focus:border-gray-300  focus:border-8 block w-full pl-3 bg-gray-600 border-gray-500  text-gray-400 autofill:bg-gray-800 transition-all duration-300"
                                       onChange={handleFunction}/>
                            </div>

                        </form>
                        <button onClick={submitCreate}
                                className="bg-indigo-600 transition-all duration-300  hover:bg-indigo-700 justify-self-center rounded-2xl p-3 text-lg font-medium text-content">Добавить
                        </button>
                    </div>

                </div>

                {/*/it is here*/}

                <div
                    className="flex w-full place-content-between items-center relative  mt-4 p-4 rounded-xl bg-gray-800">

                    <div className="flex items-center space-x-6">
                        <div>
                            <button onClick={() => {
                                setCreate(!create)
                            }}
                                    className=" bg-gray-600 hover:bg-gray-700 flex items-center rounded-2xl p-2 px-6  text-gray-200">
                                <FaPlus className="text-xl font-semibold mr-4"/>Добавить <br/>канал
                            </button>
                        </div>
                        <div className={'container  text-gray-200'}>
                            <button className={'flex items-center rounded-2xl p-4 bg-gray-600 hover:bg-gray-700'}
                                    onClick={() => {
                                        onClickRefresh()
                                        dispatch(getPageChannels(pageSize, pageId))
                                    }}>
                                <VscDebugRestart ref={ref}
                                                 className="text-xl font-bold mr-4 group-hover:animate-refresh_rotate"/>
                                Refresh
                            </button>
                        </div>
                        {/* <div className={'container text-gray-200'}>
                            <button className={'flex whitespace-nowrap items-center rounded-2xl p-4 bg-gray-600 hover:bg-gray-700'}
                                    onClick={() => {
                                        dispatch(getImage(`Fuhrer_Adolf_Hitler33e52c8d-cd1d-456c-a2c4-2d6a62aafe12.png`))
                                    }}>
                                <MdImageSearch ref={ref}
                                                 className="text-xl font-bold mr-4 group-hover:animate-refresh_rotate"/>
                                Get image
                            </button>
                        </div> */}
                        <div className={'container text-gray-200'}>
                            <button className={'flex whitespace-nowrap items-center rounded-2xl p-4 bg-gray-600 hover:bg-gray-700'}
                                    onClick={() => {
                                        dispatch(getChannels())
                                    }}>
                                <VscDesktopDownload ref={ref}
                                                 className="text-xl font-bold mr-4 group-hover:animate-refresh_rotate"/>
                                Get channels
                            </button>
                        </div>
                    </div>

                </div>
                {/*<div className={'flex mt-4'}>*/}
                {/*    <img src={`data:image/png;base64,${loadedImage}`} />*/}
                {/*</div>*/}

                <div className={"mt-4 grid gap-1 gap-x-4 gap-y-4 grid-cols-2 grid-rows-1"}>
                    {channelArr.map(channel=>(<ChannelField key={channel._id} channel={channel} />))}
                </div>

                <div className={'flex mt-4'}>
                    {pageNumber != 1 && <Link href={`/channels/${Number(pageNumber) - 1}`}>
                        <MdNavigateBefore className='text-4xl cursor-pointer active:animate-left_pag_animate'/>
                    </Link>}
                    <Link href={`/channels/${Number(pageNumber) + 1}`}>
                        <MdNavigateNext className={'ml-4 text-4xl cursor-pointer active:animate-right_pag_animate'}/>
                    </Link>
                </div>
            </div>
        </div>
    )

}
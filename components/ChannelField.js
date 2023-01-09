import {useRouter} from "next/router";
import {BiTrash} from "@react-icons/all-files/bi/BiTrash";
import {useDispatch} from "react-redux";
import {deleteChannel} from "../storage/channelsReducer/channelReducer";

export default function ChannelField({channel}) {
    const router = useRouter()
    const regex = /\.[0-9a-z]+$/i
    const dispatch = useDispatch()

    function handleDelete() {
        dispatch(deleteChannel(channel._id))
    }

    return (
        <div className={"flex items-center basis-1/2 relative bg-gray-800 p-2 rounded-lg"} >
            <img src={`data:image/${channel.imgName.match(regex)[0].substr(1)};base64,${channel.imgData}`} className="w-20 h-20 rounded-lg" onClick={()=>{
            router.push(`/channelEdit/${channel._id}`)
        }}/>
            <div className={"ml-2 grid gap-1 grid-cols-1 grid-rows-2"} onClick={()=>{
            router.push(`/channelEdit/${channel._id}`)
        }}>
            
            <div>
            <div className="text-gray-300 text-sm">Название:</div>
            <div className="text-gray-200">{channel.name}</div>
            </div>

            <div>
            <div className="text-gray-300 text-sm">Описание:</div>
            <div className="text-gray-200">{channel.title}</div>
            </div>

            </div>
            <BiTrash className={"text-4xl cursor-pointer absolute right-3 text-gray-300 hover:text-gray-400 transition-all duration-300"} onClick={handleDelete} />
        </div>
    )
}
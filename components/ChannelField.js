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
        <div className={"flex items-center basis-1/2"} onClick={()=>{
            router.push(`/channelEdit/${channel._id}`)
        }}>
            <div>{channel.name}</div>
            <div>{channel.title}</div>
            <img src={`data:image/${channel.imgName.match(regex)[0].substr(1)};base64,${channel.imgData}`}/>
            <BiTrash className={"text-4xl cursor-pointer"} onClick={handleDelete} />
        </div>
    )
}
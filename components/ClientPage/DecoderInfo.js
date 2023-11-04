import {useRouter} from "next/router";
import ClientField from "../ClientField";
import {AiOutlineCode} from "@react-icons/all-files/ai/AiOutlineCode";
import {FaRegAddressCard} from "@react-icons/all-files/fa/FaRegAddressCard";
import {FiMail} from "@react-icons/all-files/fi/FiMail";
import {BiHomeAlt} from "@react-icons/all-files/bi/BiHomeAlt";
import {AiFillPhone} from "@react-icons/all-files/ai/AiFillPhone";
import {GiAerialSignal} from "@react-icons/all-files/gi/GiAerialSignal";
import {AiOutlineWifi} from "@react-icons/all-files/ai/AiOutlineWifi";
import {AiFillCloseCircle} from "@react-icons/all-files/ai/AiFillCloseCircle";
import {AiFillCheckCircle} from "@react-icons/all-files/ai/AiFillCheckCircle";
import {MdAlternateEmail} from "react-icons/md";
import {useSelector} from "react-redux";
import {BsActivity} from "react-icons/bs";

export default function DecoderInfo() {
    const router = useRouter()

    const ministraClient = useSelector(state => state.clientsReducer.currentClientMinistra)

    return (
        <section className={"bg-white w-full p-4 rounded-xl col-span-2"}>
            <h2 className={"text-primary-text font-semibold text-3xl"}>Информация о приставке</h2>
            <div className={"grid grid-cols-2 gap-8 mt-8"}>
                <div>
                    <div className="basis-1/2">
                        <h3 className="text-gray-500 text-xl font-medium flex items-center">
                            <GiAerialSignal className='mr-2 text-gray-400'/>
                            Mac Address :
                        </h3>
                        <h3 className="text-2xl text-gray-400 font=[Roboto] font-medium">{ministraClient?.stb_mac ? ministraClient.stb_mac : 'Не установлен'}</h3>
                    </div>
                </div>

                <div>
                    <ClientField value={ministraClient?.ip ? ministraClient?.ip : "Неизвестно"} title={'IP:'}/>
                </div>
                <div>
                    <ClientField value={ministraClient?.last_active ? ministraClient?.last_active : "Неизвестно"} title={
                        <div className="flex items-center">
                            <BsActivity className={'mr-2 text-gray-500'}/>
                            Последняя активность:
                        </div>
                    }/>
                </div>
                <div className="basis-1/2">
                    <h3 className="text-gray-500 text-xl font-medium flex items-center">
                        <AiOutlineWifi className={'mr-2 text-gray-500'}/>
                        Status
                    </h3>
                    <h3 className="text-2xl text-gray-400 font=[Roboto] font-medium">{ministraClient?.online === '0' ?
                        <div className='flex items-center'>
                            <AiFillCloseCircle className='text-xl inline text-red-600 mr-2'/>
                            <p>Offline</p>
                        </div>
                        :
                        <div className='flex items-center'>
                            <AiFillCheckCircle className='text-xl inline text-green-500 mr-2'/>
                            <p>Online</p>
                        </div>}</h3>
                </div>
            </div>
        </section>
    )
}
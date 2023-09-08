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
import SubmitButton from "../SubmitButton";

export default function MobileSubInfo() {
    const router = useRouter()

    const currentClient = useSelector(state => state.clientsReducer.currentClient)

    return (
        <section className={"bg-white w-full p-4 rounded-xl h-full col-span-3"}>
            <h2 className={"text-primary-text font-semibold text-3xl"}>Информация о мобильной подписке</h2>
            <div className={"grid grid-cols-2 gap-8 mt-8"}>
                <div className="basis-1/2">
                    <h3 className="text-gray-500 text-xl font-medium flex items-center">

                        <AiOutlineWifi className={'mr-2'}/>
                        Статус подписки
                    </h3>
                    <h3 className="text-2xl text-gray-400 font=[Roboto] font-medium">{currentClient.mobileSubExists ?
                        <div className='flex items-center'>
                            <AiFillCheckCircle className='text-xl inline text-green-500 mr-2'/>
                            <p>Подписан</p>
                        </div>
                        :
                        <div className='flex items-center'>
                            <AiFillCloseCircle className='text-xl inline text-red-600 mr-2'/>
                            <p>Не подписан</p>
                        </div>}
                    </h3>
                </div>
                <ClientField title={'Есть подписка?'}
                             value={currentClient.mobileSubLevel === 1 ? 'Есть' : currentClient.mobileSubLevel === 0 ? 'Нету' : 'Нету'}/>
                <ClientField title={'Order ID'} value={currentClient.mobileSubOrderId ? currentClient.mobileSubOrderId : "Нету"}/>
                <ClientField title={'Дата подписки Mobile Maximum'} value={currentClient.ministraDate ? currentClient.ministraDate : "Нету" }/>
                {currentClient.mobileSubLevel === 1 ?
                    <SubmitButton callback={() => {
                        handleCancelSub(currentClient._id)
                    }}/>
                    : ""}
            </div>
        </section>
    )
}
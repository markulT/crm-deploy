import {useRouter} from "next/router";
import ClientField from "../ClientField";
import {AiOutlineCode} from "@react-icons/all-files/ai/AiOutlineCode";
import {FaRegAddressCard} from "@react-icons/all-files/fa/FaRegAddressCard";
import {FiMail} from "@react-icons/all-files/fi/FiMail";
import {BiHomeAlt} from "@react-icons/all-files/bi/BiHomeAlt";
import {AiFillPhone} from "@react-icons/all-files/ai/AiFillPhone";
import {AiOutlineShoppingCart} from "@react-icons/all-files/ai/AiOutlineShoppingCart";
import {RiFundsFill} from "@react-icons/all-files/ri/RiFundsFill";
import SubmitButton from "../SubmitButton";
import {useDispatch, useSelector} from "react-redux";
import {cancelMinistraSub, cancelsub, getUser} from "../../storage/clientsReducer/clientsReducer";

export default function SubscriptionInfo({refresh}) {
    const router = useRouter()
    const currentClient = useSelector(state => state.clientsReducer.currentClient)
    const ministraClient = useSelector(state => state.clientsReducer.currentClientMinistra)

    const dispatch = useDispatch()

    const handleCancelSub = (id) => {
        dispatch(cancelsub(id))
        dispatch(getUser(id))
    }
    const handleMinistraSub = async (id) => {
        await dispatch(cancelMinistraSub(id))
        refresh()
    }

    return (
        <section className={"bg-white w-full p-4 rounded-xl col-span-2"}>
            <h2 className={"text-primary-text font-semibold text-3xl"}>Информация о подписке</h2>
            <div className={"grid grid-cols-2 gap-8 mt-8"}>
                <div>
                    <ClientField value={currentClient?.orderId ? currentClient.orderId : "Нету"} title={
                        <div className="flex items-center">
                            <AiOutlineShoppingCart className='mr-2 text-gray-500'></AiOutlineShoppingCart>
                            Order ID:
                        </div>
                    }/>
                </div>
                <div>
                    <ClientField value={currentClient.subLevel === 0 ? "Неактивна" :
                        currentClient.subLevel === 1 ? "Минимум" :
                            currentClient.subLevel == 2 ? "Стандарт" :
                                currentClient.subLevel == 3 ? "Премиум" : "Неактивна"
                    } title={
                        <div className="flex items-center">
                            <RiFundsFill className='mr-2 text-gray-500'></RiFundsFill>
                            Тарифный план:
                        </div>
                    }/>
                    {/*<button onClick={() => console.log(currentClient)}>log</button>*/}
                    {/*<button onClick={() => console.log(ministraClient)}>log2</button>*/}
                </div>

                <div className={"col-span-2"}>
                    <ClientField
                        value={currentClient.ministraDate ? currentClient.ministraDate : "Нету" }
                        title={
                            <div className="flex items-center">
                                <RiFundsFill className='mr-2 text-gray-500'></RiFundsFill>
                                Дата покупки:
                            </div>
                        }/>
                </div>
                {currentClient.subLevel == 1 || currentClient.subLevel == 2 || currentClient.subLevel == 3 ?
                    <SubmitButton callback={() => {
                        handleMinistraSub(currentClient._id)
                    }}/>
                    : ""}
            </div>
        </section>
    )
}
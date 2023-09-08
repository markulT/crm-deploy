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
import {useSelector} from "react-redux";

export default function SubscriptionInfo() {
    const router = useRouter()
    const currentClient = useSelector(state => state.clientsReducer.currentClient)
    const ministraClient = useSelector(state => state.clientsReducer.currentClientMinistra)

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
                    <ClientField
                        value={ministraClient?.tariff_plan === "1" ? "Стандарт/Минимум" : ministraClient?.tariff_plan === "2" ? "Премиум" : ministraClient?.tariff_plan === "0" ? "Нету" : "Нету"}
                        title={
                            <div className="flex items-center">
                                <RiFundsFill className='mr-2 text-gray-500'></RiFundsFill>
                                Тарифный план:
                            </div>
                        }/>
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
                {ministraClient?.tariff_plan === "1" || ministraClient?.tariff_plan === "2" ?
                    <SubmitButton callback={() => {
                        handleMinistraSub(currentClient._id)
                    }}/>
                    : ""}
            </div>
        </section>
    )
}
import {useRouter} from "next/router";
import ClientField from "../ClientField";
import {AiOutlineCode} from "@react-icons/all-files/ai/AiOutlineCode";
import {FaRegAddressCard} from "@react-icons/all-files/fa/FaRegAddressCard";
import {FiMail} from "@react-icons/all-files/fi/FiMail";
import {BiHomeAlt} from "@react-icons/all-files/bi/BiHomeAlt";
import {AiFillPhone} from "@react-icons/all-files/ai/AiFillPhone";
import {MdAlternateEmail, MdOutlineDateRange} from "react-icons/md";
import {useSelector} from "react-redux";

export default function ClientInfo() {
    const router = useRouter()
    const currentClient = useSelector(state => state.clientsReducer.currentClient)
    return (
        <section className={"bg-white w-full p-4 rounded-xl md:col-span-3"}>
            <h2 className={"text-primary-text font-semibold text-3xl"}>Информация о клиенте</h2>
            <div className={"grid md:grid-cols-2 grid-cols-1 gap-8 mt-8"}>
                <div>
                    <ClientField value={currentClient?.acqId ? currentClient?.acqId : "Нету"} title={
                        <div className="flex items-center">
                            <AiOutlineCode className='mr-2 text-gray-500'></AiOutlineCode>
                            ID покупателя:
                        </div>
                    }/>
                </div>
                <div>
                    <ClientField className="text-gray-200" value={currentClient?.fullName} title={
                        <div className="flex items-center">
                            <FaRegAddressCard className='mr-2 text-gray-500'/>
                            Full Name:
                        </div>
                    }/>
                </div>
                <div>
                    <div className="basis-1/2">
                        <h3 className="text-gray-500 text-xl font-medium flex items-center">
                            <FiMail className={'mr-2'}/>
                            Email</h3>
                        <h3 className="text-2xl text-gray-400 font-medium truncate">{currentClient?.email}</h3>
                    </div>
                </div>
                <div>
                    <ClientField value={currentClient?.address} title={
                        <div className="flex items-center">
                            <BiHomeAlt className='mr-2 text-gray-500'></BiHomeAlt>
                            Адрес:
                        </div>
                    }/>
                </div>

                <div>
                    <ClientField value={currentClient?.phone} title={
                        <div className="flex items-center">
                            <AiFillPhone className={'mr-2 text-gray-500'}/>
                            Номер телефона:
                        </div>
                    }/>
                </div>

                <div>
                    <ClientField value={currentClient?.signDate} title={
                        <div className="flex items-center">
                            <MdOutlineDateRange className={'mr-2 text-gray-500'}/>
                            Дата регистрации:
                        </div>
                    }/>
                </div>

                <div>
                    <ClientField value={currentClient?.isActivated ? "Подтвержденная" : "Не подтвержденная"} title={
                        <div className="flex items-center">
                            <MdAlternateEmail className={'mr-2 text-gray-500'}/>
                           Електронная почта:
                        </div>
                    }/>
                </div>
            </div>
        </section>
    )
}
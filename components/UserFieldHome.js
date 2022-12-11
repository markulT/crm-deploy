import {FaCheck} from "@react-icons/all-files/fa/FaCheck";
import {ImCross} from "@react-icons/all-files/im/ImCross";
import {BiTrash} from "@react-icons/all-files/bi/BiTrash";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {deleteClient, getUsers} from "../storage/clientsReducer/clientsReducer";
import {useRouter} from "next/router";

export default function UserField2 ({client}) {
    const [submitActive, setSubmitActive] = useState(false)

    const dispatch = useDispatch()
    const router = useRouter()
    const deleteUser = async (id) => {
        await dispatch(deleteClient(id))
        dispatch(getUsers())
    }

    return (
        <div className="">
        <div className="">
        <div className="bg-gray-700 relative rounded-xl mt-4 cursor-pointer">
            <div className="grid gap-0 grid-cols-3 grid-rows-1 p-3 rounded-xl items-center" onClick={() => {
                router.push(`/clientPage/${client._id}`)
            }}>
                <div>
                <h3 className="text-lg text-gray-300">Полное имя:</h3> 
                <h3 className="text-xl">{client.fullName}</h3>
            </div>
            <div>
                 <h3 className="text-lg text-gray-300">Логин:</h3>
                 <h3 className="text-xl text-gray-200">{client.login}</h3>
            </div>
           {/* <div>
            <h3 className="text-lg text-gray-300">Айди клиента:</h3>
            <h3 className="text-xl">{client._id}</h3>
           </div>
            <div>
                 <h3 className="text-lg text-gray-300">Ацк айди:</h3>
                  <h3 className="text-xl">{client.acqId}</h3>
            </div>
           <div>
             <h3 className="text-lg text-gray-300">Адрес:</h3>
             <h3 className="text-xl">{client.address}</h3>
           </div>
           <div>
             <h3 className="text-lg text-gray-300">Телефон:</h3>
             <h3 className="text-xl">{client.phone}</h3>
           </div> */}
           
           <div className="">
           <h3 className="text-lg text-gray-300">Активация:</h3>
            <h3 className="text-xl flex">{client.isActivated ?  <h3 className="text-xl">{client.phone} <FaCheck className="text-green-500"/> </h3> :
                <h3 className="flex text-xl">Нету <ImCross className="text-red-600 mt-1 ml-2 text-xl"/></h3>}</h3>
           </div>
            </div>
            {/* <h3 className="text-xl">
                {submitActive ?
                    <div className={'flex justify-center'}>
                        <h3 className={'cursor-pointer mb-3 bg-green-500 hover:bg-green-600 p-2 px-3 rounded-xl transition-all duration-300'} onClick={()=>{deleteUser(client._id)}} >Подтвердить</h3>
                        <h3 className={'px-5 p-2 ml-3 mb-3 cursor-pointer bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300 ease-in-out'} onClick={()=>{setSubmitActive(false)}}>Отменить</h3>
                    </div>
                    :
                <BiTrash className="absolute right-2 bottom-2 text-red-600 hover:text-red-700 transition-all duration-300 text-3xl cursor-pointer" onClick={() => {setSubmitActive(true)}}/>}
            </h3> */}
        </div>
        </div>
        </div>
    )
}
import {FaCheck} from "@react-icons/all-files/fa/FaCheck";
import {ImCross} from "@react-icons/all-files/im/ImCross";
import {BiTrash} from "@react-icons/all-files/bi/BiTrash";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {deleteClient, getUsers} from "../storage/clientsReducer/clientsReducer";
import {useRouter} from "next/router";

export default function UserField ({client}) {
    const [submitActive, setSubmitActive] = useState(false)

    const dispatch = useDispatch()
    const router = useRouter()
    const deleteUser = async (id) => {
        await dispatch(deleteClient(id))
        dispatch(getUsers())
    }

    return (
        <div className="bg-content-sec justify-between flex p-1 rounded items-center mt-4">
            <h3 className="text-xl cursor-pointer" onClick={() => {
                router.push(`/clientPage/${client._id}`)
            }}>
                {client.login}
            </h3>
            <h3 className="text-xl">{client.fullName}</h3>
            <h3 className="text-xl">{client.acqId}</h3>
            <h3 className="text-xl">{client.address}</h3>
            <h3 className="text-xl">{client.phone}</h3>
            <h3 className="text-xl">{client._id}</h3>
            <h3 className="text-xl">{client.isActivated ? <FaCheck className="text-green-500"/> :
                <ImCross className="text-red-600"/>}</h3>
            <h3 className="text-xl mr-8">
                {submitActive ?
                    <div className={'flex items-center'}>
                        <h3 className={'cursor-pointer bg-green-500 p-2 rounded-2xl'} onClick={()=>{deleteUser(client._id)}} >Подтвердить</h3>
                        <h3 className={'ml-2 p-2 cursor-pointer bg-red-600 rounded-2xl'} onClick={()=>{setSubmitActive(false)}}>Отменить</h3>
                    </div>
                    :
                <BiTrash className="text-red-700 text-3xl cursor-pointer" onClick={() => {setSubmitActive(true)}}/>}
            </h3>
        </div>
    )
}
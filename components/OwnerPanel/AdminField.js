import {FaCheck} from "@react-icons/all-files/fa/FaCheck";
import {ImCross} from "@react-icons/all-files/im/ImCross";
import {BiTrash} from "@react-icons/all-files/bi/BiTrash";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {deleteClient, getPage, getUsers} from "../../storage/clientsReducer/clientsReducer";
import {useRouter} from "next/router";
import {RxCheckCircled, RxCrossCircled} from "react-icons/rx";
import {deleteAdmin, getAdmins} from "../../storage/adminReducer/adminReducer";

export default function AdminField({admin: admin}) {
    const [submitActive, setSubmitActive] = useState(false)

    const dispatch = useDispatch()
    const router = useRouter()
    const handleGeleteAdmin = async (id) => {
        await dispatch(deleteAdmin(id))
        dispatch(getAdmins())
    }

    return (

        <div className={"relative my-4"}>
            <div className="grid grid-cols-3 text-primary-text">
                <p className={"cursor-pointer truncate"}
                   onClick={''}>{admin.email || admin.login}</p>
                <p className={"cursor-pointer truncate"}
                   onClick={''}>{admin.fullName ?? ""}</p>
                <p className={"cursor-pointer truncate"}
                   onClick={''}>{admin.role ?? ""}</p>

                {submitActive ?
                    <div className={'flex col-span-5 self-end justify-end gap-8 py-4'}>
                        <h3 className={'text-center cursor-pointer text-primary-text'}
                            onClick={() => {
                                handleGeleteAdmin(admin._id)
                            }}>Подтвердить</h3>
                        <h3 className={'text-primary-text cursor-pointer'}
                            onClick={() => {
                                setSubmitActive(false)
                            }}>Отменить</h3>
                    </div>
                    :
                    <BiTrash className="absolute right-3 bottom-3 text-primary-text text-2xl cursor-pointer"
                             onClick={() => {
                                 setSubmitActive(true)
                             }}/>}
            </div>
            <hr className={"text-outline my-2"}/>

        </div>


    )
}

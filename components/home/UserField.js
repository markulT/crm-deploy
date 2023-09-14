import {FaCheck} from "@react-icons/all-files/fa/FaCheck";
import {ImCross} from "@react-icons/all-files/im/ImCross";
import {BiTrash} from "@react-icons/all-files/bi/BiTrash";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {deleteClient, getPage, getUsers} from "../../storage/clientsReducer/clientsReducer";
import {useRouter} from "next/router";
import {RxCheckCircled, RxCrossCircled} from "react-icons/rx";

export default function UserField({client}) {
    const [submitActive, setSubmitActive] = useState(false)

    const dispatch = useDispatch()
    const router = useRouter()
    const {pageId} = router.query;
    const deleteUser = async (id) => {
        await dispatch(deleteClient(id))
        dispatch(getPage(12, pageId))
    }

    return (
        // <div className="">
        //     <div className="">
        //         <div className="bg-gray-800 relative rounded-xl mt-4">
        //             <div className="grid gap-0 grid-cols-3 grid-rows-1 p-3 rounded-xl items-center ">
        //                 <div>
        //                     <h3 className="text-lg text-gray-300">Полное имя:</h3>
        //                     <h3  className="cursor-pointer text-xl"
        //                          onClick={() => {router.push(`/clientPage/${client._id}`)}}
        //                     >
        //                     {client.fullName}
        //                     </h3>
        //                 </div>
        //                 <div>
        //                     <h3 className="text-lg text-gray-300">Email:</h3>
        //                     <h3  className="cursor-pointer text-xl"
        //                          onClick={() => {router.push(`/clientPage/${client._id}`)}}
        //                     >
        //                         {client.email}
        //                     </h3>
        //                 </div>
        //                 {/* <div>
        //     <h3 className="text-lg text-gray-300">Айди клиента:</h3>
        //     <h3 className="text-xl">{client._id}</h3>
        //    </div>
        //     <div>
        //          <h3 className="text-lg text-gray-300">Ацк айди:</h3>
        //           <h3 className="text-xl">{client.acqId}</h3>
        //     </div>
        //    <div>
        //      <h3 className="text-lg text-gray-300">Адрес:</h3>
        //      <h3 className="text-xl">{client.address}</h3>
        //    </div>
        //    <div>
        //      <h3 className="text-lg text-gray-300">Телефон:</h3>
        //      <h3 className="text-xl">{client.phone}</h3>
        //    </div> */}
        //
        //                 {/*<div className="">*/}
        //                 {/*    <h3 className="text-lg text-gray-300">Активация:</h3>*/}
        //                 {/*    <h3 className="text-xl flex">{client.isActivated ?*/}
        //                 {/*        <h3 className="text-xl">{client.phone} <FaCheck className="text-green-500"/></h3> :*/}
        //                 {/*        <h3 className="flex text-xl">Нету <ImCross className="text-red-600 mt-1 ml-2 text-xl"/>*/}
        //                 {/*        </h3>}</h3>*/}
        //                 {/*</div>*/}
        //             </div>
        //             <h3 className="text-xl ">
        //                 {submitActive ?
        //                     <div className={'flex justify-center pb-4'}>
        //                         <h3 className={'z-20 mx-2 px-16 p-2 py-3 text-center cursor-pointer text-white bg-greenButton rounded-2xl'}
        //                             onClick={() => {
        //                                 deleteUser(client._id)
        //                             }}>Подтвердить</h3>
        //                         <h3 className={'z-20 mx-2 px-16 p-2 py-3 text-center cursor-pointer text-white bg-redButton rounded-2xl'}
        //                             onClick={() => {
        //                                 setSubmitActive(false)
        //                             }}>Отменить</h3>
        //                     </div>
        //                     :
        //                     <BiTrash className="absolute right-3 bottom-3 text-redButton text-3xl cursor-pointer"
        //                              onClick={() => {
        //                                  setSubmitActive(true)
        //                              }}/>}
        //             </h3>
        //         </div>
        //     </div>
        // </div>

        <div className={"relative my-4"}>
            <div className="grid grid-cols-5 text-primary-text">
                <p className={"cursor-pointer truncate"}
                   onClick={() => router.push(`/clientPage/${client._id}`)}>{client.email}</p>
                <p className={"cursor-pointer truncate"}
                   onClick={() => router.push(`/clientPage/${client._id}`)}>{client.fullName}</p>
                <p className={"cursor-pointer truncate"}
                   onClick={() => router.push(`/clientPage/${client._id}`)}>{client.phone}</p>
                {client.isActivated ?
                    <div className={"flex items-center gap-2"}>
                        <p className={"cursor-pointer"} onClick={() => router.push(`/clientPage/${client._id}`)}>Да</p>
                        <RxCheckCircled className={"text-success"}/>
                    </div>
                    :
                    <div className={"flex items-center gap-2"}>
                        <p className={"cursor-pointer"} onClick={() => router.push(`/clientPage/${client._id}`)}>Нет</p>
                        <RxCrossCircled className={"text-error"}/>
                    </div>
                }
                <p className={"cursor-pointer"}
                   onClick={() => router.push(`/clientPage/${client._id}`)}>{client.subLevel == 0 ? "Неактивна" :
                    client.subLevel == 1 ? "Минимум" :
                        client.subLevel == 2 ? "Стандарт" :
                            client.subLevel == 3 ? "Премиум" : "Неактивна"
                }</p>

                {/*<button onClick={() => console.log(client) }>log*/}
                {/*</button>*/}
                {submitActive ?
                    <div className={'flex col-span-5 self-end justify-end gap-8 py-4'}>
                        <h3 className={'text-center cursor-pointer text-primary-text'}
                            onClick={() => {
                                deleteUser(client._id)
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

import {useState} from "react";
import {cancelsub, getUser} from "../storage/clientsReducer/clientsReducer";
import {useDispatch} from "react-redux";

export default function SubmitButton({callback}) {
    const dispatch = useDispatch()
    const [areYouSure, setAreYouSure] = useState(false)
    return (
        <>
            <button onClick={() => {
                setAreYouSure(!areYouSure)
                // handleCancelSub(currentClient._id)
            }} className={'bg-red-600 hover:bg-red-700 rounded-3xl p-4 ml-10 mt-5 mb-5'}>Отменить подписку
            </button>
            {/* <button onClick={() => {
                    console.log(currentClient)
                }}>Get client
                </button> */}
            <button onClick={() => {
                callback()
                setAreYouSure(!areYouSure)
            }}
                    className={`${areYouSure ? "visible bg-red-600 hover:bg-red-700 rounded-2xl p-4 ml-5  px-7" : "hidden"}`}>Да
            </button>
            <button onClick={() => {
                setAreYouSure(!areYouSure)
            }}
                    className={`${areYouSure ? "visible bg-green-600 hover:bg-green-700 rounded-2xl p-4 ml-5 px-6" : "hidden"}`}>Нет
            </button>
        </>
    )
}
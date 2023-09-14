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
            }} className={'bg-button font-primary text-white rounded-3xl p-4'}>Отменить подписку
            </button>
            {/* <button onClick={() => {
                    console.log(currentClient)
                }}>Get client
                </button> */}
            <div className={"flex w-full items-center gap-8"}>
                <button onClick={() => {
                    callback()
                    setAreYouSure(!areYouSure)
                }}
                        className={`${areYouSure ? "visible" : "hidden"}`}>Да
                </button>
                <button onClick={() => {
                    setAreYouSure(!areYouSure)
                }}
                        className={`${areYouSure ? "visible" : "hidden"}`}>Нет
                </button>
            </div>
        </>
    )
}
import {useState} from "react";
import {cancelsub, getUser} from "../storage/clientsReducer/clientsReducer";
import {useDispatch} from "react-redux";

export default function SubmitButton({callback, text, disabled, confirmation}) {
    const dispatch = useDispatch()
    const [areYouSure, setAreYouSure] = useState(false)
    return (
        <>
            <button disabled={disabled} onClick={() => {
                confirmation ? setAreYouSure(!areYouSure) : callback()
                // handleCancelSub(currentClient._id)
            }} className={`bg-button ${disabled ? "opacity-50 cursor-not-allowed" : "opacity-100"} font-primary text-white rounded-3xl p-4 bg-button hover:bg-button-dark transition-all duration-300 ease-in`}>{text}
            </button>
            {confirmation ? <div className={"flex w-full items-center gap-8"}>
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
            </div> : <></>}
        </>
    )
}
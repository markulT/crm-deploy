
import {BiErrorCircle} from 'react-icons/bi';
import {useRouter} from "next/router";
import React, {useState} from "react";
import SubmitButton from "../SubmitButton";
import {useDispatch} from "react-redux";
import {createTestSub} from "../../storage/clientsReducer/clientsReducer";


const PopUpCreateTestSub = ({id, visible, setVisible, refresh}) => {
    const [date, setDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();

    const handleDateChange = (e) => {
        const enteredDate = e.target.value;
        setDate(enteredDate);

        // Parse the entered date to check if it's a valid date
        const parsedDate = new Date(enteredDate);

        if (isNaN(parsedDate.getTime())) {
            // Display an error message if the date is not valid
            setErrorMessage("Invalid date");
        } else {
            // Clear the error message if the date is valid
            setErrorMessage("");
        }
    };

    const handleTestSubCreating = async () => {
        console.log(date)
        await dispatch(createTestSub(id, date));
        await refresh()
        setVisible(false)
    }

    return (
        <div
            className={`popup fixed min-w-screen left-0 right-0 top-0 backdrop-blur-sm z-[999999] items-center justify-center min-h-full ${visible ? "flex" : "hidden"}`}
            onClick={(e) => {
                //@ts-ignore
                if (e.target.closest('div.popup') === e.target) {
                    setVisible(false)
                }
            }}
        >
            <div
                className="bg-white text-blue-5 self-center drop-shadow-2xl absolute z-50 md:max-w-screen-2xl max-w-screen-3xs flex flex-col p-4 md:p-6 rounded-xl">
                <h3 className="self-center text-center text-primary-text  primary-text text-xl md:text-3xl font-bold mb-2 max-w-2xs">Дата окончания тестовой подписки</h3>

                <input className="p-4 bg-outline w-full border-0 text-primary-text text-2xl font-bold rounded-2xl text-center mb-4  "  type="date" max="2107-12-31" placeholder="dd-mm-yyyy" value={date} onChange={handleDateChange} />

                {errorMessage && (
                    <p className="text-error text-sm font-semibold">{errorMessage}</p>
                )}

                <SubmitButton disabled={errorMessage || !date} confirmation={false} callback={handleTestSubCreating} text="Подтвердить" />

            </div>

        </div>
    );
};

export default PopUpCreateTestSub;

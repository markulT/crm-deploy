import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getPage, getPageBy} from "../../storage/clientsReducer/clientsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RxCross2} from "react-icons/rx";
import {getDealers} from "../../storage/adminReducer/adminReducer";


export default function Filter({trigger, setTrigger, filters, setFilters}) {

    const [checkBoxes, setCheckBoxes] = useState({
        isActivated: {
            id: 0,
            value: "&isActivated=true",
            label: "Только подтвержденные емейли",
            isChecked: false,
            type: "isActivated"
        },
        registered3Months: {
            id: 1,
            value: "&registered=3",
            label: "Зарегестрированы более 3-х месяцев",
            isChecked: false,
            type: "registered"
        },
        registered6Months: {
            id: 2,
            value: "&registered=6",
            label: "Зарегестрированы более 6-ти месяцев",
            isChecked: false,
            type: "registered"
        },
        registered12Months: {
            id: 3,
            value: "&registered=12",
            label: "Зарегестрированы более года",
            isChecked: false,
            type: "registered"
        },
        registered24Months: {
            id: 4,
            value: "&registered=24",
            label: "Зарегестрированы более 2 лет",
            isChecked: false,
            type: "registered"
        },
        subscription0: {id: 5, value: "&subscription=0", label: "Без подписки", isChecked: false, type: "subscription"},
        subscription1: {
            id: 6,
            value: "&subscription=1",
            label: "Подписка минимум",
            isChecked: false,
            type: "subscription"
        },
        subscription2: {
            id: 7,
            value: "&subscription=2",
            label: "Подписка стандарт",
            isChecked: false,
            type: "subscription"
        },
        subscription3: {
            id: 8,
            value: "&subscription=3",
            label: "Подписка премиум",
            isChecked: false,
            type: "subscription"
        },
        subscription4: {
            id: 9,
            value: "&subscription=4",
            label: "Тестовый период",
            isChecked: false,
            type: "subscription"
        },
        // Add more keys and their associated arrays of values as needed
    });
    const admin = useSelector(state => state.authReducer)
    const handleGetDealers = async () => {
        const dealers = await dispatch(getDealers());

        const newCheckBoxes = { ...checkBoxes }; // Create a copy of the current state

        for (let i = 0; i < dealers.length; i++) {
            const dealer = {
                id: dealers[i]._id,
                value: `&dealer=${dealers[i].email}`,
                label: dealers[i].email,
                isChecked: false,
                type: "dealer"
            };

            // Push the 'dealer' object into the 'newCheckBoxes' state
            newCheckBoxes[`dealer${i}`] = dealer;
        }

        // Update the state with the new 'newCheckBoxes' object
        setCheckBoxes(newCheckBoxes);
    }



    useEffect(() => {

        if (trigger) {
            setVisible(true)
        } else {
            setVisible(false)
        }

    }, [trigger])

    useEffect(() => {
       if (admin.role === "Admin" || admin.role === "Operator") {
           handleGetDealers();
       }

    }, [])


    // Function to handle the checkbox change
    const handleCheckboxChange = (key) => {
        const updatedCheckBoxes = {...checkBoxes};
        updatedCheckBoxes[key].isChecked = !updatedCheckBoxes[key].isChecked;
        setCheckBoxes(updatedCheckBoxes);

        let updatedFilters = "";

        Object.keys(updatedCheckBoxes).forEach((checkBoxKey) => {
            if (updatedCheckBoxes[checkBoxKey].isChecked) {
                updatedFilters += checkBoxes[checkBoxKey].value;
            }
        });

        setFilters(updatedFilters); // Update the filters state with the concatenated value
    };


    const [visible, setVisible] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    return (
        <>
            {
                visible ?
                    <section
                        className={`absolute right-0 h-screen bg-white shadow w-1/2 lg:w-1/4 p-4 rounded-xl text-primary-text z-[99] transform transition-transform duration-500 ${visible ? 'translate-x-0' : 'translate-x-full'}`}
                    >
                        <div className={"flex justify-between items-center"}>
                            <h1 className={"text-4xl font-bold text-primary-text"}>
                                Фильтр
                            </h1>
                            <RxCross2 className={"text-3xl font-bold cursor-pointer"}
                                      onClick={() => setTrigger(false)}/>
                        </div>

                        {Object.keys(checkBoxes).map((key) => (
                            <div key={key} className={"flex gap-4 items-center my-4"}>
                                <span className="text-primary-text">{checkBoxes[key].label}</span>
                                <input
                                    disabled={Object.values(checkBoxes).some(
                                        (checkbox) => checkbox.type === checkBoxes[key].type && checkbox.isChecked && checkbox !== checkBoxes[key]
                                    )}
                                    type="checkbox"
                                    className="checkbox checkbox-primary bg-outline shadow"
                                    checked={checkBoxes[key].isChecked}
                                    onChange={() => handleCheckboxChange(key)}
                                />
                            </div>
                        ))}
                    </section>
                    : ''
            }
        </>

    )

}

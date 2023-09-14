import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {createClient, getAllActivatedEmails, sendMails} from "../../storage/clientsReducer/clientsReducer";
import {RxCross1} from "react-icons/rx";


export default function Mails() {

    const [emails, setEmails] = useState('');
    const [emailArray, setEmailArray] = useState([]);
    const [title, setTitle] = useState('')
    const [paragraph, setParagraph] = useState('')
    const [toAllEmails, setToAllEmails] = useState(false)

    const dispatch = useDispatch()

    const submitSending = async () => {
        await dispatch(sendMails({emailArray, title, paragraph}))
        clearForm()
    }

    const setAllActivatedEmails = async () => {
        const response = await dispatch(getAllActivatedEmails());
        const users = response.data.users;

        // Extract email addresses from the users array
        const emailAddresses = users.map((user) => user.email);

        // Update the emailArray state with the array of email addresses
        const updatedEmailsString = emailAddresses.join(" ");
        setEmails(updatedEmailsString);
        setEmailArray(emailAddresses);
    }


    const onCheckInput = () => {
        const updatedToAllEmails = !toAllEmails
        setToAllEmails(updatedToAllEmails);
        console.log(toAllEmails)
    };

    useEffect(() => {

        if (toAllEmails) {
            setAllActivatedEmails()
        } else {
            setEmails('')
            setEmailArray([])
        }

    }, [toAllEmails])


    const clearForm = () => {
        setEmails('');
        setEmailArray([]);
        setTitle('');
        setParagraph('');
    };


    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setEmails(inputValue); // Update the input field value

        // Split the input value into an array using space, comma, or semicolon as separators
        const parsedEmails = inputValue.split(/[\s,;]+/);

        // Remove any empty strings from the parsedEmails array
        const filteredEmails = parsedEmails.filter((email) => email.trim() !== '');

        setEmailArray(filteredEmails); // Update the email address array
    };

    const deleteEmail = (emailToDelete) => {
        const updatedEmailArray = emailArray.filter((email) => email !== emailToDelete);
        setEmailArray(updatedEmailArray);

        // Update the emailsString by joining the remaining emails with spaces
        const updatedEmailsString = updatedEmailArray.join(" ");
        setEmails(updatedEmailsString);
    };

    return (
        <div className="w-full h-full min-h-screen bg-outline text-primary-text font-primary flex flex-col px-8 py-8">
            <h1 className="text-primary-text font-bold text-4xl ">Емейлы</h1>
            <section className={"flex flex-col gap-8 mt-8"}>
                <div className={"flex flex-col w-full bg-white p-4 rounded-xl"}>
                    <h2 className="text-primary-text font-bold text-2xl ">Создание емейла</h2>
                    <div className="grid h-fit gap-4 grid-cols-2 grid-rows-4 mt-4">
                        <div className="flex flex-col">
                            <p className="ml-2 text-primary-text">Заголовок</p>
                            <input placeholder={"Введите заголовок емейла"} type="text" value={title} onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                                   className="w-full text-md pl-3 bg-outline border-0 rounded-xl transition-all duration-300"
                                   required/>
                        </div>
                        <div className="flex flex-col w-full row-span-4">
                            <p className="ml-2 text-primary-text">Emails</p>
                            <textarea
                                placeholder="Введите емейлы (через пробел)"
                                value={emails}
                                onChange={handleInputChange}
                                className="w-full h-full py-2 text-md pl-3 bg-outline border-0 rounded-xl transition-all duration-300"
                                required
                            />

                        </div>
                        <div className="flex flex-col w-full row-span-3">
                            <p className="ml-2 text-primary-text">Текст</p>
                            <textarea
                                placeholder="Введите текст емейла"
                                value={paragraph}
                                onChange={(e) => {
                                    setParagraph(e.target.value)
                                }}
                                className="w-full h-full py-2 text-md pl-3 bg-outline border-0 rounded-xl transition-all duration-300"
                                required
                            />
                            {/* Display the parsed email addresses */}
                        </div>
                    </div>
                    <div className={"flex gap-4 h-full justify-between items-center mt-4"}>
                        <div className={"flex w-1/2 gap-2 xl:gap-4"}>
                            <p className={"w-fit"}>Или выбрать всех пользователей с активированным эмейлом</p>
                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary bg-outline shadow text-"
                                checked={toAllEmails}
                                onChange={onCheckInput}
                            />
                        </div>
                        <button onClick={submitSending}
                                className="bg-button text-white mt-2 py-4 self-end w-1/2 rounded-xl ">Отправить
                        </button>
                    </div>
                </div>
                <div className={"w-full bg-white p-4 rounded-xl"}>
                    <h2 className="text-primary-text font-bold text-2xl ">Список емейлов для рассылки</h2>
                    <section className={"flex flex-wrap gap-4 mt-4"}>
                        {emailArray.map((email, index) => (
                            <div key={index} className="flex items-center p-2 bg-outline rounded-xl">
                                <a className={""}>{email}</a>
                                <RxCross1 className={"ml-2 cursor-pointer"} onClick={() => deleteEmail(email)}/>
                            </div>
                        ))}
                    </section>
                </div>
            </section>
            {/*<button onClick={()=> console.log(emails)}>log*/}
            {/*</button>*/}
            {/*<button onClick={()=> console.log(emailArray)}>log*/}
            {/*</button>*/}
        </div>
    )
}

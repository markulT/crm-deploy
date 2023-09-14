import {useState} from "react";
import {createClient, getPage} from "../../../storage/clientsReducer/clientsReducer";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";


export default function Add() {

    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const dispatch = useDispatch()
    const router = useRouter()

    const submitCreate = async () => {
        const client = await dispatch(createClient(password, fullName, email, phone, address))
        await router.push(`/clientPage/${client.user._id}`)
        clearForm()
    }
    const clearForm = () => {
        setEmail('');
        setPassword('');
        setPhone('');
        setFullName('');
        setAddress('');
    };

    return (
        <div className="w-full h-screen bg-outline text-primary-text font-primary flex flex-col px-8 py-8">
            <h1 className="text-primary-text font-bold text-4xl ">Добавить клиента</h1>
            <div className="bg-white p-4 xl:w-2/3 rounded-3xl justify-center items-center mt-8 ">
                <h2 className="text-primary-text font-bold text-2xl ">Создание емейла</h2>
                <form className="rounded-xl grid gap-4 gap-x-10 md:grid-cols-2 md:grid-rows-3 grid-rows-6  mt-4" onClick={(e) => {

                    e.preventDefault()
                }}>
                    <div className="flex flex-col w-full">
                        <p className="ml-2 text-secondary-text">Email</p>
                        <input placeholder={"Введите Email"}  type="email" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                               className="w-full text-md pl-3 bg-outline border-0 rounded-xl transition-all duration-300"
                               required/>
                    </div>
                    <div className="flex flex-col">
                        <p className="ml-2 text-secondary-text">Полное имя</p>
                        <input placeholder={"Введите полное имя"}  type="text" value={fullName} onChange={(e) => {
                            setFullName(e.target.value)
                        }}
                               className="w-full text-md pl-3 bg-outline border-0 rounded-xl transition-all duration-300"
                               required/>
                    </div>
                    <div className="flex flex-col">
                        <p className="ml-2 text-secondary-text">Пароль</p>
                        <input placeholder={"Введите пароль"}  type="password" value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                               className="w-full text-md pl-3 bg-outline border-0 rounded-xl transition-all duration-300"
                               required/>
                    </div>
                    <div className="flex flex-col">
                        <p className="ml-2 text-secondary-text">Телефон</p>
                        <input placeholder={"Введите телефон"}  type="tel" value={phone} onChange={(e) => {
                            setPhone(e.target.value)
                        }}
                               className="w-full text-md pl-3 bg-outline border-0 rounded-xl transition-all duration-300"
                               required/>
                    </div>
                    <div className="flex flex-col">
                        <p className="ml-2 text-secondary-text">Адрес</p>
                        <input placeholder={"Введите адрес"}  type="text" value={address} onChange={(e) => {
                            setAddress(e.target.value)
                        }}
                               className="w-full text-md pl-3 bg-outline border-0 rounded-xl transition-all duration-300"
                               required/>
                    </div>
                    <div className={"flex justify-center"}>
                        <button onClick={submitCreate}
                                className="bg-button text-white h-2/3 md:self-end self-center w-full rounded-xl">Отправить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

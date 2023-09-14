import {useState} from "react";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {loginThunk} from "../../storage/authReducer/authReducer";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { router } from "next/router";
 
 
export default function Login() {
 
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const [hidden, setHidden] = useState(true)
 
    // const submitLogin = () => {
    //     console.log(`${password} - ${login}`)
    //     dispatch(loginThunk(login, password))
    //     router.push('/')    }
        const submitLogin = async () => {
            console.log(`${password} - ${login}`)
            if (login == "" || password == '') {
                return
            }
            await dispatch(loginThunk(login, password))
            router.push('/')
        }
 
    return (
        <div className="w-full h-screen bg-outline text-primary-text font-primary flex">
            <div className="w-full h-screen flex items-center justify-center mx-auto">
                <div className="w-full flex items-center flex-col">
                <h1 className="text-2xl text-gray-200 sm:text-3xl text-center font-bold">Логин</h1>
                    <form className={"w-1/4"}>
                        <div className="group mt-20">
                            <input type="text" value={login} onChange={(e)=>{setLogin(e.target.value)}} className="text-md px-20 rounded-lg w-full pl-3 bg-primary-text text-white transition-all duration-500" required />
                            <label className="ml-2 text-disabled-text">Логин</label>
                        </div>
                        <div className="group">
                            <input type={`${hidden ? 'password' : 'text'}`} value={password} onChange={(e)=>{setPassword(e.target.value)}} className="text-md items-center px-20 rounded-lg w-full pl-3 bg-primary-text text-white transition-all duration-500" required />
                            <label className="ml-2 text-disabled-text">Пароль</label>
                        </div>
                    </form>
                    {/* <Link href="/auth/signup">
                        <a className="text-black font-medium text-2xl">У вас нет акаунта? Зарегистрируйтесь !</a>
                    </Link> */}
                    <button onClick={submitLogin} className="bg-button rounded-2xl p-3 px-12 text-lg font-medium text-white transition-all duration-300 w-1/4">Отправить</button>
                </div>
            </div>
        </div>
    )
}

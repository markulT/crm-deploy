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
        <div className="w-full h-screen bg-gradient-to-t from-gray-700 to-gray-600 flex-1">
            <div className="container h-screen flex items-center justify-center mx-auto">
                <div className="flex items-center flex-col">
                <h1 className="text-2xl text-gray-200 sm:text-3xl text-center font-bold mt-[-60px]">Логин</h1>
                    <form>

                        <div className="group mt-20">
                            <input type="text" value={login} onChange={(e)=>{setLogin(e.target.value)}} className="text-md px-20 rounded-lg border-8  focus:border-gray-300  focus:border-8 block w-full pl-3 bg-gray-800 border-gray-700  text-gray-300 autofill:bg-gray-800 transition-all duration-300" required />
                            <label className="ml-2 text-gray-400">Логин</label>
                        </div>
                        <div className="group">
                        <input type={`${hidden ? 'password' : 'text'}`} value={password} onChange={(e)=>{setPassword(e.target.value)}} className="text-md px-20 rounded-lg border-8 focus:border-gray-300  focus:border-8 block w-full pl-3 bg-gray-800 border-gray-700  text-gray-300 autofill:bg-gray-800 transition-all duration-300" required />
                        <label className="ml-2 text-gray-400">Пароль</label>
                        </div>


                    </form>
                    {/* <Link href="/auth/signup">
                        <a className="text-black font-medium text-2xl">У вас нет акаунта? Зарегистрируйтесь !</a>
                    </Link> */}
                    <button onClick={submitLogin} className="bg-gray-800 hover:bg-gray-900 rounded-2xl p-3 px-5 text-lg font-medium mt-5 text-gray-200 transition-all duration-300">Отправить</button>
                </div>
            </div>
        </div>
    )
}
import {useState} from "react";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {loginThunk} from "../../storage/authReducer/authReducer";


export default function Login() {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const submitLogin = () => {
        console.log(`${password} - ${login}`)
        dispatch(loginThunk(login, password))
    }

    return (
        <div className="w-full h-screen bg-content flex-1">
            <div className="container h-screen flex items-center justify-center mx-auto">
                <div className="flex items-center flex-col">
                    <form>

                        <div className="group">
                            <input type="text" value={login} onChange={(e)=>{setLogin(e.target.value)}} className="bg-transparent" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Логин</label>
                        </div>
                        <div className="group">
                            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="bg-transparent" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Пароль</label>
                        </div>


                    </form>
                    <Link href="/auth/signup">
                        <a className="text-black font-medium text-2xl">У вас нет акаунта? Зарегистрируйтесь !</a>
                    </Link>
                    <button onClick={submitLogin} className="bg-dead_violet mt-4 rounded-3xl p-3 text-lg font-medium">Отправить</button>
                </div>
            </div>
        </div>
    )
}
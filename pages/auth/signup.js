import Link from "next/link";
import {useState} from "react";


export default function SignUp() {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const registerSubmit = () => {

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
                            <input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="bg-transparent" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Пароль</label>
                        </div>
                    </form>
                    <Link href="/auth/login">
                        <a className="text-black font-medium text-2xl">Уже есть акаунт ? Логин</a>
                    </Link>
                    <button onClick={registerSubmit} className="bg-dead_violet rounded-3xl p-3 text-lg font-medium mt-4">Отправить</button>
                </div>
            </div>
        </div>
    )
}
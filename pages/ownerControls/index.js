import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {useEffect} from "react";
import AdminField from "../../components/OwnerPanel/AdminField";
import {getAdmins, registerAdmin} from "../../storage/adminReducer/adminReducer";


export default function OwnerControls() {

    const Roles = {
        ADMIN: 'Admin',
        DEALER: 'Dealer',
        OPERATOR: 'Operator',
        SYS_ADMIN: 'SysAdmin',
        // Add more roles as needed
    };

    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState(Roles.ADMIN);
    const admins = useSelector(state => state.adminReducer.admins);





    const dispatch = useDispatch()
    const router = useRouter()

    const submitCreate = async () => {
        const client = await dispatch(registerAdmin(password, fullName, email, role))
        await handleGetAdmins();
        clearForm()
    }
    const clearForm = () => {
        setEmail('');
        setPassword('');
        setFullName('');
        setRole('');
    };

    const handleGetAdmins = async () => {
        await dispatch(getAdmins());
    };


    useEffect(() => {
        // Fetch the list of admins when the component mounts
        handleGetAdmins()
        console.log("page admins")
        console.log(admins)
    }, []);

    return (
        <main className={"flex flex-col bg-outline text-primary-text w-full min-h-screen justify-start items-center font-primary px-8 py-8"}>
            <h1 className="text-primary-text font-bold text-4xl self-start">Админка</h1>
            <div className={"w-full h-fit grid grid-cols-2 gap-8"}>
                <section className="bg-white p-4 rounded-2xl justify-center items-center mt-8 ">
                    <h2 className="text-primary-text font-bold text-2xl ">Создание админа</h2>
                    <form className="rounded-xl grid gap-4 gap-x-10 md:grid-cols-2 md:grid-rows-3 grid-rows-6  mt-4" onClick={(e) => {

                        e.preventDefault()
                    }}>
                        <div className="flex flex-col w-full">
                            <p className="ml-2 text-secondary-text">Логин</p>
                            <input placeholder={"Введите логин"}  type="text" value={email} onChange={(e) => {
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
                            <p className="ml-2 text-secondary-text">Права</p>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full text-md px-3 py-3 bg-outline border-0 rounded-xl transition-all duration-300"
                                required
                            >
                                <option value={Roles.ADMIN}>Admin</option>
                                <option value={Roles.DEALER}>Dealer</option>
                                <option value={Roles.OPERATOR}>Operator</option>
                                <option value={Roles.SYS_ADMIN}>Sys admin</option>
                            </select>
                        </div>
                        <div className={"flex justify-center"}>
                            <button onClick={submitCreate}
                                    className="bg-button text-white h-2/3 md:self-end self-center w-full rounded-xl">Отправить
                            </button>
                        </div>
                    </form>
                </section>
                <section className={"bg-white rounded-xl w-full mt-8"}>
                    <div className="mt-4 flex flex-col mx-8 ">
                        <div className="grid grid-cols-3 text-primary-text font-bold mt-8 p-2 py-3 bg-outline rounded-xl">
                            <div className="">Логин</div>
                            <div className="">Полное имя</div>
                            <div className="">Роль</div>
                        </div>
                        <div className={"p-2"}>
                            {admins.length > 0 ? (
                                admins.map((admin) => (
                                    <AdminField className="bg-gray-800" admin={admin} key={admin._id} />
                                ))
                            ) : (
                                <p>No admins available.</p>
                            )}
                        </div>

                    </div>
                </section>
            </div>
        </main>
    )
}





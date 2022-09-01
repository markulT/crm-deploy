import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../storage/clientsReducer/clientsReducer";
import {useEffect, useState} from "react";
import {BiPlus} from "@react-icons/all-files/bi/BiPlus";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {InputAdornment, TextField} from "@mui/material";
import {BiSearch} from "@react-icons/all-files/bi/BiSearch";
import {useRouter} from "next/router";


export default function Clients() {
    const dispatch = useDispatch()
    const clients = useSelector(state=>state.clientsReducer)
    const router = useRouter()

    const [search, setSearch] = useState('')

    console.log(clients)

    useEffect(()=>{
        dispatch(getUsers())
    },[])

    return (
        <div className="w-full flex-1 h-screen bg-content">
            <div className="container mx-auto text-black">
                <div className="flex justify-between mt-4 lg:mt-8">
                <h2 className="text-4xl">Clients</h2>
                    <button className="bg-wild-orange flex items-center rounded-3xl p-4 font-medium text-white">
                        <FaPlus  className="text-xl font-bold mr-4"/>Add customer
                    </button>
                </div>
                <div className="flex w-full items-center mt-4 p-4 rounded-xl bg-content-sec">
                    <TextField id="outlined-basic" value={search} onChange={(e)=>setSearch(e.currentTarget.value)} label="Search" variant="outlined" InputProps={{
                        startAdornment: (
                            <InputAdornment position={"start"}>
                                <BiSearch />
                            </InputAdornment>
                        )
                    }} />
                </div>
                <div>{clients.users.map(client=>(<div key={client._id} onClick={()=>{router.push(`/clients/${client._id}`)}}>{client.login}</div>))}</div>
            </div>
        </div>
    )
}

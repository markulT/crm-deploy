import {TextField} from "@mui/material";

export default function ClientField({value, title}) {

    const [editActive, setEditActive] = useState(false)
    const [edit, setEdit] = useState('')

    return (
        <div className="basis-1/2 relative inline">
            <h3 className="text-gray-600 text-xl font-medium inline">{title}</h3>
            <h3 className="text-2xl text-black cursor-pointer font=[Roboto] font-medium" onClick={() => {
                console.log('edit')
                setEditActive(!editActive)
            }}>{value}</h3>
            <input type="text" value={edit} onChange={(e)=>{setEdit(e.currentTarget.value)} } className={`bg-transparent ${editActive === false ? `hidden` : 'visible'}`}/>
        </div>
    )
}

// <TextField label={'Label...'} value={edit} onChange={(e) => {
//     setEdit(e.currentTarget.value)
// }} id="outlined-basic" variant="outlined" className={`${editActive ? 'block' : 'hidden'}`}></TextField>
import {useState} from "react";

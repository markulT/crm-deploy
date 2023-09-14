import {TextField} from "@mui/material";

export default function ClientField({value, title}) {

    const [editActive, setEditActive] = useState(false)
    const [edit, setEdit] = useState('')

    return (
        <div className="basis-1/2 relative inline">
            <h3 className="text-gray-500 text-xl font-medium inline">{title}</h3>
            <h3 className="text-2xl text-gray-400  font=[Roboto] font-medium truncate">{value}</h3>
            {/* <div className="flex">
            <input type="text" value={edit} onChange={(e)=>{setEdit(e.currentTarget.value)} } className={`bg-transparent border-gray-500 border-b-4  focus:border-gray-400 ${editActive === false ? `hidden` : 'visible '}`}/>
            <button className={`bg-gray-600 hover:bg-gray-700 transition-all duration-300 ml-3 py-2 px-4 rounded-xl ${editActive === false ? `hidden` : 'visible '}`}>Готово</button>
            </div> */}
       
       {/* onClick={() => {
                console.log('edit')
                setEditActive(!editActive)
            }}
        */}
        </div>



    )
}

// <TextField label={'Label...'} value={edit} onChange={(e) => {
//     setEdit(e.currentTarget.value)
// }} id="outlined-basic" variant="outlined" className={`${editActive ? 'block' : 'hidden'}`}></TextField>
import {useState} from "react";

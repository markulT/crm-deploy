import Navbar from "./Navbar";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ExceptionPopup from "./ExceptionPopup";
import {useState} from "react";



export default function Layout({ children }) {

    const [open, setOpen] = useState(false)

    return (
        <div className="relative w-full flex font-[Roboto]">
            <Navbar open={open} setOpen={setOpen}></Navbar>
            <div className={`${open ? "pl-72" : "pl-20"} w-full transition-all duration-300`}>
                {children}
            </div>
        </div>
    )
}
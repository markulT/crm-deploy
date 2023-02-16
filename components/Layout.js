import Navbar from "./Navbar";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ExceptionPopup from "./ExceptionPopup";



export default function Layout({ children }) {

    return (
        <div className="flex font-[Roboto]">
            <Navbar></Navbar>
            {children}
        </div>
    )
}
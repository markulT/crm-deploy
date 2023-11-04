
import {BiErrorCircle} from 'react-icons/bi';
import {useRouter} from "next/router";
import React, {useState} from "react";


const PopUpCreateLink = ({ visible, setVisible, dealerCode, link }) => {
    const router = useRouter();

    const [isDealerCodeCopied, setIsDealerCodeCopied] = useState(false);
    const [isLinkCopied, setIsLinkCopied] = useState(false);

    const copyToClipboard = (text) => {
        // Create a text area element to copy text to the clipboard
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);

        // Select the text in the text area and copy it to the clipboard
        textArea.select();
        document.execCommand('copy');

        // Remove the temporary text area
        document.body.removeChild(textArea);

        // Set the copied message visibility to true
        text === dealerCode ?
        setIsDealerCodeCopied(true) : text === link ? setIsLinkCopied(true) : ""

        // After a brief delay, hide the copied message
        setTimeout(() => {
            text === dealerCode ?
                setIsDealerCodeCopied(false) : text === link ? setIsLinkCopied(false) : ""
        }, 1500);
    };


    return (
        <div
            className={`popup fixed min-w-screen left-0 right-0 top-0 backdrop-blur-sm z-[999999] items-center justify-center min-h-full ${visible ? "flex" : "hidden"}`}
            onClick={(e) => {
                //@ts-ignore
                if (e.target.closest('div.popup') === e.target) {
                    setVisible(false)
                }
            }}
        >
            <div
                className="bg-white text-blue-5 self-center drop-shadow-2xl absolute z-50 md:max-w-screen-2xl max-w-screen-3xs flex flex-col p-4 md:p-6 rounded-xl">
                <h3 className="self-center text-center text-primary-text  primary-text text-xl md:text-3xl font-bold mb-2 max-w-2xs">Ваш промокод</h3>
                <div className="p-4 cursor-pointer bg-outline text-primary-text text-3xl font-bold rounded-xl text-center" onClick={() => copyToClipboard(dealerCode)}>
                    {dealerCode}
                </div>
                {isDealerCodeCopied && <p className="text-primary-text text-md text-center mt-2 text-green-600">Текст скопирован!</p>}

                <p className="text-primary-text text-md text-center mt-4">или копировать ссылку</p>
                <div className="mt-4 cursor-pointer p-4 bg-outline text-secondary-text text-lg font-bold rounded-xl text-center" onClick={() => copyToClipboard(link)}>
                    {link}
                </div>
                {isLinkCopied && <p className="text-secondary-text text-md text-center mt-2 text-green-600">Текст скопирован!</p>}

            </div>
        </div>
    );
};

export default PopUpCreateLink;

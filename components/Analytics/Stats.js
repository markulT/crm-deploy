import {
    Chart as ChartJS,

    Tooltip,
    Legend, ArcElement
} from "chart.js"
import { Doughnut, } from "react-chartjs-2";
import {useEffect, useState} from "react";

ChartJS.register(ArcElement, Tooltip, Legend);


const Stats = ({title, count, gain }) => {

    return (
        <div className={"font-primary bg-white rounded-xl p-4 flex lg:flex-row flex-col justify-between"}>
            <div>
                <h1 className={"text-4xl font-bold text-primary-text"}>
                    {count}
                </h1>
                <h3 className={"text-xl font-medium text-primary-text"}>
                    {title}
                </h3>
            </div>
            <div className={"bg-success p-2 rounded-xl flex flex-col items-center"}>
                <p className={"text-white"}>+{gain}%</p>
                <p className={`text-white`}>за месяц</p>
            </div>
        </div>

    )
}

export default Stats
import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



const BarChart = ({labels, label, title, data, color }) => {

    const [chartData, setChartData] = useState({datasets: []})

    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        console.log(data)
        setChartData({
            labels,
            datasets: [
                {
                    label: 'Пользователей',
                    data: data,
                    backgroundColor: color === "orange" ? 'rgba(255, 135, 67, 1)' : 'rgba(72, 128, 255, 1)',
                },
            ],
        })
        setChartOptions({
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: label,
                },
            },
        })
    }, [data])

    return (
        <div className={"font-primary bg-white rounded-xl h-full w-full flex flex-col p-4 col-span-3"}>
            <h1 className={"text-4xl font-semibold text-primary-text"}>
                {title}
            </h1>
            <div className={"h-full w-full py-12"}>
                <Bar options={chartOptions} data={chartData} />
            </div>
        </div>

    )
}

export default BarChart
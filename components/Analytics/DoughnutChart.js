import {
    Chart as ChartJS,

    Tooltip,
    Legend, ArcElement
} from "chart.js"
import { Doughnut, } from "react-chartjs-2";
import {useEffect, useState} from "react";

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({labels, label, title, data }) => {

    const [chartData, setChartData] = useState({datasets: []})

    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        console.log(data)
        setChartData({
                labels: labels,
                datasets: [
                    {
                        label: label,
                        data: data,
                        backgroundColor: [
                            'rgba(42, 50, 60, 1)',
                            'rgba(72, 128, 255, 1)',
                            'rgba(255, 135, 67, 1)',
                            'rgba(31, 178, 166, 1)',
                            'rgba(252, 190, 45, 1)',
                        ],
                        borderWidth: 0,
                    },
                ],
            }
        )
        setChartOptions({
            plugins: {
                legend: {
                    position: "right",
                    font: {
                        size: 36,
                        family: "Nunito Sans"
                    }
                },
            },
            maintainAspectRatio: false,
            responsive: true
        })
    }, [data])

    return (
        <div className={"font-primary bg-white rounded-xl h-full w-full flex flex-col p-4 col-span-2"}>
            <h1 className={"text-4xl font-semibold text-primary-text"}>
                {title}
            </h1>
            <div className={"h-full w-full py-12"}>
                <Doughnut data={chartData} options={chartOptions}/>
            </div>
        </div>

    )
}

export default DoughnutChart
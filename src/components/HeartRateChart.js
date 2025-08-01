import React, { useMemo } from 'react';
import { Chart } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const HeartRateChart = ({ diagnosisHistory }) => {
    const processedData = useMemo(() => {
        if (!diagnosisHistory || !Array.isArray(diagnosisHistory) || diagnosisHistory.length === 0) {
            return null;
        }

        const validRecords = diagnosisHistory.filter(record => 
            record && record.month && record.year && record.heart_rate && record.heart_rate.value !== undefined
        );

        if (validRecords.length === 0) {
            return null;
        }

        const sortedRecords = [...validRecords]
            .sort((a, b) => {
                const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const aMonthIndex = monthNames.indexOf(a.month);
                const bMonthIndex = monthNames.indexOf(b.month);
                return (new Date(a.year, aMonthIndex, 1) - new Date(b.year, bMonthIndex, 1));
            })
            .slice(-6); // Show last 6 months

        return {
            labels: sortedRecords.map(record => `${record.month.slice(0, 3)} ${record.year}`),
            heartRateData: sortedRecords.map(record => record.heart_rate.value),
        };
    }, [diagnosisHistory]);

    if (!processedData) {
        return (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-500 text-center">No heart rate data available</p>
            </div>
        );
    }

    const chartData = {
        labels: processedData.labels,
        datasets: [
            {
                label: 'Heart Rate (BPM)',
                data: processedData.heartRateData,
                borderColor: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#EF4444',
                fill: true,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: '#FFF',
                titleColor: '#000',
                bodyColor: '#000',
                borderColor: '#DDD',
                borderWidth: 1,
                padding: 12,
            }
        },
        scales: {
            y: {
                min: 60,
                max: 100,
                grid: {
                    color: '#F0F0F0',
                    drawBorder: false,
                },
                ticks: {
                    stepSize: 10,
                    color: '#707070',
                    font: {
                        size: 12
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#707070',
                    font: {
                        size: 12
                    }
                }
            }
        }
    };

    return (
        <div className="mt-2">
            <div className="h-24">
                <Chart type="line" data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default HeartRateChart;

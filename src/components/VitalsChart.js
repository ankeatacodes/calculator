import React from 'react';
import { Chart } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const VitalsChart = ({ data, type = 'line', title, color = '#3B82F6' }) => {
    const chartData = {
        labels: data.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: title,
                data: data.values || [],
                borderColor: color,
                backgroundColor: `${color}20`,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: color,
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
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
                backgroundColor: '#fff',
                titleColor: '#1f2937',
                bodyColor: '#1f2937',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                borderRadius: 8,
                displayColors: false,
                callbacks: {
                    label: function(context) {
                        const value = context.raw;
                        let unit = '';
                        if (title.includes('Heart Rate')) unit = ' bpm';
                        if (title.includes('Temperature')) unit = '°F';
                        if (title.includes('Respiratory')) unit = ' rpm';
                        if (title.includes('Blood Pressure')) unit = ' mmHg';
                        return `${title}: ${value}${unit}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    color: '#f3f4f6',
                    drawBorder: false,
                },
                ticks: {
                    color: '#6b7280',
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
                    color: '#6b7280',
                    font: {
                        size: 12
                    }
                }
            }
        }
    };

    return (
        <div className="h-48">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    );
};

export default VitalsChart;

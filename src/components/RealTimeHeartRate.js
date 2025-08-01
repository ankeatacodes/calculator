import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
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
import { Heart, Activity, Zap, TrendingUp, TrendingDown } from 'lucide-react';

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

const RealTimeHeartRate = ({ isMonitoring = true, onHeartRateUpdate }) => {
    const [currentHeartRate, setCurrentHeartRate] = useState(72);
    const [heartRateHistory, setHeartRateHistory] = useState([]);
    const [trend, setTrend] = useState('stable');
    const [isConnected, setIsConnected] = useState(false);
    const [maxDataPoints] = useState(60); // Show last 60 seconds

    // Simulate real-time heart rate data
    const generateRealisticHeartRate = useCallback((previousRate) => {
        // Base heart rate for a 21-year-old female (Jessica)
        const baseRate = 75;
        const variation = 15;
        
        // Create realistic fluctuations
        const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
        const momentum = previousRate ? (previousRate - baseRate) * 0.7 : 0; // Previous rate influence
        
        let newRate = baseRate + momentum + (randomFactor * variation);
        
        // Ensure realistic bounds (50-120 for normal activity)
        newRate = Math.max(50, Math.min(120, newRate));
        
        return Math.round(newRate);
    }, []);

    // Calculate trend based on recent data
    const calculateTrend = useCallback((history) => {
        if (history.length < 5) return 'stable';
        
        const recent = history.slice(-5);
        const average = recent.reduce((sum, point) => sum + point.value, 0) / recent.length;
        const oldest = recent[0].value;
        
        if (average > oldest + 3) return 'rising';
        if (average < oldest - 3) return 'falling';
        return 'stable';
    }, []);

    // Real-time heart rate simulation
    useEffect(() => {
        if (!isMonitoring) return;

        setIsConnected(true);
        
        const interval = setInterval(() => {
            const timestamp = new Date();
            const newRate = generateRealisticHeartRate(currentHeartRate);
            
            setCurrentHeartRate(newRate);
            
            setHeartRateHistory(prev => {
                const newHistory = [...prev, {
                    time: timestamp,
                    value: newRate,
                    timestamp: timestamp.toLocaleTimeString()
                }];
                
                // Keep only last maxDataPoints
                const trimmedHistory = newHistory.slice(-maxDataPoints);
                
                // Calculate trend
                const newTrend = calculateTrend(trimmedHistory);
                setTrend(newTrend);
                
                return trimmedHistory;
            });

            // Callback to parent component
            if (onHeartRateUpdate) {
                onHeartRateUpdate(newRate);
            }
        }, 1000); // Update every second

        return () => {
            clearInterval(interval);
            setIsConnected(false);
        };
    }, [isMonitoring, currentHeartRate, generateRealisticHeartRate, calculateTrend, onHeartRateUpdate, maxDataPoints]);

    // Chart configuration for real-time display
    const chartData = {
        labels: heartRateHistory.map(point => point.timestamp),
        datasets: [
            {
                label: 'Heart Rate (BPM)',
                data: heartRateHistory.map(point => point.value),
                borderColor: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                pointRadius: 2,
                pointBackgroundColor: '#EF4444',
                pointBorderColor: '#fff',
                pointBorderWidth: 1,
                fill: true,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 0 // Disable animation for real-time updates
        },
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
                callbacks: {
                    label: function(context) {
                        return `Heart Rate: ${context.raw} BPM`;
                    }
                }
            }
        },
        scales: {
            y: {
                min: 50,
                max: 120,
                grid: {
                    color: '#f3f4f6',
                    drawBorder: false,
                },
                ticks: {
                    stepSize: 10,
                    color: '#6b7280',
                    font: {
                        size: 11
                    }
                }
            },
            x: {
                display: false, // Hide x-axis labels for cleaner real-time view
                grid: {
                    display: false
                }
            }
        }
    };

    const getStatusColor = (rate) => {
        if (rate < 60) return 'text-blue-600 bg-blue-50 border-blue-200';
        if (rate > 100) return 'text-red-600 bg-red-50 border-red-200';
        return 'text-green-600 bg-green-50 border-green-200';
    };

    const getStatusText = (rate) => {
        if (rate < 60) return 'Low';
        if (rate > 100) return 'High';
        return 'Normal';
    };

    const getTrendIcon = () => {
        switch (trend) {
            case 'rising':
                return <TrendingUp className="w-4 h-4 text-green-500" />;
            case 'falling':
                return <TrendingDown className="w-4 h-4 text-red-500" />;
            default:
                return <Activity className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="space-y-4">
            {/* Real-time Heart Rate Display */}
            <Card className={`${getStatusColor(currentHeartRate)} transition-all duration-300`}>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${isConnected ? 'bg-green-100' : 'bg-gray-100'}`}>
                                <Heart className={`w-6 h-6 ${isConnected ? 'text-green-600 animate-pulse' : 'text-gray-400'}`} />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Live Heart Rate</CardTitle>
                                <CardDescription className="flex items-center space-x-2">
                                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                    <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
                                </CardDescription>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            {getTrendIcon()}
                            <Zap className={`w-5 h-5 ${isConnected ? 'text-yellow-500 animate-pulse' : 'text-gray-400'}`} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="text-center">
                            <div className="text-5xl font-bold font-mono mb-2">
                                {currentHeartRate}
                                <span className="text-2xl text-gray-500 ml-2">BPM</span>
                            </div>
                            <Badge variant="secondary" className={`${getStatusColor(currentHeartRate)} text-white`}>
                                {getStatusText(currentHeartRate)}
                            </Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-center text-sm">
                            <div>
                                <div className="font-semibold text-gray-600">Trend</div>
                                <div className="capitalize font-medium">{trend}</div>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-600">Duration</div>
                                <div className="font-medium">{Math.floor(heartRateHistory.length / 60)}m {heartRateHistory.length % 60}s</div>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-600">Range</div>
                                <div className="font-medium">
                                    {heartRateHistory.length > 0 ? 
                                        `${Math.min(...heartRateHistory.map(h => h.value))}-${Math.max(...heartRateHistory.map(h => h.value))}` : 
                                        '--'
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Real-time Chart */}
            {heartRateHistory.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Activity className="w-5 h-5 text-red-500" />
                            <span>Real-time Heart Rate Trend</span>
                        </CardTitle>
                        <CardDescription>
                            Live heart rate monitoring - Last {maxDataPoints} seconds
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-48">
                            <Chart type="line" data={chartData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default RealTimeHeartRate;

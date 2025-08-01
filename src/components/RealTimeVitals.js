import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, Activity, Thermometer, Gauge, Wifi, WifiOff, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const RealTimeVitals = ({ isMonitoring = true, currentHeartRate = 72, onVitalsUpdate }) => {
    const [vitals, setVitals] = useState({
        heartRate: currentHeartRate,
        respiratoryRate: 16,
        temperature: 98.3,
        bloodPressure: { systolic: 118, diastolic: 78 }
    });
    
    const [isConnected, setIsConnected] = useState(true);
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const [isUpdating, setIsUpdating] = useState(false);
    const [vitalsHistory, setVitalsHistory] = useState([]); // Track history for trends
    const [trends, setTrends] = useState({
        heartRate: 'stable',
        respiratoryRate: 'stable',
        temperature: 'stable',
        bloodPressure: 'stable'
    });

    // Generate realistic vital signs with momentum-based logic (excluding heart rate)
    const generateRealisticVitals = useCallback((prevVitals, heartRate) => {
        // Use the provided heart rate from RealTimeHeartRate component
        // Don't generate heart rate here - it comes from the heart rate chart
        
        // Respiratory Rate - Base rate for healthy young adult
        const respBase = 16;
        const respVariation = 3;
        const respMomentum = prevVitals ? (prevVitals.respiratoryRate - respBase) * 0.6 : 0;
        const respRandom = (Math.random() - 0.5) * 2;
        let newRespRate = respBase + respMomentum + (respRandom * respVariation);
        newRespRate = Math.max(12, Math.min(20, newRespRate));

        // Temperature - Base temp for healthy young adult
        const tempBase = 98.6;
        const tempVariation = 0.8;
        const tempMomentum = prevVitals ? (prevVitals.temperature - tempBase) * 0.8 : 0;
        const tempRandom = (Math.random() - 0.5) * 2;
        let newTemp = tempBase + tempMomentum + (tempRandom * tempVariation);
        newTemp = Math.max(97.0, Math.min(99.0, newTemp));

        // Blood Pressure - Systolic and Diastolic with correlation
        const systolicBase = 120;
        const diastolicBase = 75;
        const bpVariation = 8;
        const systolicMomentum = prevVitals ? (prevVitals.bloodPressure.systolic - systolicBase) * 0.7 : 0;
        const diastolicMomentum = prevVitals ? (prevVitals.bloodPressure.diastolic - diastolicBase) * 0.7 : 0;
        const bpRandom = (Math.random() - 0.5) * 2;
        
        let newSystolic = systolicBase + systolicMomentum + (bpRandom * bpVariation);
        let newDiastolic = diastolicBase + diastolicMomentum + (bpRandom * (bpVariation * 0.6));
        
        newSystolic = Math.max(100, Math.min(140, newSystolic));
        newDiastolic = Math.max(60, Math.min(90, newDiastolic));

        return {
            heartRate: heartRate, // Use the provided heart rate
            respiratoryRate: Math.round(newRespRate),
            temperature: Math.round(newTemp * 10) / 10,
            bloodPressure: {
                systolic: Math.round(newSystolic),
                diastolic: Math.round(newDiastolic)
            }
        };
    }, []);

    // Calculate trends based on recent history (like heart rate component)
    const calculateTrends = useCallback((history) => {
        if (history.length < 5) return {
            heartRate: 'stable',
            respiratoryRate: 'stable', 
            temperature: 'stable',
            bloodPressure: 'stable'
        };

        const recent = history.slice(-5);
        const trends = {};

        // Heart Rate trend
        const hrAverage = recent.reduce((sum, point) => sum + point.heartRate, 0) / recent.length;
        const hrOldest = recent[0].heartRate;
        if (hrAverage > hrOldest + 3) trends.heartRate = 'rising';
        else if (hrAverage < hrOldest - 3) trends.heartRate = 'falling';
        else trends.heartRate = 'stable';

        // Respiratory Rate trend
        const rrAverage = recent.reduce((sum, point) => sum + point.respiratoryRate, 0) / recent.length;
        const rrOldest = recent[0].respiratoryRate;
        if (rrAverage > rrOldest + 1.5) trends.respiratoryRate = 'rising';
        else if (rrAverage < rrOldest - 1.5) trends.respiratoryRate = 'falling';
        else trends.respiratoryRate = 'stable';

        // Temperature trend
        const tempAverage = recent.reduce((sum, point) => sum + point.temperature, 0) / recent.length;
        const tempOldest = recent[0].temperature;
        if (tempAverage > tempOldest + 0.3) trends.temperature = 'rising';
        else if (tempAverage < tempOldest - 0.3) trends.temperature = 'falling';
        else trends.temperature = 'stable';

        // Blood Pressure trend (based on systolic)
        const bpAverage = recent.reduce((sum, point) => sum + point.bloodPressure.systolic, 0) / recent.length;
        const bpOldest = recent[0].bloodPressure.systolic;
        if (bpAverage > bpOldest + 4) trends.bloodPressure = 'rising';
        else if (bpAverage < bpOldest - 4) trends.bloodPressure = 'falling';
        else trends.bloodPressure = 'stable';

        return trends;
    }, []);

    // Real-time vitals simulation with history tracking (synchronized with heart rate chart)
    useEffect(() => {
        if (!isMonitoring) {
            return; // Don't start interval if monitoring is paused
        }

        const interval = setInterval(() => {
            setIsUpdating(true); // Start flash animation
            
            const timestamp = new Date();
            const newVitals = generateRealisticVitals(vitals, currentHeartRate);
            
            setVitals(newVitals);
            setLastUpdate(timestamp);
            
            // Update history (keep last 30 data points for trend analysis)
            setVitalsHistory(prev => {
                const newHistory = [...prev, {
                    timestamp: timestamp,
                    ...newVitals
                }];
                
                // Keep only last 30 data points
                const trimmedHistory = newHistory.slice(-30);
                
                // Calculate trends
                const newTrends = calculateTrends(trimmedHistory);
                setTrends(newTrends);
                
                return trimmedHistory;
            });

            // Callback to parent component
            if (onVitalsUpdate) {
                onVitalsUpdate(newVitals);
            }
            
            // Stop flash animation after 200ms
            setTimeout(() => setIsUpdating(false), 200);
        }, 1000); // Update every 1 second (same as heart rate chart)

        return () => clearInterval(interval);
    }, [isMonitoring, vitals, currentHeartRate, generateRealisticVitals, calculateTrends, onVitalsUpdate]);

    // Update heart rate when prop changes (synchronization with RealTimeHeartRate)
    useEffect(() => {
        setVitals(prev => ({
            ...prev,
            heartRate: currentHeartRate
        }));
    }, [currentHeartRate]);

    // Simulate connection status
    useEffect(() => {
        if (!isMonitoring) {
            setIsConnected(false); // Show disconnected when monitoring is paused
            return;
        }

        setIsConnected(true); // Set connected when monitoring starts
        
        const connectionInterval = setInterval(() => {
            // 95% chance of staying connected
            setIsConnected(prev => Math.random() > 0.05 ? true : !prev);
        }, 10000); // Check every 10 seconds

        return () => clearInterval(connectionInterval);
    }, [isMonitoring]);

    const getHeartRateStatus = (rate) => {
        if (rate < 60) return { status: 'Low', color: 'bg-blue-100 text-blue-800' };
        if (rate > 100) return { status: 'High', color: 'bg-red-100 text-red-800' };
        return { status: 'Normal', color: 'bg-green-100 text-green-800' };
    };

    const getRespiratoryStatus = (rate) => {
        if (rate < 12 || rate > 20) return { status: 'Abnormal', color: 'bg-yellow-100 text-yellow-800' };
        return { status: 'Normal', color: 'bg-green-100 text-green-800' };
    };

    const getTemperatureStatus = (temp) => {
        if (temp < 97.0 || temp > 99.0) return { status: 'Abnormal', color: 'bg-yellow-100 text-yellow-800' };
        return { status: 'Normal', color: 'bg-green-100 text-green-800' };
    };

    const getBPStatus = (systolic, diastolic) => {
        if (systolic > 130 || diastolic > 80) return { status: 'High', color: 'bg-red-100 text-red-800' };
        if (systolic < 90 || diastolic < 60) return { status: 'Low', color: 'bg-blue-100 text-blue-800' };
        return { status: 'Normal', color: 'bg-green-100 text-green-800' };
    };

    // Get trend icon component
    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'rising':
                return <TrendingUp className="w-4 h-4 text-red-500" />;
            case 'falling':
                return <TrendingDown className="w-4 h-4 text-blue-500" />;
            default:
                return <Minus className="w-4 h-4 text-gray-400" />;
        }
    };

    const heartRateStatus = getHeartRateStatus(vitals.heartRate);
    const respiratoryStatus = getRespiratoryStatus(vitals.respiratoryRate);
    const temperatureStatus = getTemperatureStatus(vitals.temperature);
    const bpStatus = getBPStatus(vitals.bloodPressure.systolic, vitals.bloodPressure.diastolic);

    return (
        <div className="space-y-6">
            {/* Connection Status */}
            <Card className={`border-2 ${isConnected ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {isConnected ? (
                                <Wifi className="w-5 h-5 text-green-600" />
                            ) : (
                                <WifiOff className="w-5 h-5 text-red-600" />
                            )}
                            <div>
                                <div className="font-semibold">
                                    {isConnected ? 'Sensors Connected' : 'Connection Lost'}
                                </div>
                                <div className="text-sm text-gray-600">
                                    Last update: {lastUpdate.toLocaleTimeString()}
                                </div>
                            </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    </div>
                </CardContent>
            </Card>

            {/* Real-time Vitals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Heart Rate */}
                <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 transition-all duration-300">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Heart className={`w-6 h-6 text-red-500 ${isConnected ? 'animate-pulse' : ''}`} />
                                <CardTitle className="text-lg">Heart Rate</CardTitle>
                                {getTrendIcon(trends.heartRate)}
                            </div>
                            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className={`text-3xl font-bold text-red-600 font-mono transition-all duration-200 ${isUpdating ? 'scale-105 text-red-700' : ''}`}>
                                {isConnected ? vitals.heartRate : '--'}
                                <span className="text-sm text-gray-500 ml-1">BPM</span>
                            </div>
                            <Badge variant="secondary" className={heartRateStatus.color}>
                                {heartRateStatus.status}
                            </Badge>
                            <div className="text-xs text-gray-600">
                                Normal: 60-100 BPM
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Respiratory Rate */}
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 transition-all duration-300">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Activity className="w-6 h-6 text-blue-500" />
                                <CardTitle className="text-lg">Respiratory</CardTitle>
                                {getTrendIcon(trends.respiratoryRate)}
                            </div>
                            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className={`text-3xl font-bold text-blue-600 font-mono transition-all duration-200 ${isUpdating ? 'scale-105 text-blue-700' : ''}`}>
                                {isConnected ? vitals.respiratoryRate : '--'}
                                <span className="text-sm text-gray-500 ml-1">RPM</span>
                            </div>
                            <Badge variant="secondary" className={respiratoryStatus.color}>
                                {respiratoryStatus.status}
                            </Badge>
                            <div className="text-xs text-gray-600">
                                Normal: 12-20 RPM
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Temperature */}
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 transition-all duration-300">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Thermometer className="w-6 h-6 text-orange-500" />
                                <CardTitle className="text-lg">Temperature</CardTitle>
                                {getTrendIcon(trends.temperature)}
                            </div>
                            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className={`text-3xl font-bold text-orange-600 font-mono transition-all duration-200 ${isUpdating ? 'scale-105 text-orange-700' : ''}`}>
                                {isConnected ? vitals.temperature.toFixed(1) : '--'}
                                <span className="text-sm text-gray-500 ml-1">°F</span>
                            </div>
                            {isConnected && (
                                <div className="text-lg text-orange-500 font-mono">
                                    {((vitals.temperature - 32) * 5/9).toFixed(1)}°C
                                </div>
                            )}
                            <Badge variant="secondary" className={temperatureStatus.color}>
                                {temperatureStatus.status}
                            </Badge>
                            <div className="text-xs text-gray-600">
                                Normal: 97.0-99.0°F (36.1-37.2°C)
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Blood Pressure */}
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 transition-all duration-300">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Gauge className="w-6 h-6 text-purple-500" />
                                <CardTitle className="text-lg">Blood Pressure</CardTitle>
                                {getTrendIcon(trends.bloodPressure)}
                            </div>
                            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className={`text-2xl font-bold text-purple-600 font-mono transition-all duration-200 ${isUpdating ? 'scale-105 text-purple-700' : ''}`}>
                                {isConnected ? 
                                    `${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic}` : 
                                    '--/--'
                                }
                                <span className="text-sm text-gray-500 ml-1">mmHg</span>
                            </div>
                            <Badge variant="secondary" className={bpStatus.color}>
                                {bpStatus.status}
                            </Badge>
                            <div className="text-xs text-gray-600">
                                Normal: &lt;120/80 mmHg
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default RealTimeVitals;

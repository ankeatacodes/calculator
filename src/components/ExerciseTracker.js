import React, { useState, useEffect } from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const ExerciseTracker = ({ exerciseData, currentExercise, onStartExercise, onStopExercise }) => {
    const [exerciseType, setExerciseType] = useState('Running');
    const [intensity, setIntensity] = useState('Medium');
    const [duration, setDuration] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning && currentExercise) {
            interval = setInterval(() => {
                setDuration(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, currentExercise]);

    const startExercise = () => {
        const exercise = {
            type: exerciseType,
            intensity,
            startTime: new Date(),
        };
        setIsRunning(true);
        setDuration(0);
        onStartExercise(exercise);
    };

    const pauseExercise = () => {
        setIsRunning(!isRunning);
    };

    const stopExercise = () => {
        setIsRunning(false);
        setDuration(0);
        onStopExercise();
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const getTotalExerciseTime = () => {
        return exerciseData.reduce((total, exercise) => total + exercise.duration, 0);
    };

    const getAverageIntensity = () => {
        if (exerciseData.length === 0) return 'None';
        const intensityMap = { 'Low': 1, 'Medium': 2, 'High': 3 };
        const avg = exerciseData.reduce((sum, ex) => sum + intensityMap[ex.intensity], 0) / exerciseData.length;
        if (avg <= 1.5) return 'Low';
        if (avg <= 2.5) return 'Medium';
        return 'High';
    };

    return (
        <div className="space-y-6">
            {/* Exercise Controls */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50">
                <CardHeader>
                    <CardTitle className="text-lg">Start Your Workout</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Exercise Type</label>
                            <select 
                                value={exerciseType} 
                                onChange={(e) => setExerciseType(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                disabled={currentExercise}
                            >
                                <option value="Running">Running</option>
                                <option value="Cycling">Cycling</option>
                                <option value="Swimming">Swimming</option>
                                <option value="Walking">Walking</option>
                                <option value="Gym">Gym Workout</option>
                                <option value="Yoga">Yoga</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Intensity</label>
                            <select 
                                value={intensity} 
                                onChange={(e) => setIntensity(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                disabled={currentExercise}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>

                    {/* Timer Display */}
                    <div className="text-center mb-6">
                        <div className="text-5xl font-bold text-green-600 mb-2 font-mono">
                            {formatTime(duration)}
                        </div>
                        {currentExercise && (
                            <CardDescription className="text-lg">
                                {currentExercise.type} - {currentExercise.intensity} Intensity
                            </CardDescription>
                        )}
                    </div>

                    {/* Control Buttons */}
                    <div className="flex justify-center space-x-4">
                        {!currentExercise ? (
                            <Button
                                onClick={startExercise}
                                size="lg"
                                className="bg-green-500 hover:bg-green-600 text-white"
                            >
                                <Play className="w-5 h-5 mr-2" />
                                Start Exercise
                            </Button>
                        ) : (
                            <>
                                <Button
                                    onClick={pauseExercise}
                                    size="lg"
                                    variant="outline"
                                    className="border-blue-500 text-blue-500 hover:bg-blue-50"
                                >
                                    {isRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                                    {isRunning ? 'Pause' : 'Resume'}
                                </Button>
                                <Button
                                    onClick={stopExercise}
                                    size="lg"
                                    variant="destructive"
                                >
                                    <Square className="w-5 h-5 mr-2" />
                                    Stop
                                </Button>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Exercise Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardContent className="pt-6">
                        <div className="text-3xl font-bold text-blue-600 mb-1">{exerciseData.length}</div>
                        <CardDescription>Total Sessions</CardDescription>
                    </CardContent>
                </Card>
                <Card className="text-center bg-gradient-to-br from-green-50 to-green-100">
                    <CardContent className="pt-6">
                        <div className="text-3xl font-bold text-green-600 mb-1">{getTotalExerciseTime()} min</div>
                        <CardDescription>Total Time</CardDescription>
                    </CardContent>
                </Card>
                <Card className="text-center bg-gradient-to-br from-orange-50 to-orange-100">
                    <CardContent className="pt-6">
                        <div className="text-3xl font-bold text-orange-600 mb-1">{getAverageIntensity()}</div>
                        <CardDescription>Avg Intensity</CardDescription>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Exercise History */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Sessions</CardTitle>
                    <CardDescription>Your latest workout history</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        {exerciseData.slice(-5).reverse().map((exercise, index) => (
                            <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div>
                                    <div className="font-semibold text-gray-900">{exercise.type}</div>
                                    <div className="text-sm text-gray-600">{exercise.date}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold text-gray-900">{exercise.duration} min</div>
                                    <Badge 
                                        variant={
                                            exercise.intensity === 'High' ? 'destructive' :
                                            exercise.intensity === 'Medium' ? 'warning' :
                                            'success'
                                        }
                                        size="sm"
                                    >
                                        {exercise.intensity}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                        {exerciseData.length === 0 && (
                            <div className="text-center text-gray-500 py-8">
                                <div className="text-lg font-medium mb-2">No workouts yet</div>
                                <div className="text-sm">Start your first exercise session above!</div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ExerciseTracker;

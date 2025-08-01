import React, { useState } from 'react';
import { Timer, AlertTriangle } from 'lucide-react';
import RealTimeHeartRate from './RealTimeHeartRate';
import RealTimeRespiratoryRate from './RealTimeRespiratoryRate';
import RealTimeVitals from './RealTimeVitals';
import ExerciseTracker from './ExerciseTracker';
import InjuryPredictor from './InjuryPredictor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const HomePage = ({ userHealthData, exerciseData, currentExercise, onStartExercise, onStopExercise }) => {
  const [realTimeVitals, setRealTimeVitals] = useState({
    heartRate: 72,
    respiratoryRate: 16,
    temperature: 98.3,
    bloodPressure: { systolic: 118, diastolic: 78 }
  });
  const [isMonitoring, setIsMonitoring] = useState(true);

  const handleVitalsUpdate = (newVitals) => {
    setRealTimeVitals(newVitals);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {userHealthData?.name?.split(' ')[0] || 'Jessica'}
        </h1>
        <p className="text-xl text-gray-600">Real-time health monitoring and wellness tracking</p>
        
        {/* Real-time Status */}
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-medium text-gray-700">
              {isMonitoring ? 'Live Monitoring Active' : 'Monitoring Paused'}
            </span>
          </div>
          <Button 
            variant={isMonitoring ? "outline" : "default"}
            size="sm"
            onClick={() => setIsMonitoring(!isMonitoring)}
          >
            {isMonitoring ? 'Pause Monitoring' : 'Start Monitoring'}
          </Button>
        </div>
      </div>

      {/* Real-time Vitals Monitoring */}
      <div className="mb-8">
        <RealTimeVitals 
          isMonitoring={isMonitoring}
          currentHeartRate={realTimeVitals.heartRate}
          onVitalsUpdate={handleVitalsUpdate} 
        />
      </div>

      {/* Real-Time Charts - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Real-time Heart Rate Chart */}
        <div>
          <RealTimeHeartRate 
            isMonitoring={isMonitoring} 
            onHeartRateUpdate={(rate) => setRealTimeVitals(prev => ({ ...prev, heartRate: rate }))}
          />
        </div>

        {/* Real-time Respiratory Rate Chart */}
        <div>
          <RealTimeRespiratoryRate 
            isMonitoring={isMonitoring} 
            currentRespiratoryRate={realTimeVitals.respiratoryRate}
          />
        </div>
      </div>

      {/* Exercise Tracking and Injury Prediction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Exercise Tracking */}
        <Card>
          <CardHeader>
            <div className='flex items-center space-x-3'>
              <Timer className="w-8 h-8 text-green-500" />
              <div>
                <CardTitle>Exercise Tracking</CardTitle>
                <CardDescription>Monitor your daily activities and workouts</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ExerciseTracker 
              exerciseData={exerciseData}
              currentExercise={currentExercise}
              onStartExercise={onStartExercise}
              onStopExercise={onStopExercise}
            />
          </CardContent>
        </Card>

        {/* Health Risk Assessment */}
        <Card>
          <CardHeader>
            <div className='flex items-center space-x-3'>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
              <div>
                <CardTitle>Health Risk Assessment</CardTitle>
                <CardDescription>AI-powered analysis of your health patterns</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <InjuryPredictor 
              heartRate={realTimeVitals.heartRate}
              respiratoryRate={realTimeVitals.respiratoryRate}
              exerciseData={exerciseData}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;

import React from 'react';
import { Timer, AlertTriangle, Heart, Activity } from 'lucide-react';
import HeartRateChart from './HeartRateChart';
import ExerciseTracker from './ExerciseTracker';
import InjuryPredictor from './InjuryPredictor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import heartBPM from '../assets/HeartBPM.png';

const HomePage = ({ userHealthData, exerciseData, currentExercise, onStartExercise, onStopExercise }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {userHealthData?.name?.split(' ')[0] || 'User'}
        </h1>
        <p className="text-xl text-gray-600">Track your health and stay on top of your wellness goals</p>
      </div>

      {/* Health Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Heart Rate Card */}
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="pb-2">
            <div className='flex items-center space-x-2'>
              <Heart className="w-6 h-6 text-red-500" />
              <CardTitle className="text-lg">Heart Rate</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 mb-1">
              {userHealthData?.diagnosis_history?.[0]?.heart_rate?.value || 0} bpm
            </div>
            <CardDescription>
              {userHealthData?.diagnosis_history?.[0]?.heart_rate?.levels?.includes('Higher') ? (
                <span className="text-red-600 font-medium">▲ {userHealthData?.diagnosis_history?.[0]?.heart_rate?.levels}</span>
              ) : (
                <span className="text-green-600 font-medium">▼ {userHealthData?.diagnosis_history?.[0]?.heart_rate?.levels}</span>
              )}
            </CardDescription>
          </CardContent>
        </Card>

        {/* Respiratory Rate Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <div className='flex items-center space-x-2'>
              <Activity className="w-6 h-6 text-blue-500" />
              <CardTitle className="text-lg">Respiratory Rate</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {userHealthData?.diagnosis_history?.[0]?.respiratory_rate?.value || 0} rpm
            </div>
            <CardDescription className="text-blue-600 font-medium">
              {userHealthData?.diagnosis_history?.[0]?.respiratory_rate?.levels}
            </CardDescription>
          </CardContent>
        </Card>

        {/* Temperature Card */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <div className='flex items-center space-x-2'>
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <CardTitle className="text-lg">Temperature</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {userHealthData?.diagnosis_history?.[0]?.temperature?.value || 0}°F
            </div>
            <CardDescription className="text-orange-600 font-medium">
              {userHealthData?.diagnosis_history?.[0]?.temperature?.levels}
            </CardDescription>
          </CardContent>
        </Card>

        {/* Blood Pressure Card */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <div className='flex items-center space-x-2'>
              <div className="w-6 h-6 rounded bg-purple-500 flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-white rounded-sm"></div>
              </div>
              <CardTitle className="text-lg">Blood Pressure</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {userHealthData?.diagnosis_history?.[0]?.blood_pressure?.systolic?.value || 0}/
              {userHealthData?.diagnosis_history?.[0]?.blood_pressure?.diastolic?.value || 0}
            </div>
            <CardDescription className="text-purple-600 font-medium">
              {userHealthData?.diagnosis_history?.[0]?.blood_pressure?.systolic?.levels}
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Views */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Heart Rate Chart */}
        <Card>
          <CardHeader>
            <div className='flex items-center space-x-3'>
              <img src={heartBPM} alt="Heart Rate" className="w-8 h-8" />
              <div>
                <CardTitle>Heart Rate Trends</CardTitle>
                <CardDescription>Your heart rate over the past 6 months</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {userHealthData && userHealthData.diagnosis_history && (
              <HeartRateChart diagnosisHistory={userHealthData.diagnosis_history} />
            )}
          </CardContent>
        </Card>

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
      </div>

      {/* Injury Risk Assessment */}
      <Card>
        <CardHeader>
          <div className='flex items-center space-x-3'>
            <AlertTriangle className="w-8 h-8 text-orange-500" />
            <div>
              <CardTitle>Health Risk Assessment</CardTitle>
              <CardDescription>AI-powered insights based on your health data</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <InjuryPredictor 
            heartRate={userHealthData?.diagnosis_history?.[0]?.heart_rate?.value}
            respiratoryRate={userHealthData?.diagnosis_history?.[0]?.respiratory_rate?.value}
            exerciseData={exerciseData}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;

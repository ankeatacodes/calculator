import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import ExerciseTracker from './ExerciseTracker';
import { Activity, Calendar, Trophy, Target } from 'lucide-react';

const ActivityPage = ({ exerciseData, currentExercise, onStartExercise, onStopExercise }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Activity Tracker</h1>
        <p className="text-xl text-gray-600">Track your workouts and stay active</p>
      </div>

      {/* Exercise Tracker */}
      <ExerciseTracker 
        exerciseData={exerciseData}
        currentExercise={currentExercise}
        onStartExercise={onStartExercise}
        onStopExercise={onStopExercise}
      />

      {/* Activity Goals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <Target className="w-5 h-5" />
              <span>Weekly Goal</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">5/7</div>
            <CardDescription>Days active this week</CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Activity className="w-5 h-5" />
              <span>Total Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {exerciseData.reduce((total, exercise) => total + exercise.duration, 0)} min
            </div>
            <CardDescription>This week</CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-800">
              <Trophy className="w-5 h-5" />
              <span>Streak</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
            <CardDescription>Days in a row</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivityPage;

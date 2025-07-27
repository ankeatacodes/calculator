import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import HealthStats from './components/HealthStats';
import ActivityPage from './components/ActivityPage';
import PredictionsPage from './components/PredictionsPage';
import ProfilePage from './components/ProfilePage';
import { Timer, AlertTriangle, Heart, Activity } from 'lucide-react';
import HeartRateChart from './components/HeartRateChart';
import ExerciseTracker from './components/ExerciseTracker';
import InjuryPredictor from './components/InjuryPredictor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import heartBPM from './assets/HeartBPM.png';
import respiratory from './assets/respiratory rate.png';

function App() {
  const [userHealthData, setUserHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exerciseData, setExerciseData] = useState([]);
  const [currentExercise, setCurrentExercise] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const credentials = btoa('coalition:skills-test');
        const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
          headers: {
            'Authorization': `Basic ${credentials}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        // Use Jessica Taylor's data as the logged-in user's data
        const userData = data.find(patient => patient.name === 'Jessica Taylor');
        setUserHealthData(userData);
        
        // Initialize exercise data for the user
        setExerciseData([
          { date: '2024-01-01', duration: 30, type: 'Running', intensity: 'High' },
          { date: '2024-01-02', duration: 45, type: 'Cycling', intensity: 'Medium' },
          { date: '2024-01-03', duration: 60, type: 'Swimming', intensity: 'High' },
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your health data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>Failed to load your health data</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      <Router>
        <Navigation />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                userHealthData={userHealthData}
                exerciseData={exerciseData}
                currentExercise={currentExercise}
                onStartExercise={setCurrentExercise}
                onStopExercise={() => setCurrentExercise(null)}
              />
            } 
          />
          <Route 
            path="/health-stats" 
            element={<HealthStats userHealthData={userHealthData} />} 
          />
          <Route 
            path="/activity" 
            element={
              <ActivityPage 
                exerciseData={exerciseData}
                currentExercise={currentExercise}
                onStartExercise={setCurrentExercise}
                onStopExercise={() => setCurrentExercise(null)}
              />
            } 
          />
          <Route 
            path="/predictions" 
            element={
              <PredictionsPage 
                userHealthData={userHealthData}
                exerciseData={exerciseData}
              />
            } 
          />
          <Route 
            path="/profile" 
            element={<ProfilePage userHealthData={userHealthData} />} 
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

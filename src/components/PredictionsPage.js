import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import InjuryPredictor from './InjuryPredictor';
import { TrendingUp, Brain, AlertTriangle } from 'lucide-react';

const PredictionsPage = ({ userHealthData, exerciseData }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Health Predictions</h1>
        <p className="text-xl text-gray-600">AI-powered insights and risk assessments</p>
      </div>

      {/* Predictions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Brain className="w-5 h-5" />
              <span>AI Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 mb-2">Advanced</div>
            <CardDescription>Personalized health insights</CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <TrendingUp className="w-5 h-5" />
              <span>Health Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 mb-2">Improving</div>
            <CardDescription>Overall health trajectory</CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-800">
              <AlertTriangle className="w-5 h-5" />
              <span>Risk Level</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 mb-2">Low</div>
            <CardDescription>Current health risk</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Main Prediction Component */}
      <InjuryPredictor 
        heartRate={userHealthData?.diagnosis_history?.[0]?.heart_rate?.value}
        respiratoryRate={userHealthData?.diagnosis_history?.[0]?.respiratory_rate?.value}
        exerciseData={exerciseData}
      />
    </div>
  );
};

export default PredictionsPage;

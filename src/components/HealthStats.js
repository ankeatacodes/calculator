import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Gauge, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Calendar,
  Clock,
  Target,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Timer,
  Droplets,
  Zap
} from 'lucide-react';
import HeartRateChart from './HeartRateChart';
import BloodPressureChart from './BloodPressureChart';
import RealTimeHeartRate from './RealTimeHeartRate';
import RealTimeVitals from './RealTimeVitals';
import VitalsChart from './VitalsChart';
import VitalsCard from './VitalsCard';
import HealthScoreCard from './HealthScoreCard';

const HealthStats = ({ userHealthData }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [realTimeVitals, setRealTimeVitals] = useState({
    heartRate: 72,
    respiratoryRate: 16,
    temperature: 98.3,
    bloodPressure: { systolic: 118, diastolic: 78 }
  });
  const [isRealTimeMode, setIsRealTimeMode] = useState(true);

  // Handle real-time vitals updates
  const handleVitalsUpdate = (newVitals) => {
    setRealTimeVitals(newVitals);
  };

  // Mock additional data for comprehensive health stats
  const healthGoals = {
    steps: { current: 8500, target: 10000 },
    heartRate: { current: realTimeVitals.heartRate, target: 70, range: '60-100' },
    sleep: { current: 7.2, target: 8 },
    water: { current: 6, target: 8 }
  };

  const weeklyTrends = {
    heartRate: [70, 72, 68, 74, 71, 73, 72],
    respiratoryRate: [16, 15, 17, 16, 15, 16, 15],
    temperature: [98.2, 98.4, 98.1, 98.3, 98.2, 98.5, 98.3],
    bloodPressure: [
      { systolic: 118, diastolic: 78 },
      { systolic: 120, diastolic: 80 },
      { systolic: 116, diastolic: 76 },
      { systolic: 122, diastolic: 82 },
      { systolic: 119, diastolic: 79 },
      { systolic: 121, diastolic: 81 },
      { systolic: 117, diastolic: 77 }
    ]
  };

  // Calculate health scores based on real-time data
  const healthScores = {
    overall: Math.min(100, Math.max(60, 85 + (75 - realTimeVitals.heartRate) * 0.5)),
    cardiovascular: Math.min(100, Math.max(60, 90 - Math.abs(realTimeVitals.heartRate - 72) * 2)),
    respiratory: Math.min(100, Math.max(60, 95 - Math.abs(realTimeVitals.respiratoryRate - 16) * 3)),
    lifestyle: 76
  };

  const currentVitals = isRealTimeMode ? {
    heart_rate: { value: realTimeVitals.heartRate, levels: realTimeVitals.heartRate > 100 ? 'Higher than normal' : 'Normal' },
    respiratory_rate: { value: realTimeVitals.respiratoryRate, levels: 'Normal' },
    temperature: { value: realTimeVitals.temperature, levels: 'Normal' },
    blood_pressure: { 
      systolic: { value: realTimeVitals.bloodPressure.systolic, levels: 'Normal' },
      diastolic: { value: realTimeVitals.bloodPressure.diastolic, levels: 'Normal' }
    }
  } : userHealthData?.diagnosis_history?.[0] || {};

  // Chart data for trends
  const chartData = {
    heartRate: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: weeklyTrends.heartRate
    },
    respiratoryRate: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: weeklyTrends.respiratoryRate
    },
    temperature: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: weeklyTrends.temperature
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Health Statistics</h1>
        <p className="text-xl text-gray-600">Real-time monitoring and comprehensive health metrics</p>
        
        {/* Real-time Mode Toggle */}
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isRealTimeMode ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-medium text-gray-700">
              {isRealTimeMode ? 'Live Data Mode' : 'Historical Data Mode'}
            </span>
          </div>
          <Button 
            variant={isRealTimeMode ? "default" : "outline"}
            size="sm"
            onClick={() => setIsRealTimeMode(!isRealTimeMode)}
            className="flex items-center space-x-2"
          >
            <Zap className="w-4 h-4" />
            <span>{isRealTimeMode ? 'Switch to Historical' : 'Switch to Real-time'}</span>
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Overview Period</CardTitle>
              <CardDescription>Select time range for detailed analysis</CardDescription>
            </div>
            <div className="flex space-x-2">
              {['day', 'week', 'month', 'year'].map((range) => (
                <Button
                  key={range}
                  variant={selectedTimeRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeRange(range)}
                  className="capitalize"
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Real-time Vitals Section */}
      {isRealTimeMode && (
        <div className="mb-8">
          <RealTimeVitals onVitalsUpdate={handleVitalsUpdate} />
        </div>
      )}

      {/* Current Vitals Overview - Enhanced Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <VitalsCard
          title="Heart Rate"
          value={currentVitals.heart_rate?.value || 72}
          unit="bpm"
          status={currentVitals.heart_rate?.levels || "Normal"}
          normalRange="60-100 bpm"
          trend={2}
          icon={Heart}
          color="red"
          description="Your resting heart rate"
        />
        
        <VitalsCard
          title="Respiratory Rate"
          value={currentVitals.respiratory_rate?.value || 16}
          unit="rpm"
          status={currentVitals.respiratory_rate?.levels || "Normal"}
          normalRange="12-20 rpm"
          trend={0}
          icon={Activity}
          color="blue"
          description="Breaths per minute"
        />

        <VitalsCard
          title="Temperature"
          value={currentVitals.temperature?.value || 98.3}
          unit="°F"
          status={currentVitals.temperature?.levels || "Normal"}
          normalRange="97.0-99.0°F"
          trend={1}
          icon={Thermometer}
          color="orange"
          description="Body temperature"
        />

        <VitalsCard
          title="Blood Pressure"
          value={`${currentVitals.blood_pressure?.systolic?.value || 118}/${currentVitals.blood_pressure?.diastolic?.value || 78}`}
          unit="mmHg"
          status={currentVitals.blood_pressure?.systolic?.levels || "Normal"}
          normalRange="<120/80 mmHg"
          trend={-1}
          icon={Gauge}
          color="purple"
          description="Systolic/Diastolic pressure"
        />
      </div>

      {/* Health Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <HealthScoreCard
          title="Overall Health"
          score={healthScores.overall}
          status="Good"
          trend={5}
          icon={BarChart3}
          color="green"
          description="Your comprehensive health score"
        />
        
        <HealthScoreCard
          title="Heart Health"
          score={healthScores.cardiovascular}
          status="Good"
          trend={2}
          icon={Heart}
          color="red"
          description="Cardiovascular fitness level"
        />
        
        <HealthScoreCard
          title="Respiratory Health"
          score={healthScores.respiratory}
          status="Excellent"
          trend={1}
          icon={Activity}
          color="blue"
          description="Lung function and breathing"
        />
        
        <HealthScoreCard
          title="Lifestyle Score"
          score={healthScores.lifestyle}
          status="Good"
          trend={3}
          icon={Target}
          color="purple"
          description="Daily habits and wellness"
        />
      </div>

      {/* Detailed Analytics with Enhanced Tabs */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Real-time Heart Rate Chart */}
            {isRealTimeMode ? (
              <div>
                <RealTimeHeartRate 
                  isMonitoring={isRealTimeMode}
                  onHeartRateUpdate={(rate) => setRealTimeVitals(prev => ({ ...prev, heartRate: rate }))}
                />
              </div>
            ) : (
              /* Historical Heart Rate Trends */
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span>Heart Rate Trends</span>
                  </CardTitle>
                  <CardDescription>Past week heart rate data</CardDescription>
                </CardHeader>
                <CardContent>
                  <VitalsChart 
                    data={chartData.heartRate}
                    title="Heart Rate"
                    color="#EF4444"
                  />
                </CardContent>
              </Card>
            )}

            {/* Respiratory Rate Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span>Respiratory Rate</span>
                </CardTitle>
                <CardDescription>Breathing pattern trends</CardDescription>
              </CardHeader>
              <CardContent>
                <VitalsChart 
                  data={chartData.respiratoryRate}
                  title="Respiratory Rate"
                  color="#3B82F6"
                />
              </CardContent>
            </Card>

            {/* Temperature Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Thermometer className="w-5 h-5 text-orange-500" />
                  <span>Temperature Trends</span>
                </CardTitle>
                <CardDescription>Body temperature variations</CardDescription>
              </CardHeader>
              <CardContent>
                <VitalsChart 
                  data={chartData.temperature}
                  title="Temperature"
                  color="#F97316"
                />
              </CardContent>
            </Card>

            {/* Blood Pressure Chart (Enhanced) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gauge className="w-5 h-5 text-purple-500" />
                  <span>Blood Pressure</span>
                </CardTitle>
                <CardDescription>Long-term blood pressure monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                {userHealthData && userHealthData.diagnosis_history && (
                  <BloodPressureChart diagnosisHistory={userHealthData.diagnosis_history} />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(healthGoals).map(([key, goal]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="capitalize flex items-center space-x-2">
                    {key === 'steps' && <Timer className="w-5 h-5" />}
                    {key === 'heartRate' && <Heart className="w-5 h-5" />}
                    {key === 'sleep' && <Clock className="w-5 h-5" />}
                    {key === 'water' && <Droplets className="w-5 h-5" />}
                    <span>{key.replace(/([A-Z])/g, ' $1')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Progress</span>
                      <span className="font-bold">
                        {goal.current} / {goal.target} {key === 'steps' ? 'steps' : key === 'sleep' ? 'hours' : key === 'water' ? 'glasses' : 'bpm'}
                      </span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-3" />
                    <div className="text-sm text-gray-600">
                      {Math.round((goal.current / goal.target) * 100)}% of daily goal
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Recent Measurements</span>
              </CardTitle>
              <CardDescription>Your health data from the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyTrends.heartRate.map((_, index) => {
                  const date = new Date();
                  date.setDate(date.getDate() - (6 - index));
                  return (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">{date.toLocaleDateString()}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <span className="text-red-600">{weeklyTrends.heartRate[index]} bpm</span>
                        <span className="text-blue-600">{weeklyTrends.respiratoryRate[index]} rpm</span>
                        <span className="text-orange-600">{weeklyTrends.temperature[index]}°F</span>
                        <span className="text-purple-600">
                          {weeklyTrends.bloodPressure[index].systolic}/{weeklyTrends.bloodPressure[index].diastolic}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Health Highlights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Heart rate within normal range</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Blood pressure optimal</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Temperature stable</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Continue regular exercise routine</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Maintain consistent sleep schedule</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Stay hydrated throughout the day</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthStats;

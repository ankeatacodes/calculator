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
  CheckCircle2
} from 'lucide-react';
import HeartRateChart from './HeartRateChart';

const HealthStats = ({ userHealthData }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  // Mock additional data for comprehensive health stats
  const healthGoals = {
    steps: { current: 8500, target: 10000 },
    heartRate: { current: 72, target: 70, range: '60-100' },
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

  const getVitalStatus = (value, normal, type) => {
    if (type === 'heartRate') {
      if (value >= 60 && value <= 100) return { status: 'normal', color: 'success', icon: CheckCircle2 };
      return { status: 'abnormal', color: 'destructive', icon: AlertCircle };
    }
    if (type === 'temperature') {
      if (value >= 97.0 && value <= 99.0) return { status: 'normal', color: 'success', icon: CheckCircle2 };
      return { status: 'abnormal', color: 'destructive', icon: AlertCircle };
    }
    if (type === 'respiratoryRate') {
      if (value >= 12 && value <= 20) return { status: 'normal', color: 'success', icon: CheckCircle2 };
      return { status: 'abnormal', color: 'destructive', icon: AlertCircle };
    }
    return { status: 'normal', color: 'success', icon: CheckCircle2 };
  };

  const getTrendIcon = (current, previous) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const currentVitals = userHealthData?.diagnosis_history?.[0] || {};

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Health Statistics</h1>
        <p className="text-xl text-gray-600">Comprehensive view of your vital signs and health metrics</p>
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

      {/* Current Vitals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Heart Rate */}
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="w-6 h-6 text-red-500" />
                <CardTitle className="text-lg">Heart Rate</CardTitle>
              </div>
              {(() => {
                const status = getVitalStatus(currentVitals.heart_rate?.value, null, 'heartRate');
                const StatusIcon = status.icon;
                return <StatusIcon className={`w-5 h-5 text-${status.color === 'success' ? 'green' : 'red'}-500`} />;
              })()}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-red-600">
                  {currentVitals.heart_rate?.value || 0}
                </span>
                <span className="text-sm text-gray-500">bpm</span>
                {weeklyTrends.heartRate.length > 1 && 
                  getTrendIcon(
                    weeklyTrends.heartRate[weeklyTrends.heartRate.length - 1],
                    weeklyTrends.heartRate[weeklyTrends.heartRate.length - 2]
                  )
                }
              </div>
              <Badge variant={currentVitals.heart_rate?.levels?.includes('Higher') ? 'destructive' : 'success'}>
                {currentVitals.heart_rate?.levels || 'Normal'}
              </Badge>
              <div className="text-xs text-gray-600">
                Normal range: 60-100 bpm
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Respiratory Rate */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="w-6 h-6 text-blue-500" />
                <CardTitle className="text-lg">Respiratory Rate</CardTitle>
              </div>
              {(() => {
                const status = getVitalStatus(currentVitals.respiratory_rate?.value, null, 'respiratoryRate');
                const StatusIcon = status.icon;
                return <StatusIcon className={`w-5 h-5 text-${status.color === 'success' ? 'green' : 'red'}-500`} />;
              })()}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-blue-600">
                  {currentVitals.respiratory_rate?.value || 0}
                </span>
                <span className="text-sm text-gray-500">rpm</span>
                {weeklyTrends.respiratoryRate.length > 1 && 
                  getTrendIcon(
                    weeklyTrends.respiratoryRate[weeklyTrends.respiratoryRate.length - 1],
                    weeklyTrends.respiratoryRate[weeklyTrends.respiratoryRate.length - 2]
                  )
                }
              </div>
              <Badge variant="success">
                {currentVitals.respiratory_rate?.levels || 'Normal'}
              </Badge>
              <div className="text-xs text-gray-600">
                Normal range: 12-20 rpm
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Temperature */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-6 h-6 text-orange-500" />
                <CardTitle className="text-lg">Temperature</CardTitle>
              </div>
              {(() => {
                const status = getVitalStatus(currentVitals.temperature?.value, null, 'temperature');
                const StatusIcon = status.icon;
                return <StatusIcon className={`w-5 h-5 text-${status.color === 'success' ? 'green' : 'red'}-500`} />;
              })()}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-orange-600">
                  {currentVitals.temperature?.value || 0}
                </span>
                <span className="text-sm text-gray-500">°F</span>
                {weeklyTrends.temperature.length > 1 && 
                  getTrendIcon(
                    weeklyTrends.temperature[weeklyTrends.temperature.length - 1],
                    weeklyTrends.temperature[weeklyTrends.temperature.length - 2]
                  )
                }
              </div>
              <Badge variant="success">
                {currentVitals.temperature?.levels || 'Normal'}
              </Badge>
              <div className="text-xs text-gray-600">
                Normal range: 97.0-99.0°F
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blood Pressure */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Gauge className="w-6 h-6 text-purple-500" />
                <CardTitle className="text-lg">Blood Pressure</CardTitle>
              </div>
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-purple-600">
                  {currentVitals.blood_pressure?.systolic?.value || 0}/
                  {currentVitals.blood_pressure?.diastolic?.value || 0}
                </span>
                <span className="text-sm text-gray-500">mmHg</span>
              </div>
              <Badge variant="success">
                {currentVitals.blood_pressure?.systolic?.levels || 'Normal'}
              </Badge>
              <div className="text-xs text-gray-600">
                Normal: &lt;120/80 mmHg
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Heart Rate Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>Heart Rate Trends</span>
                </CardTitle>
                <CardDescription>Past 6 months heart rate data</CardDescription>
              </CardHeader>
              <CardContent>
                {userHealthData && userHealthData.diagnosis_history && (
                  <HeartRateChart diagnosisHistory={userHealthData.diagnosis_history} />
                )}
              </CardContent>
            </Card>

            {/* Weekly Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Summary</CardTitle>
                <CardDescription>Average values for the past 7 days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Avg Heart Rate</span>
                    <span className="text-lg font-bold text-red-600">
                      {Math.round(weeklyTrends.heartRate.reduce((a, b) => a + b) / weeklyTrends.heartRate.length)} bpm
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Avg Respiratory Rate</span>
                    <span className="text-lg font-bold text-blue-600">
                      {Math.round(weeklyTrends.respiratoryRate.reduce((a, b) => a + b) / weeklyTrends.respiratoryRate.length)} rpm
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Avg Temperature</span>
                    <span className="text-lg font-bold text-orange-600">
                      {(weeklyTrends.temperature.reduce((a, b) => a + b) / weeklyTrends.temperature.length).toFixed(1)}°F
                    </span>
                  </div>
                </div>
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
                    <Target className="w-5 h-5" />
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

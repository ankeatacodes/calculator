import React, { useMemo } from 'react';
import { AlertTriangle, Shield, Activity, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const InjuryPredictor = ({ heartRate, respiratoryRate, exerciseData }) => {
    const riskAssessment = useMemo(() => {
        let riskScore = 0;
        let riskFactors = [];
        let recommendations = [];

        // Heart Rate Analysis
        if (heartRate > 100) {
            riskScore += 2;
            riskFactors.push("Elevated resting heart rate");
            recommendations.push("Consider cardio conditioning and stress management");
        } else if (heartRate < 60) {
            riskScore += 1;
            riskFactors.push("Low resting heart rate (could indicate overtraining)");
            recommendations.push("Monitor for signs of overtraining and ensure adequate rest");
        }

        // Respiratory Rate Analysis
        if (respiratoryRate > 20) {
            riskScore += 2;
            riskFactors.push("Elevated respiratory rate");
            recommendations.push("Focus on breathing exercises and relaxation techniques");
        } else if (respiratoryRate < 12) {
            riskScore += 1;
            riskFactors.push("Low respiratory rate");
            recommendations.push("Monitor breathing patterns during exercise");
        }

        // Exercise Pattern Analysis
        if (exerciseData && exerciseData.length > 0) {
            const recentExercises = exerciseData.slice(-7); // Last 7 sessions
            const highIntensityCount = recentExercises.filter(ex => ex.intensity === 'High').length;
            const totalDuration = recentExercises.reduce((sum, ex) => sum + ex.duration, 0);
            
            // Check for overtraining
            if (highIntensityCount > 4) {
                riskScore += 2;
                riskFactors.push("High frequency of intense workouts");
                recommendations.push("Include more rest days between intense sessions");
            }
            
            // Check for sudden increase in activity
            if (totalDuration > 300) { // More than 5 hours per week
                riskScore += 1;
                riskFactors.push("High exercise volume");
                recommendations.push("Gradually increase exercise duration to prevent injury");
            }
            
            // Check for lack of activity
            if (totalDuration < 60) { // Less than 1 hour per week
                riskScore += 1;
                riskFactors.push("Insufficient exercise volume");
                recommendations.push("Gradually increase exercise frequency for better health");
            }
        } else {
            riskScore += 2;
            riskFactors.push("No recent exercise data");
            recommendations.push("Start with light exercise and build gradually");
        }

        // Always add some positive recommendations
        if (riskScore <= 2) {
            recommendations.push("Maintain your current healthy routine");
            recommendations.push("Continue monitoring your vital signs regularly");
        }

        // Determine risk level
        let riskLevel, riskColor, riskIcon, bgColor;
        if (riskScore <= 2) {
            riskLevel = "Low";
            riskColor = "text-green-600";
            bgColor = "bg-green-50";
            riskIcon = <Shield className="w-8 h-8 text-green-600" />;
        } else if (riskScore <= 4) {
            riskLevel = "Moderate";
            riskColor = "text-yellow-600";
            bgColor = "bg-yellow-50";
            riskIcon = <Activity className="w-8 h-8 text-yellow-600" />;
        } else {
            riskLevel = "High";
            riskColor = "text-red-600";
            bgColor = "bg-red-50";
            riskIcon = <AlertTriangle className="w-8 h-8 text-red-600" />;
        }

        return {
            riskLevel,
            riskColor,
            riskIcon,
            riskScore,
            riskFactors,
            recommendations,
            bgColor
        };
    }, [heartRate, respiratoryRate, exerciseData]);

    const getProgressBarWidth = () => {
        const maxScore = 8; // Maximum possible risk score
        return Math.min((riskAssessment.riskScore / maxScore) * 100, 100);
    };

    const getProgressBarColor = () => {
        if (riskAssessment.riskLevel === "Low") return "bg-green-500";
        if (riskAssessment.riskLevel === "Moderate") return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div className="space-y-6">
            {/* Risk Level Display */}
            <Card className={`${riskAssessment.bgColor} border-2`}>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {riskAssessment.riskIcon}
                            <div>
                                <div className="text-lg font-semibold text-gray-800">Health Risk Level</div>
                                <div className={`text-3xl font-bold ${riskAssessment.riskColor}`}>
                                    {riskAssessment.riskLevel}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-600 font-medium">Risk Score</div>
                            <div className={`text-2xl font-bold ${riskAssessment.riskColor}`}>
                                {riskAssessment.riskScore}/8
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Risk Progress Bar */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Risk Assessment Scale</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between text-sm text-gray-600 mb-3">
                        <span className="font-medium">Low Risk</span>
                        <span className="font-medium">High Risk</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                        <div 
                            className={`h-4 rounded-full transition-all duration-700 ease-out shadow-sm ${getProgressBarColor()}`}
                            style={{ width: `${getProgressBarWidth()}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>0</span>
                        <span>2</span>
                        <span>4</span>
                        <span>6</span>
                        <span>8</span>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Risk Factors */}
                {riskAssessment.riskFactors.length > 0 && (
                    <Card className="border-red-200">
                        <CardHeader>
                            <CardTitle className="text-red-600 flex items-center space-x-2">
                                <AlertTriangle className="w-5 h-5" />
                                <span>Risk Factors</span>
                            </CardTitle>
                            <CardDescription>Areas that may increase your injury risk</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {riskAssessment.riskFactors.map((factor, index) => (
                                    <li key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-800 font-medium">{factor}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}

                {/* Recommendations */}
                <Card className="border-blue-200">
                    <CardHeader>
                        <CardTitle className="text-blue-600 flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5" />
                            <span>Recommendations</span>
                        </CardTitle>
                        <CardDescription>Personalized advice to improve your health</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {riskAssessment.recommendations.map((recommendation, index) => (
                                <li key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-800 font-medium">{recommendation}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* Current Vital Signs */}
            <Card className="bg-gradient-to-r from-gray-50 to-blue-50">
                <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center space-x-2">
                        <Activity className="w-5 h-5" />
                        <span>Current Vital Signs</span>
                    </CardTitle>
                    <CardDescription>Your latest health measurements</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                            <div>
                                <div className="text-sm font-medium text-gray-600">Heart Rate</div>
                                <div className="text-2xl font-bold text-red-600">{heartRate || 'N/A'}</div>
                            </div>
                            <div className="text-sm text-gray-500">bpm</div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                            <div>
                                <div className="text-sm font-medium text-gray-600">Respiratory Rate</div>
                                <div className="text-2xl font-bold text-blue-600">{respiratoryRate || 'N/A'}</div>
                            </div>
                            <div className="text-sm text-gray-500">rpm</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default InjuryPredictor;

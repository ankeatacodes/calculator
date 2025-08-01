import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const HealthScoreCard = ({ 
    title, 
    score, 
    maxScore = 100, 
    trend, 
    status, 
    description,
    icon: Icon,
    color = 'blue'
}) => {
    const percentage = (score / maxScore) * 100;
    
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'excellent': return 'bg-green-500';
            case 'good': return 'bg-blue-500';
            case 'fair': return 'bg-yellow-500';
            case 'poor': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const getTrendIcon = (trend) => {
        if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
        if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
        return <Minus className="w-4 h-4 text-gray-500" />;
    };

    const getColorClasses = (color) => {
        switch (color) {
            case 'red': return 'text-red-600 bg-red-50 border-red-200';
            case 'blue': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'green': return 'text-green-600 bg-green-50 border-green-200';
            case 'yellow': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'purple': return 'text-purple-600 bg-purple-50 border-purple-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    return (
        <Card className={`${getColorClasses(color)} transition-all hover:shadow-md`}>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {Icon && <Icon className={`w-6 h-6 ${color === 'red' ? 'text-red-500' : color === 'blue' ? 'text-blue-500' : color === 'green' ? 'text-green-500' : color === 'yellow' ? 'text-yellow-500' : 'text-purple-500'}`} />}
                        <div>
                            <CardTitle className="text-lg">{title}</CardTitle>
                            {description && (
                                <CardDescription className="text-sm">
                                    {description}
                                </CardDescription>
                            )}
                        </div>
                    </div>
                    {trend !== undefined && getTrendIcon(trend)}
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold">
                            {score}
                            <span className="text-lg text-gray-500 ml-1">/ {maxScore}</span>
                        </span>
                        {status && (
                            <Badge variant="secondary" className={`${getStatusColor(status)} text-white`}>
                                {status}
                            </Badge>
                        )}
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{Math.round(percentage)}%</span>
                        </div>
                        <Progress 
                            value={percentage} 
                            className={`h-2 ${color === 'red' ? '[&>div]:bg-red-500' : color === 'blue' ? '[&>div]:bg-blue-500' : color === 'green' ? '[&>div]:bg-green-500' : color === 'yellow' ? '[&>div]:bg-yellow-500' : '[&>div]:bg-purple-500'}`}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default HealthScoreCard;

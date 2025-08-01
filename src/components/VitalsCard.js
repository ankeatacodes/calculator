import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle2 } from 'lucide-react';

const VitalsCard = ({ 
    title, 
    value, 
    unit, 
    status, 
    normalRange, 
    trend, 
    icon: Icon, 
    color = 'blue',
    description 
}) => {
    const getTrendIcon = (trend) => {
        if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
        if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
        return <Minus className="w-4 h-4 text-gray-500" />;
    };

    const getStatusIcon = (status) => {
        if (status?.toLowerCase().includes('normal') || status?.toLowerCase().includes('good')) {
            return <CheckCircle2 className="w-5 h-5 text-green-500" />;
        }
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    };

    const getStatusBadge = (status) => {
        if (status?.toLowerCase().includes('normal') || status?.toLowerCase().includes('good')) {
            return <Badge variant="secondary" className="bg-green-100 text-green-800">Normal</Badge>;
        }
        if (status?.toLowerCase().includes('high') || status?.toLowerCase().includes('elevated')) {
            return <Badge variant="secondary" className="bg-red-100 text-red-800">High</Badge>;
        }
        if (status?.toLowerCase().includes('low')) {
            return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Low</Badge>;
        }
        return <Badge variant="secondary">{status}</Badge>;
    };

    const getColorClasses = (color) => {
        switch (color) {
            case 'red': return 'bg-gradient-to-br from-red-50 to-red-100 border-red-200';
            case 'blue': return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200';
            case 'green': return 'bg-gradient-to-br from-green-50 to-green-100 border-green-200';
            case 'yellow': return 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200';
            case 'purple': return 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200';
            case 'orange': return 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200';
            default: return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200';
        }
    };

    const getValueColor = (color) => {
        switch (color) {
            case 'red': return 'text-red-600';
            case 'blue': return 'text-blue-600';
            case 'green': return 'text-green-600';
            case 'yellow': return 'text-yellow-600';
            case 'purple': return 'text-purple-600';
            case 'orange': return 'text-orange-600';
            default: return 'text-gray-600';
        }
    };

    const getIconColor = (color) => {
        switch (color) {
            case 'red': return 'text-red-500';
            case 'blue': return 'text-blue-500';
            case 'green': return 'text-green-500';
            case 'yellow': return 'text-yellow-500';
            case 'purple': return 'text-purple-500';
            case 'orange': return 'text-orange-500';
            default: return 'text-gray-500';
        }
    };

    return (
        <Card className={`${getColorClasses(color)} transition-all hover:shadow-md`}>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {Icon && <Icon className={`w-6 h-6 ${getIconColor(color)}`} />}
                        <CardTitle className="text-lg">{title}</CardTitle>
                    </div>
                    {getStatusIcon(status)}
                </div>
                {description && (
                    <CardDescription className="text-sm">
                        {description}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <div className="flex items-baseline space-x-2">
                        <span className={`text-3xl font-bold ${getValueColor(color)}`}>
                            {value || 0}
                        </span>
                        <span className="text-sm text-gray-500">{unit}</span>
                        {trend !== undefined && getTrendIcon(trend)}
                    </div>
                    
                    <div className="flex items-center justify-between">
                        {getStatusBadge(status)}
                    </div>
                    
                    {normalRange && (
                        <div className="text-xs text-gray-600">
                            Normal range: {normalRange}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default VitalsCard;

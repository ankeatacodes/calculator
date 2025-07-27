import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Heart, 
  Activity, 
  Target,
  Settings,
  Bell,
  Shield
} from 'lucide-react';

const ProfilePage = ({ userHealthData }) => {
  const user = userHealthData || {};

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-xl text-gray-600">Manage your personal information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Personal Information</span>
              </CardTitle>
              <CardDescription>Your basic profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={user.profile_picture || "/api/placeholder/80/80"}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{user.name || 'User Name'}</h3>
                  <p className="text-gray-600">{user.gender}, {user.age} years old</p>
                  <Badge variant="outline" className="mt-2">Active User</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">Email</span>
                  </div>
                  <p className="font-medium">jessica.taylor@email.com</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">Phone</span>
                  </div>
                  <p className="font-medium">+1 (555) 123-4567</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Date of Birth</span>
                  </div>
                  <p className="font-medium">{user.date_of_birth || 'March 15, 1995'}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Location</span>
                  </div>
                  <p className="font-medium">New York, NY</p>
                </div>
              </div>

              <Button className="w-full md:w-auto">Edit Profile</Button>
            </CardContent>
          </Card>

          {/* Health Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Health Profile</span>
              </CardTitle>
              <CardDescription>Your health information and emergency contacts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">5'6"</div>
                  <div className="text-sm text-gray-600">Height</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">140 lbs</div>
                  <div className="text-sm text-gray-600">Weight</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">A+</div>
                  <div className="text-sm text-gray-600">Blood Type</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Medical Conditions</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">No known allergies</Badge>
                  <Badge variant="outline">No medications</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Emergency Contact</h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">John Taylor (Brother)</p>
                  <p className="text-sm text-gray-600">+1 (555) 987-6543</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Health Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Health Goals</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Daily Steps</span>
                  <span className="text-sm font-medium">10,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Weekly Exercise</span>
                  <span className="text-sm font-medium">5 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Sleep Target</span>
                  <span className="text-sm font-medium">8 hours</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Update Goals
              </Button>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Privacy
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Activity className="w-4 h-4 mr-2" />
                Data Export
              </Button>
            </CardContent>
          </Card>

          {/* App Stats */}
          <Card>
            <CardHeader>
              <CardTitle>App Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Member since</span>
                <span className="text-sm font-medium">Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total workouts</span>
                <span className="text-sm font-medium">127</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Health checks</span>
                <span className="text-sm font-medium">45</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

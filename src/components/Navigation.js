import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, TrendingUp, User, Settings } from 'lucide-react';
import testLogo from '../assets/TestLogo.png';
import { Button } from './ui/button';

const Navigation = () => {
    const location = useLocation();

    return (
        <div className="p-[18px]">
            <nav className="w-[100%] bg-white rounded-[70px] flex items-center justify-between px-6 py-2 shadow-sm">
                <div className="flex items-center space-x-8">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center">
                            <img src={testLogo} alt="HealthTracker" className="h-8" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <NavItem icon={<Home size={20} />} label="Home" to="/" isActive={location.pathname === '/'} />
                    <NavItem icon={<Activity size={20} />} label="Health Stats" to="/health-stats" isActive={location.pathname === '/health-stats'} />
                    <NavItem icon={<TrendingUp size={20} />} label="Activity" to="/activity" isActive={location.pathname === '/activity'} />
                    <NavItem icon={<TrendingUp size={20} />} label="Predictions" to="/predictions" isActive={location.pathname === '/predictions'} />
                    <NavItem icon={<User size={20} />} label="Profile" to="/profile" isActive={location.pathname === '/profile'} />
                </div>

                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                        <Settings size={20} />
                    </Button>
                </div>
            </nav>
        </div>
    );
};

const NavItem = ({ icon, label, to, isActive }) => {
    return (
        <Link to={to}>
            <Button
                variant={isActive ? "default" : "ghost"}
                className={`flex items-center space-x-2 ${isActive ? 'bg-[#01F0D0] text-black hover:bg-[#01F0D0]/90' : ''}`}
            >
                {icon}
                <span className='font-bold'>{label}</span>
            </Button>
        </Link>
    );
};

export default Navigation;
import React from 'react';
import { Coffee } from 'lucide-react';

interface AdminHeaderProps {
    onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onLogout }) => {
    return (
        <div className="bg-white shadow-sm border-b border-teamax-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white border border-black rounded-xl">
                            <Coffee className="h-6 w-6 text-black" />
                        </div>
                        <h1 className="text-xl font-serif font-bold text-black">WebNegosyo Admin Dashboard</h1>
                    </div>
                    <div className="flex items-center space-x-6">
                        <a
                            href="/"
                            className="text-[10px] font-bold uppercase tracking-widest text-black hover:text-black transition-colors duration-200"
                        >
                            View Website
                        </a>
                        <button
                            onClick={onLogout}
                            className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;

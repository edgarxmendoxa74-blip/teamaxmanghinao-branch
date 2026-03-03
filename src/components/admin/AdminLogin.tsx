import React from 'react';
import { Lock } from 'lucide-react';

interface AdminLoginProps {
    password: string;
    loginError: string;
    setPassword: (password: string) => void;
    onLogin: (e: React.FormEvent) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ password, loginError, setPassword, onLogin }) => {
    return (
        <div className="min-h-screen bg-teamax-dark flex items-center justify-center">
            <div className="bg-teamax-surface rounded-3xl shadow-2xl p-8 w-full max-w-md border border-teamax-border">
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-white border border-black rounded-full flex items-center justify-center mb-4">
                        <Lock className="h-8 w-8 text-black" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-black">Admin Access</h1>
                    <p className="text-black mt-2">Enter password to access the admin dashboard</p>
                </div>

                <form onSubmit={onLogin}>
                    <div className="mb-6">
                        <label htmlFor="admin-password" title="Admin Password" className="block text-xs font-bold text-black uppercase tracking-widest mb-2 px-1">Password</label>
                        <input
                            id="admin-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-teamax-border rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
                            placeholder="Enter admin password"
                            required
                        />
                        {loginError && (
                            <p className="text-red-500 text-sm mt-2">{loginError}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-black border border-black py-4 rounded-xl hover:brightness-110 transition-all font-bold uppercase tracking-widest text-xs shadow-lg shadow-black/20"
                    >
                        Access Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { mockUsers } from '../data/mockData';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useNotification } from '../hooks/useNotification';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '../components/Logo';

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const { showToast } = useNotification();
    const [username, setUsername] = useState('reg_admin');
    const [password, setPassword] = useState('password123');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const userToLogin = mockUsers.find(u => u.username === username);

        // In a real app, you'd send this to a server for verification.
        // Here we just check mock data. Only the first user has a checked password.
        if (userToLogin && (userToLogin.password ? userToLogin.password === password : true)) {
            showToast('Login successful!');
            login(userToLogin);
        } else {
            setError('Invalid username or password.');
            showToast('Invalid username or password.', 'error');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-primary-900">
            <Card className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Logo />
                    <p className="mt-4 text-gray-600">Church Management System</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          placeholder="e.g. reg_admin"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              placeholder="e.g. password123"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;
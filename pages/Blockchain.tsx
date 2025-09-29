import React from 'react';
import { Box, DollarSign } from 'lucide-react';
import { blockchainTransactions } from '../constants';

const Blockchain: React.FC = () => (
    <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 flex items-center">
                <Box size={24} className="mr-3 text-blue-500" /> Deeper Life Chain (DLC)
            </h1>
            <span className="text-sm bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-3 py-1 rounded-full font-medium">Network: Mainnet ● Healthy</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border-l-4 border-blue-500">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-200">1,284,932</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border-l-4 border-green-500">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Volume (USD)</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-200">$45.8M</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border-l-4 border-purple-500">
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Wallets</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-200">2.1M</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border-l-4 border-orange-500">
                <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Gas Fee</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-200">$0.02</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 p-5 border-b border-gray-200 dark:border-gray-700">Live Transactions</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tx Hash</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">From</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">To</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount (USD)</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {blockchainTransactions.map((tx, i) => (
                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="px-5 py-4 whitespace-nowrap text-sm font-mono text-blue-600 dark:text-blue-400 truncate max-w-xs">{tx.txHash}</td>
                                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{tx.from}</td>
                                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{tx.to}</td>
                                    <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-green-600 dark:text-green-400">${tx.amount.toFixed(2)}</td>
                                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{tx.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">Make a Donation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Support the ministry with a secure, transparent donation on the Deeper Life Chain.</p>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount (USD)</label>
                        <input type="number" placeholder="50.00" className="w-full mt-1 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg px-3 py-2" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Fund</label>
                        <select className="w-full mt-1 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg px-3 py-2">
                            <option>Tithe & Offering</option>
                            <option>GCK Missions Fund</option>
                            <option>Building Project</option>
                            <option>Welfare</option>
                        </select>
                    </div>
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                        <DollarSign size={16} className="inline mr-2" /> Donate Securely
                    </button>
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">Transactions are transparent and immutable.</p>
                </div>
            </div>
        </div>
    </div>
);

export default Blockchain;
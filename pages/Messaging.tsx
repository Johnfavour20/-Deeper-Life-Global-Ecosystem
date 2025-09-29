
import React from 'react';
import Card from '../components/ui/Card';
import { LockIcon } from '../components/icons';

const Messaging: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Secure Messaging</h1>
            <Card>
                <div className="flex flex-col h-[70vh]">
                    <div className="bg-primary-50 p-4 border-b border-gray-200 text-center">
                        <p className="font-semibold">Pastor John Doe (State Overseer)</p>
                        <div className="flex items-center justify-center text-xs text-green-600 mt-1">
                            <LockIcon className="w-3 h-3 mr-1" />
                            <span>End-to-end Encrypted</span>
                        </div>
                    </div>
                    <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                        {/* Chat messages */}
                        <div className="flex justify-end">
                            <div className="bg-primary-700 text-white rounded-lg p-3 max-w-xs">
                                Good morning Pastor, please be reminded of the leadership meeting at 2 PM.
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="bg-gray-200 text-gray-800 rounded-lg p-3 max-w-xs">
                                Noted. I will be there. Thank you.
                            </div>
                        </div>
                         <div className="flex justify-end">
                            <div className="bg-primary-700 text-white rounded-lg p-3 max-w-xs">
                                Also, the reports from the regional overseers are ready for your review. I've sent them to your private archive.
                            </div>
                        </div>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center">
                            <input type="text" placeholder="Type an encrypted message..." className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500" />
                            <button className="ml-4 p-2 bg-primary-700 text-white rounded-full hover:bg-primary-800">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Messaging;

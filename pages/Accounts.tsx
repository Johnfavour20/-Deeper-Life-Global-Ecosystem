
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { mockAccounts } from '../data/mockData';
import { AccountDetail } from '../types';

const Accounts: React.FC = () => {
    const [accountDetails] = useState<AccountDetail[]>(mockAccounts);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Church Account Details</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accountDetails.map((account) => (
                  <Card key={account.id}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">{account.account_type.replace('_', ' ')} Account</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account Name:</span>
                        <span className="font-medium text-gray-900">{account.account_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account Number:</span>
                        <span className="font-medium text-gray-900">{account.account_number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bank Name:</span>
                        <span className="font-medium text-gray-900">{account.bank_name}</span>
                      </div>
                      {account.sort_code && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sort Code:</span>
                          <span className="font-medium text-gray-900">{account.sort_code}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
            </div>
        </div>
    );
};

export default Accounts;

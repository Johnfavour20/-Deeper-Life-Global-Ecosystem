
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import FileUpload from '../components/ui/FileUpload';
import { useNotification } from '../hooks/useNotification';
import { mockPayments, mockAccounts } from '../data/mockData';
import { PaymentRecord, AccountDetail } from '../types';
import { Plus, Eye } from 'lucide-react';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};

const initialFormState = {
    date: '',
    payment_type: 'tithe' as PaymentRecord['payment_type'],
    amount: '',
    description: '',
    account_details: '',
    receipt_data: null as string | null,
    receipt_filename: null as string | null
};

const Payments: React.FC = () => {
    const [paymentData, setPaymentData] = useState<PaymentRecord[]>(mockPayments);
    const [accountDetails] = useState<AccountDetail[]>(mockAccounts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState(initialFormState);
    const { showToast } = useNotification();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRecord: PaymentRecord = {
            id: `pay-${Date.now()}`,
            date: formState.date,
            payment_type: formState.payment_type,
            amount: parseFloat(formState.amount),
            description: formState.description,
            account_details: formState.account_details,
            receipt_path: formState.receipt_filename ? `/receipts/${formState.receipt_filename}` : undefined,
        };
        
        setPaymentData(prev => [newRecord, ...prev]);
        showToast('Payment recorded successfully!');
        setIsModalOpen(false);
        setFormState(initialFormState);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Payment Records</h1>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-5 h-5 inline-block mr-1" /> New Payment
                </Button>
            </div>
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Receipt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentData.map((record) => (
                              <tr key={record.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{formatDate(record.date)}</td>
                                <td className="px-6 py-4 capitalize">{record.payment_type.replace('_', ' ')}</td>
                                <td className="px-6 py-4 font-semibold">{formatCurrency(record.amount)}</td>
                                <td className="px-6 py-4">{record.description || '-'}</td>
                                <td className="px-6 py-4">
                                  {record.receipt_path ? (
                                    <Button variant="ghost" size="sm" className="flex items-center text-primary-700">
                                        <Eye className="w-4 h-4 mr-1" /> View
                                    </Button>
                                  ) : (
                                    <span className="text-gray-400">None</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record New Payment">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Payment Date</label>
                            <input type="date" name="date" value={formState.date} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Amount</label>
                            <input type="number" name="amount" value={formState.amount} onChange={handleInputChange} min="1" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Payment Type</label>
                            <select name="payment_type" value={formState.payment_type} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                                <option value="tithe">Tithe</option>
                                <option value="offering">Offering</option>
                                <option value="building_fund">Building Fund</option>
                                <option value="generator_fund">Generator Fund</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Account Deposited</label>
                            <select name="account_details" value={formState.account_details} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                                <option value="">Select Account</option>
                                {accountDetails.map(acc => <option key={acc.id} value={`${acc.account_name} - ${acc.account_number}`}>{acc.account_name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="description" value={formState.description} onChange={handleInputChange} rows={2} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"/>
                    </div>
                    <FileUpload onFileSelect={(file) => setFormState(prev => ({...prev, receipt_data: file.data, receipt_filename: file.name}))} />
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Record Payment</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Payments;

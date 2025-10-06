import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import FileUpload from '../components/ui/FileUpload';
import { useNotification } from '../hooks/useNotification';
import { mockFinancials, mockPayments, mockAccounts, mockProjects } from '../data/mockData';
import { Box as BlockchainIcon } from 'lucide-react';
import { PaymentRecord, AccountDetail, Project } from '../types';
import { Plus, Eye } from 'lucide-react';

// --- Tab Components ---

const LedgerTab: React.FC = () => (
    <Card className="!p-0">
        <div className="flex items-center p-4 m-6 mb-0 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 rounded-md">
            <BlockchainIcon className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" />
            <div>
                <h4 className="font-semibold text-green-800 dark:text-green-300">Immutable Financial Ledger</h4>
                <p className="text-sm text-green-700 dark:text-green-400">All financial contributions are recorded on the blockchain to ensure tamper-proof records and complete transparency.</p>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Member</th>
                        <th scope="col" className="px-6 py-3">Type</th>
                        <th scope="col" className="px-6 py-3 text-right">Amount</th>
                        <th scope="col" className="px-6 py-3">Blockchain TxID</th>
                    </tr>
                </thead>
                <tbody>
                    {mockFinancials.map(record => (
                        <tr key={record.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{record.member}</td>
                            <td className="px-6 py-4">{record.type}</td>
                            <td className="px-6 py-4 text-right font-semibold text-gray-800 dark:text-gray-200">${record.amount.toLocaleString()}</td>
                            <td className="px-6 py-4 font-mono text-xs truncate max-w-xs" title={record.transactionId}>{record.transactionId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
);

const PaymentsTab: React.FC = () => {
    const [paymentData, setPaymentData] = useState<PaymentRecord[]>(mockPayments);
    const [accountDetails] = useState<AccountDetail[]>(mockAccounts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState({
        date: '',
        payment_type: 'tithe' as PaymentRecord['payment_type'],
        amount: '',
        description: '',
        account_details: '',
        receipt_data: null as string | null,
        receipt_filename: null as string | null
    });
    const { showToast } = useNotification();
    const initialFormState = { date: '', payment_type: 'tithe' as PaymentRecord['payment_type'], amount: '', description: '', account_details: '', receipt_data: null, receipt_filename: null };


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
    
    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-5 h-5 inline-block mr-1" /> New Payment
                </Button>
            </div>
            <Card className="!p-0">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                              <tr key={record.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{formatDate(record.date)}</td>
                                <td className="px-6 py-4 capitalize whitespace-nowrap">{record.payment_type.replace('_', ' ')}</td>
                                <td className="px-6 py-4 font-semibold">{formatCurrency(record.amount)}</td>
                                <td className="px-6 py-4">{record.description || '-'}</td>
                                <td className="px-6 py-4">
                                  {record.receipt_path ? (
                                    <Button variant="ghost" size="sm" className="flex items-center text-primary-600 dark:text-primary-400">
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Payment Date</label>
                            <input type="date" name="date" value={formState.date} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                            <input type="number" name="amount" value={formState.amount} onChange={handleInputChange} min="1" required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Payment Type</label>
                            <select name="payment_type" value={formState.payment_type} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent">
                                <option value="tithe">Tithe</option>
                                <option value="offering">Offering</option>
                                <option value="building_fund">Building Fund</option>
                                <option value="generator_fund">Generator Fund</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Account Deposited</label>
                            <select name="account_details" value={formState.account_details} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent">
                                <option value="">Select Account</option>
                                {accountDetails.map(acc => <option key={acc.id} value={`${acc.account_name} - ${acc.account_number}`}>{acc.account_name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <textarea name="description" value={formState.description} onChange={handleInputChange} rows={2} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
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

const ProjectsTab: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState({ project_name: '', target_amount: '', start_date: '' });
    const { showToast } = useNotification();
    const initialFormState = { project_name: '', target_amount: '', start_date: '' };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProject: Project = {
            id: `proj-${Date.now()}`,
            project_name: formState.project_name,
            target_amount: parseFloat(formState.target_amount),
            start_date: formState.start_date,
            current_amount: 0,
            status: 'active',
        };
        
        setProjects(prev => [newProject, ...prev]);
        showToast('Project created successfully!');
        setIsModalOpen(false);
        setFormState(initialFormState);
    };

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-5 h-5 inline-block mr-1" /> Add Project
                </Button>
            </div>
            <Card className="!p-0">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">Project Name</th>
                                <th className="px-6 py-3">Target Amount</th>
                                <th className="px-6 py-3">Current Amount</th>
                                <th className="px-6 py-3">Start Date</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                              <tr key={project.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{project.project_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(project.target_amount)}</td>
                                <td className="px-6 py-4 font-semibold whitespace-nowrap">{formatCurrency(project.current_amount)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{formatDate(project.start_date)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize whitespace-nowrap ${
                                        project.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 
                                        project.status === 'completed' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {project.status.replace('_', ' ')}
                                    </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
             <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Project">
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Name</label>
                        <input type="text" value={formState.project_name} onChange={(e) => setFormState({...formState, project_name: e.target.value})} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Target Amount</label>
                        <input type="number" value={formState.target_amount} onChange={(e) => setFormState({...formState, target_amount: e.target.value})} min="1" required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                        <input type="date" value={formState.start_date} onChange={(e) => setFormState({...formState, start_date: e.target.value})} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Add Project</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

const AccountsTab: React.FC = () => {
    const [accountDetails] = useState<AccountDetail[]>(mockAccounts);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accountDetails.map((account) => (
                <Card key={account.id} className="dark:bg-gray-800">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 capitalize">{account.account_type.replace('_', ' ')} Account</h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Account Name:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-50">{account.account_name}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Account Number:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-50">{account.account_number}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Bank Name:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-50">{account.bank_name}</span>
                    </div>
                    {account.sort_code && (
                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Sort Code:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-50">{account.sort_code}</span>
                    </div>
                    )}
                </div>
                </Card>
            ))}
        </div>
    );
};

// --- Main Financials Component ---

type FinancialsTab = 'ledger' | 'payments' | 'projects' | 'accounts';

const Financials: React.FC = () => {
    const [activeTab, setActiveTab] = useState<FinancialsTab>('ledger');

    const renderContent = () => {
        switch (activeTab) {
            case 'ledger': return <LedgerTab />;
            case 'payments': return <PaymentsTab />;
            case 'projects': return <ProjectsTab />;
            case 'accounts': return <AccountsTab />;
            default: return <LedgerTab />;
        }
    };
    
    const TabButton: React.FC<{tabName: FinancialsTab, label: string}> = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 focus:outline-none ${
                activeTab === tabName
                    ? 'border-b-2 border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-50">Financial Management</h1>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                    <TabButton tabName="ledger" label="Ledger" />
                    <TabButton tabName="payments" label="Payments" />
                    <TabButton tabName="projects" label="Projects" />
                    <TabButton tabName="accounts" label="Accounts" />
                </nav>
            </div>
            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default Financials;
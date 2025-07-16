import { useState, useEffect } from 'react';
import { Plus, Edit, Download, Search, Sun, Moon, Users } from 'lucide-react';
import StaffForm from './components/StaffForm';
import StaffTable from './components/StaffTable';
import StatsCards from './components/StatsCards';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { exportToExcel } from './utils/exportToExcel';

function App() {
  const [staff, setStaff] = useLocalStorage('staffData', []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme, toggleTheme } = useTheme();

  // Generate unique ID for new staff
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleAddStaff = (staffData) => {
    const newStaff = {
      ...staffData,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    setStaff(prev => [...prev, newStaff]);
  };

  const handleEditStaff = (staffData) => {
    setStaff(prev => prev.map(member => 
      member.id === staffData.id 
        ? { ...staffData, updatedAt: new Date().toISOString() }
        : member
    ));
    setEditingStaff(null);
  };

  const handleDeleteStaff = (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      setStaff(prev => prev.filter(member => member.id !== id));
    }
  };

  const openEditForm = (staffMember) => {
    setEditingStaff(staffMember);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingStaff(null);
  };

  const handleFormSubmit = (staffData) => {
    if (editingStaff) {
      handleEditStaff(staffData);
    } else {
      handleAddStaff(staffData);
    }
  };

  const handleExport = () => {
    if (staff.length === 0) {
      alert('No data to export!');
      return;
    }
    exportToExcel(staff);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Staff Management System
                </h1>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-600" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500" />
                )}
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <StatsCards staff={staff} />

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsFormOpen(true)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Add Staff</span>
              </button>
              
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                disabled={staff.length === 0}
              >
                <Download className="w-4 h-4" />
                <span>Export to Excel</span>
              </button>

              <div className="flex items-center space-x-2 ml-auto">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search staff..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white w-80"
                />
              </div>
            </div>

            {/* Staff Table */}
            <StaffTable
              staff={staff}
              onEdit={openEditForm}
              onDelete={handleDeleteStaff}
              searchTerm={searchTerm}
            />
          </div>
        </div>
      </div>

      {/* Staff Form Modal */}
      <StaffForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
        editingStaff={editingStaff}
      />
    </div>
  );
}

export default App;
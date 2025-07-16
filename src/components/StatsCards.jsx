import { Users, UserCheck, UserX, Clock } from 'lucide-react';

const StatsCards = ({ staff }) => {
  const totalStaff = staff.length;
  const activeStaff = staff.filter(member => member.status === 'Active').length;
  const relievedStaff = staff.filter(member => member.status === 'Relieved').length;
  
  const lastAdded = staff.length > 0 
    ? staff.reduce((latest, current) => 
        new Date(current.dateOfJoining) > new Date(latest.dateOfJoining) ? current : latest
      )
    : null;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const stats = [
    {
      title: 'Total Staff',
      value: totalStaff,
      icon: Users,
      color: 'bg-blue-600',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Staff',
      value: activeStaff,
      icon: UserCheck,
      color: 'bg-green-600',
      textColor: 'text-green-600'
    },
    {
      title: 'Relieved Staff',
      value: relievedStaff,
      icon: UserX,
      color: 'bg-red-500',
      textColor: 'text-red-500'
    },
    {
      title: lastAdded ? lastAdded.name : 'No Staff',
      value: lastAdded ? `Last Added (${formatDate(lastAdded.dateOfJoining)})` : 'Add your first staff member',
      icon: Clock,
      color: 'bg-purple-600',
      textColor: 'text-purple-600',
      isSpecial: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </h3>
              </div>
              {stat.isSpecial ? (
                <div className="space-y-1">
                  <div className="text-lg font-bold text-gray-900 dark:text-white truncate">
                    {lastAdded ? lastAdded.name : 'No Staff'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.value}
                  </div>
                </div>
              ) : (
                <div className={`text-3xl font-bold ${stat.textColor} dark:text-white`}>
                  {stat.value}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
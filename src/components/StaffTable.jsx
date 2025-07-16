import { Edit, Trash2, Eye } from 'lucide-react';

const StaffTable = ({ staff, onEdit, onDelete, searchTerm }) => {
  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse border border-gray-300 dark:border-gray-600 text-sm">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
          <tr>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-600 font-semibold">Sr. No</th>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-600 font-semibold">Staff ID</th>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-600 font-semibold">Name</th>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-600 font-semibold">Mobile No</th>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-600 font-semibold">Email ID</th>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-600 font-semibold">Type</th>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-600 font-semibold">PAN Card</th>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-600 font-semibold">Aadhaar Card</th>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-600 font-semibold">Designation</th>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-600 font-semibold">Qualifications</th>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-600 font-semibold">Experience</th>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-600 font-semibold">Date of Joining</th>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-600 font-semibold">Date of Relieving</th>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-600 font-semibold">Status</th>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-600 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaff.length === 0 ? (
            <tr>
              <td colSpan="15" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600">
                {searchTerm ? 'No staff members found matching your search.' : 'No staff members added yet.'}
              </td>
            </tr>
          ) : (
            filteredStaff.map((member, index) => (
              <tr key={member.id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  {index + 1}
                </td>
                <td className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-medium">
                  {member.staffId}
                </td>
                <td className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  {member.name}
                </td>
                <td className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  {member.mobile}
                </td>
                <td className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  {member.email}
                </td>
                <td className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    member.type === 'Teaching' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  }`}>
                    {member.type}
                  </span>
                </td>
                <td className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  {member.panCard || '-'}
                </td>
                <td className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  {member.aadhaarCard || '-'}
                </td>
                <td className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  {member.designation}
                </td>
                <td className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  {member.qualifications || '-'}
                </td>
                <td className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  {member.experienceYears || 0}Y {member.experienceMonths || 0}M
                </td>
                <td className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  {formatDate(member.dateOfJoining)}
                </td>
                <td className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  {formatDate(member.dateOfRelieving)}
                </td>
                <td className="px-4 py-3 border border-gray-300 dark:border-gray-600">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    member.status === 'Active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-4 py-3 border border-gray-300 dark:border-gray-600">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(member)}
                      className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(member.id)}
                      className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;
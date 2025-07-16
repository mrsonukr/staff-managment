export const exportToExcel = (staff) => {
  const headers = [
    'Sr. No',
    'Staff ID',
    'Name',
    'Mobile No',
    'Email ID',
    'Teaching/Non-Teaching',
    'PAN Card',
    'Aadhaar Card',
    'Designation',
    'Qualifications',
    'Experience (Years)',
    'Experience (Months)',
    'Date of Joining',
    'Date of Relieving',
    'Status'
  ];

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const csvContent = [
    headers.join(','),
    ...staff.map((member, index) => [
      index + 1,
      member.staffId,
      `"${member.name}"`,
      member.mobile,
      member.email,
      member.type,
      member.panCard || '-',
      member.aadhaarCard || '-',
      `"${member.designation}"`,
      `"${member.qualifications || '-'}"`,
      member.experienceYears || 0,
      member.experienceMonths || 0,
      formatDate(member.dateOfJoining),
      formatDate(member.dateOfRelieving),
      member.status
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `staff_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
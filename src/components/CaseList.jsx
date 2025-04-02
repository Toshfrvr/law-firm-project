// src/components/CaseList.jsx
import React from 'react';

// Generating 50 dummy cases for the table
const generateDummyData = () => {
  const statuses = ["Open", "Closed", "In Progress"];
  const caseTypes = ["Criminal", "Civil", "Family", "Corporate", "Property"];
  const dummyData = [];

  for (let i = 1; i <= 50; i++) {
    dummyData.push({
      id: i,
      clientName: `Client ${i}`,
      caseType: caseTypes[i % caseTypes.length],
      status: statuses[i % statuses.length],
      date: `2025-04-${String(i % 30 + 1).padStart(2, '0')}`,
      lawyer: `Lawyer ${i % 5 + 1}`,
    });
  }
  return dummyData;
};

const cases = generateDummyData();

const CaseList = () => {
  const caseStatuses = ["Open", "Closed", "In Progress"];
  return (
    <div className="p-8 space-y-8">
      {/* Case Status Cards */}
      <div className="grid grid-cols-3 gap-4">
        {caseStatuses.map((status, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center"
          >
            <h3 className="text-xl font-semibold">{status} Cases</h3>
            <span className="text-3xl font-bold">{cases.filter(c => c.status === status).length}</span>
          </div>
        ))}
      </div>

      {/* Case Table */}
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">All Cases</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Case ID</th>
              <th className="px-4 py-2 text-left">Client Name</th>
              <th className="px-4 py-2 text-left">Case Type</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Lawyer</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((caseItem) => (
              <tr key={caseItem.id} className="border-b">
                <td className="px-4 py-2">{caseItem.id}</td>
                <td className="px-4 py-2">{caseItem.clientName}</td>
                <td className="px-4 py-2">{caseItem.caseType}</td>
                <td className="px-4 py-2">{caseItem.status}</td>
                <td className="px-4 py-2">{caseItem.date}</td>
                <td className="px-4 py-2">{caseItem.lawyer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaseList;

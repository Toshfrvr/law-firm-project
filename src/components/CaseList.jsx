import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import CaseForm from "./CaseForm";

export default function CaseList({ cases, userRole, fetchCases }) {
  const [editingCase, setEditingCase] = useState(null);
  const [clients, setClients] = useState({});

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data, error } = await supabase.from("clients").select("id, name");
    if (error) console.error("Error fetching clients:", error.message);
    else {
      const clientMap = data.reduce((acc, client) => {
        acc[client.id] = client.name;
        return acc;
      }, {});
      setClients(clientMap);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">Cases</h2>
      <ul className="divide-y divide-gray-200">
        {cases.length === 0 ? (
          <p>No cases available</p>
        ) : (
          cases.map((caseItem) => (
            <li key={caseItem.id} className="p-4 border rounded-lg shadow-sm mb-2">
              <h3 className="text-lg font-bold">{caseItem.title}</h3>
              <p>{caseItem.description}</p>
              <p>Status: <span className="font-semibold">{caseItem.status}</span></p>
              <p>Client: <span className="font-semibold">{clients[caseItem.client_id] || "Unassigned"}</span></p>

              {(userRole === "admin" || userRole === "lawyer") && (
                <button
                  className="mt-2 mr-2 px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={() => setEditingCase(caseItem)}
                >
                  Edit Case
                </button>
              )}

              {userRole === "admin" && (
                <button
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
                  onClick={() => handleDelete(caseItem.id)}
                >
                  Delete
                </button>
              )}
            </li>
          ))
        )}
      </ul>

      {editingCase && (
        <CaseForm
          fetchCases={fetchCases}
          editingCase={editingCase}
          setEditingCase={setEditingCase}
        />
      )}
    </div>
  );
}

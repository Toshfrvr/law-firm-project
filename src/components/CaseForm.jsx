import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function CaseForm({ fetchCases, editingCase, setEditingCase }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");
  const [clientId, setClientId] = useState("");
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
    if (editingCase) {
      setTitle(editingCase.title);
      setDescription(editingCase.description);
      setStatus(editingCase.status);
      setClientId(editingCase.client_id || "");
    }
  }, [editingCase]);

  const fetchClients = async () => {
    const { data, error } = await supabase.from("clients").select("id, name");
    if (error) console.error("Error fetching clients:", error.message);
    else setClients(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const caseData = { title, description, status, client_id: clientId || null };

    if (editingCase) {
      // Update existing case
      const { error } = await supabase.from("cases").update(caseData).eq("id", editingCase.id);
      if (error) console.error("Error updating case:", error.message);
    } else {
      // Create new case
      const { error } = await supabase.from("cases").insert([caseData]);
      if (error) console.error("Error creating case:", error.message);
    }

    fetchCases();
    setTitle("");
    setDescription("");
    setStatus("Open");
    setClientId("");
    setEditingCase(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">
        {editingCase ? "Edit Case" : "Add New Case"}
      </h2>
      <input
        type="text"
        placeholder="Case Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <textarea
        placeholder="Case Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>

      {/* Client Selection */}
      <select
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">Select Client</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
        {editingCase ? "Update Case" : "Add Case"}
      </button>
      {editingCase && (
        <button
          type="button"
          className="w-full mt-2 bg-gray-500 text-white py-2 rounded"
          onClick={() => setEditingCase(null)}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

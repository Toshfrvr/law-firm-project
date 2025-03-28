import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function DocumentList({ caseId }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();

    // Realtime listener for document uploads
    const subscription = supabase
      .channel("documents")
      .on("postgres_changes", { event: "*", schema: "public", table: "documents" }, (payload) => {
        console.log("Document changed:", payload);
        fetchDocuments(); // Refresh documents when a new one is added
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    let { data, error } = await supabase.from("documents").select("*").eq("caseId", caseId);
    if (error) console.error("Error fetching documents:", error);
    else setDocuments(data);
    setLoading(false);
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Uploaded Documents</h2>
      {loading ? <p>Loading documents...</p> : documents.length > 0 ? (
        <ul className="list-disc pl-5">
          {documents.map((doc) => (
            <li key={doc.id}>
              <a href={`https://fxwyodgchykwavfyrbxo.supabase.co/${doc.fileUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                {doc.fileUrl.split("/").pop()}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No documents uploaded yet.</p>
      )}
    </div>
  );
}

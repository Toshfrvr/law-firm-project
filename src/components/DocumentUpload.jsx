import { useState } from "react";
import { supabase } from "../supabase";

export default function DocumentUpload({ caseId, fetchDocuments }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setUploading(true);
    setError("");

    const fileExt = file.name.split(".").pop();
    const fileName = `${caseId}-${Date.now()}.${fileExt}`;
    const filePath = `documents/${fileName}`;

    const { error: uploadError } = await supabase.storage.from("documents").upload(filePath, file);

    if (uploadError) {
      setError("Upload failed. Try again.");
      console.error("Upload error:", uploadError);
    } else {
      // Save document metadata in the database
      const { error: insertError } = await supabase.from("documents").insert([
        {
          caseId,
          fileUrl: filePath,
          uploadedAt: new Date(),
        },
      ]);

      if (insertError) {
        setError("Failed to save document data.");
        console.error("Insert error:", insertError);
      } else {
        fetchDocuments(); // Refresh document list
        setFile(null);
      }
    }

    setUploading(false);
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">Upload Document</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button onClick={uploadFile} disabled={uploading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

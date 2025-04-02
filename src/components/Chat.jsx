import { useEffect, useState } from "react";
// import { supabase } from "../src/supabase"; 

export default function Chat({ caseId, user }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMessages();

    // Realtime listener for chat updates
    const subscription = supabase
      .channel("messages")
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, (payload) => {
        console.log("New message received:", payload);
        fetchMessages();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchMessages = async () => {
    let { data, error } = await supabase.from("messages").select("*").eq("caseId", caseId).order("timestamp", { ascending: true });
    if (error) console.error("Error fetching messages:", error);
    else setMessages(data);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    let { error } = await supabase.from("messages").insert([{ caseId, senderId: user.id, content: message }]);
    if (error) console.error("Error sending message:", error);
    else setMessage("");
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold">Live Chat</h2>
      <div className="h-40 overflow-y-auto border p-2 mb-2">
        {messages.map((msg) => (
          <p key={msg.id} className={msg.senderId === user.id ? "text-right text-blue-600" : "text-left text-gray-800"}>
            {msg.content}
          </p>
        ))}
      </div>
      <div className="flex">
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1 border p-2" placeholder="Type a message..." />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2">Send</button>
      </div>
    </div>
  );
}

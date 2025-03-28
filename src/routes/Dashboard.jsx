import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../supabase";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Dashboard() {
  const auth = useAuth();
  const role = auth?.role || "guest";

  const [caseStats, setCaseStats] = useState({ open: 0, inProgress: 0, closed: 0 });
  const [recentCases, setRecentCases] = useState([]);
  const [recentClients, setRecentClients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [billingSummary, setBillingSummary] = useState(0);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [userRolesCount, setUserRolesCount] = useState({
    admin: 0,
    lawyer: 0,
    paralegal: 0,
    client: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    fetchUserRolesCount();

    const caseSubscription = supabase
      .channel("cases")
      .on("postgres_changes", { event: "*", schema: "public", table: "cases" }, () => {
        fetchDashboardData();
      })
      .subscribe();

    const messageSubscription = supabase
      .channel("messages")
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, () => {
        fetchMessages();
      })
      .subscribe();

    return () => {
      caseSubscription.unsubscribe();
      messageSubscription.unsubscribe();
    };
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data: cases } = await supabase.from("cases").select("*");
      const { data: clients } = await supabase.from("clients").select("*");
      const { data: appointmentsData } = await supabase.from("appointments").select("*");
      const { data: billings } = await supabase.from("billing").select("*");

      const open = cases.filter((c) => c.status === "Open").length;
      const inProgress = cases.filter((c) => c.status === "In Progress").length;
      const closed = cases.filter((c) => c.status === "Closed").length;

      setCaseStats({ open, inProgress, closed });
      setRecentCases(cases.slice(-5));
      setRecentClients(clients.slice(-5));
      setAppointments(appointmentsData);
      setBillingSummary(billings.reduce((acc, curr) => acc + curr.amount, 0));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRolesCount = async () => {
    try {
      const { data: users } = await supabase.from("users").select("role");
      const counts = {
        admin: users.filter((u) => u.role === "admin").length,
        lawyer: users.filter((u) => u.role === "lawyer").length,
        paralegal: users.filter((u) => u.role === "paralegal").length,
        client: users.filter((u) => u.role === "client").length,
      };
      setUserRolesCount(counts);
    } catch (error) {
      console.error("Error fetching user roles count:", error);
    }
  };

  const fetchMessages = async () => {
    const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: true });
    setMessages(data);
  };

  const sendMessage = async () => {
    if (!messageInput.trim()) return;
    await supabase.from("messages").insert([{ content: messageInput, sender: auth?.user?.email }]);
    setMessageInput("");
  };

  const casePieData = [
    { name: "Open", value: caseStats.open },
    { name: "In Progress", value: caseStats.inProgress },
    { name: "Closed", value: caseStats.closed },
  ];

  const revenueData = [
    { month: "Jan", revenue: 5000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 7000 },
    { month: "Apr", revenue: 4000 },
  ];

  if (loading) return <p className="text-center text-xl">Loading dashboard...</p>;

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-indigo-500 rounded text-white">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Case Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {Object.keys(caseStats).map((key, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold capitalize">{key}</h2>
            <p className="text-2xl">{caseStats[key]}</p>
          </div>
        ))}
      </div>

      {/* User Roles Overview */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">User Roles Overview</h2>
        <div className="grid grid-cols-4 gap-4">
          {Object.keys(userRolesCount).map((key, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold capitalize">{key}</h3>
              <p className="text-2xl">{userRolesCount[key]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Cases */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Recent Cases</h2>
        <ul className="border rounded-lg p-4 bg-white">
          {recentCases.length > 0 ? (
            recentCases.map((c) => (
              <li key={c.id} className="border-b p-2 flex justify-between">
                <span>{c.title}</span>
                <span className="font-semibold">{c.status}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No recent cases available.</p>
          )}
        </ul>
      </div>

      {/* Recent Clients */}
      {role === "admin" && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Recent Clients</h2>
          <ul className="border rounded-lg p-4 bg-white">
            {recentClients.length > 0 ? (
              recentClients.map((client) => (
                <li key={client.id} className="border-b p-2">{client.name}</li>
              ))
            ) : (
              <p className="text-gray-500">No recent clients available.</p>
            )}
          </ul>
        </div>
      )}

      {/* Appointments Overview */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Upcoming Appointments</h2>
        <ul className="border rounded-lg p-4 bg-white">
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <li key={appt.id} className="border-b p-2">
                {new Date(appt.dateTime).toLocaleString()} - {appt.description}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No upcoming appointments.</p>
          )}
        </ul>
      </div>

      {/* Billing Summary */}
      {role === "admin" && (
        <div className="p-4 bg-white rounded-lg shadow-md text-center mb-6">
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-2xl">${billingSummary.toFixed(2)}</p>
        </div>
      )}

      {/* Pie Chart for Case Statistics */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Case Distribution</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={casePieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {casePieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={["#8884d8", "#ffc658", "#82ca9d"][index % 3]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Bar Chart for Monthly Revenue */}
      {role === "admin" && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2">Monthly Revenue</h2>
          <BarChart width={500} height={300} data={revenueData}>
            <XAxis dataKey="month" stroke={darkMode ? "#fff" : "#000"} />
            <YAxis stroke={darkMode ? "#fff" : "#000"} />
            <Tooltip />
            <Bar dataKey="revenue" fill="#4F46E5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </div>
      )}
    </div>
  );
}

// Backend setup for Law Firm Management System

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const caseRoutes = require('./routes/caseRoutes');
const clientRoutes = require('./routes/clientRoutes');
const documentRoutes = require('./routes/documentRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const chatRoutes = require('./routes/chatRoutes');

const [tasks, setTasks] = useState([]);

useEffect(() => {
  fetchTasks();
}, []);

const fetchTasks = async () => {
  try {
    const response = await api.get("/tasks");
    setTasks(response.data);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};


// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware

 
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/chat', chatRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

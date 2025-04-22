import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-wide">Tosh The Gr8 Advocates</h1>
      
      <div className="flex items-center space-x-6">
      {/* <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
          <li><Link to="/case-list" className="hover:text-gray-200">Case</Link></li>
          <li><Link to="/about" className="hover:text-gray-200">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-gray-200">Contact</Link></li>
        </ul>
        <Link 
          to="/dashboard" 
          className="text-lg font-medium hover:text-gray-300 transition duration-200"
        >
          Dashboard
        </Link> */}
        <Link 
          to="/" 
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-200"
        >
          Logout
        </Link>
       
      </div>
    </nav>
  );
}

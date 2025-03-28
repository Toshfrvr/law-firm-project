export default function Footer() {
    return (
      <footer className="bg-blue-700 text-white p-4 mt-10 text-center flex-grow">
        <p>© {new Date().getFullYear()} Law Firm Management System. All rights reserved.</p>
        <p className="text-sm">Designed for efficiency and security in legal management.</p>
      </footer>
    );
  }
  
export default function About() {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">About Our Firm</h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          At <strong>Tosh The Gr8 Advocates Law Firm</strong>, we are dedicated to providing top-tier legal services tailored to our clients' needs. With a team of experienced lawyers, paralegals, and legal consultants, we specialize in various areas of law, including corporate law, family law, criminal defense, and real estate disputes.
        </p>
  
        <h2 className="text-2xl font-semibold mt-6 text-gray-800">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to ensure justice and provide reliable legal representation through innovative solutions and a client-focused approach. We believe in transparency, professionalism, and a commitment to excellence.
        </p>
  
        <h2 className="text-2xl font-semibold mt-6 text-gray-800">Why Choose Us?</h2>
        <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
          <li><strong>Experienced Legal Team:</strong> Over 20 years of combined legal expertise.</li>
          <li><strong>Client-Centered Approach:</strong> We prioritize our clients' needs and ensure the best legal outcomes.</li>
          <li><strong>Technology-Driven Solutions:</strong> Our digital platform streamlines legal processes for efficiency.</li>
        </ul>
  
        <h2 className="text-2xl font-semibold mt-6 text-gray-800">Contact Us</h2>
        <p className="text-gray-700">
          If you need legal assistance, feel free to reach out to us. Visit our <a href="/contact" className="text-blue-600 hover:underline">Contact Page</a> to send us a message.
        </p>
      </div>
    );
  }
  
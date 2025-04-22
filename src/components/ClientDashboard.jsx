import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function ClientDashboard() {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Client Dashboard</h1>
        <p className="text-gray-600">Welcome! Here’s what you can view and manage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">My Cases</h3>
            <p className="text-gray-500">Track your ongoing and closed legal cases.</p>
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700">View Cases</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">Appointments</h3>
            <p className="text-gray-500">See your scheduled meetings with lawyers.</p>
            <Button className="mt-4 bg-green-600 hover:bg-green-700">View Appointments</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">Messages</h3>
            <p className="text-gray-500">Check your conversations and updates.</p>
            <Button className="mt-4 bg-yellow-500 hover:bg-yellow-600">View Messages</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">Invoices</h3>
            <p className="text-gray-500">Review your legal service billing history.</p>
            <Button className="mt-4 bg-red-600 hover:bg-red-700">View Invoices</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">Upload Documents</h3>
            <p className="text-gray-500">Send necessary legal files securely.</p>
            <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Upload File</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">Support</h3>
            <p className="text-gray-500">Need help? Reach out to us anytime.</p>
            <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700">Contact Support</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ClientDashboard;

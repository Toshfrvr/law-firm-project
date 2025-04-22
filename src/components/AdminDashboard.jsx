import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Manage users, cases, and system settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">User Management</h3>
            <p className="text-gray-500">Add, edit, or remove lawyers, clients, and staff.</p>
            <Button className="mt-4 bg-blue-700 hover:bg-blue-800">Manage Users</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">Case Oversight</h3>
            <p className="text-gray-500">Review all case records and assignments.</p>
            <Button className="mt-4 bg-green-700 hover:bg-green-800">View Cases</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">Appointments</h3>
            <p className="text-gray-500">Check schedules and calendar availability.</p>
            <Button className="mt-4 bg-purple-700 hover:bg-purple-800">View Calendar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">Billing & Payments</h3>
            <p className="text-gray-500">Track invoices, revenue, and pending payments.</p>
            <Button className="mt-4 bg-yellow-600 hover:bg-yellow-700">Financials</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">System Settings</h3>
            <p className="text-gray-500">Update platform settings and configurations.</p>
            <Button className="mt-4 bg-red-600 hover:bg-red-700">Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">Support & Feedback</h3>
            <p className="text-gray-500">View reports, issues, and user feedback.</p>
            <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700">Support</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

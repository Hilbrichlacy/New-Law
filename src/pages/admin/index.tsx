import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaUsers, FaComments, FaEnvelope, FaChartBar, FaBars, FaTimes } from 'react-icons/fa';

interface DashboardStats {
  totalChatSessions: number;
  totalMessages: number;
  totalContactMessages: number;
  recentMessages: any[];
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalChatSessions: 0,
    totalMessages: 0,
    totalContactMessages: 0,
    recentMessages: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-xl sm:text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="text-blue-600 text-2xl sm:text-3xl">
          {icon}
        </div>
      </div>
    </motion.div>
  );

  const RecentMessages: React.FC<{ messages: any[] }> = ({ messages }) => (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Messages</h3>
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="border-b pb-4 last:border-b-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div className="flex-1">
                <p className="font-medium break-words">{message.content}</p>
                <p className="text-sm text-gray-500">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs self-start sm:self-auto ${
                message.isBot ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {message.isBot ? 'Bot' : 'User'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Aryawn</title>
        <meta name="description" content="Admin dashboard for managing chat sessions and contact messages" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-md">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 lg:static lg:inset-0
          `}>
            <div className="h-full flex flex-col">
              <div className="hidden lg:block px-4 py-6 border-b">
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
              <nav className="flex-1 px-4 py-6 space-y-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'overview'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('chat-sessions')}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'chat-sessions'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Chat Sessions
                </button>
                <button
                  onClick={() => setActiveTab('contact-messages')}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'contact-messages'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Contact Messages
                </button>
              </nav>
              <div className="p-4 border-t">
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm">
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-8">
                <StatCard
                  title="Total Chat Sessions"
                  value={stats.totalChatSessions}
                  icon={<FaUsers />}
                />
                <StatCard
                  title="Total Messages"
                  value={stats.totalMessages}
                  icon={<FaComments />}
                />
                <StatCard
                  title="Contact Messages"
                  value={stats.totalContactMessages}
                  icon={<FaEnvelope />}
                />
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="lg:col-span-2">
                  <RecentMessages messages={stats.recentMessages} />
                </div>
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-lg shadow-md p-4 sm:p-6"
                  >
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="space-y-3 sm:space-y-4">
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base">
                        Export Data
                      </button>
                      <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm sm:text-base">
                        Generate Report
                      </button>
                      <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm sm:text-base">
                        Manage Settings
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard; 
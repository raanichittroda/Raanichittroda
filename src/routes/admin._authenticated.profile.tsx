import { createFileRoute } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/adminAuth";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/_authenticated/profile")({
  component: AdminProfile,
});

function AdminProfile() {
  const { user } = useAdminAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account settings and password.</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Personal Information</h2>
        </div>
        <div className="p-6 flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <img src={user?.avatar} alt="Profile" className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200" />
            <button className="mt-4 text-sm font-medium text-gold hover:text-yellow-600 block text-center w-full">Change Photo</button>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" defaultValue={user?.name} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" disabled defaultValue={user?.email} className="mt-1 block w-full border border-gray-200 bg-gray-50 rounded-md shadow-sm py-2 px-3 text-gray-500 sm:text-sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Change Password</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input type="password" placeholder="••••••••" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input type="password" placeholder="••••••••" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input type="password" placeholder="••••••••" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-800">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

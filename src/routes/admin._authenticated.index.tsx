import { createFileRoute } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/adminAuth";
import { Package, Users, Activity, BarChart, TrendingUp, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/admin/_authenticated/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { user } = useAdminAuth();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Analytics Dashboard</h1>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded shadow-sm hover:bg-gray-50">
          <RefreshCw className="h-4 w-4" /> Refresh Data
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { t: "Total Products", v: "524", i: Package, c: "text-blue-600 bg-blue-100" },
          { t: "Wholesale Enquiries", v: "142", i: Users, c: "text-green-600 bg-green-100" },
          { t: "Retail Orders", v: "84", i: Activity, c: "text-purple-600 bg-purple-100" },
          { t: "Monthly Growth", v: "+12.5%", i: TrendingUp, c: "text-orange-600 bg-orange-100" },
        ].map((s) => (
          <div key={s.t} className="overflow-hidden rounded-lg bg-white shadow-sm border border-gray-200">
            <div className="p-5 flex items-center gap-4">
              <div className={`p-3 rounded-full ${s.c}`}>
                <s.i className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 truncate">{s.t}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{s.v}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart className="h-5 w-5 text-gray-400" /> Recent Enquiries
          </h2>
          <ul className="divide-y divide-gray-200">
            {[]}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-gray-400" /> Popular Products
          </h2>
          <ul className="divide-y divide-gray-200">
            {[]}
          </ul>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/_authenticated/wholesale")({
  component: WholesaleEnquiries,
});

const statuses = ["New", "Contacted", "Quotation Sent", "Confirmed", "Completed", "Cancelled"];

function WholesaleEnquiries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .in("order_type", ["Wholesale", "Bulk", "Wholesale Order", "Bulk Order"])
      .order("created_at", { ascending: false });
      
    if (!error && data) {
      setEnquiries(data);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));
    await supabase.from("orders").update({ status: newStatus }).eq("id", id);
  };

  const filtered = enquiries.filter(e => 
    e.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Wholesale Enquiries</h1>
          <p className="mt-2 text-sm text-gray-500">Manage bulk and wholesale B2B requests.</p>
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by business, name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold sm:text-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enquiry ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business / Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type / Qty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">Loading wholesale enquiries...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">No wholesale enquiries found.</td>
                </tr>
              ) : filtered.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{enquiry.id.slice(0, 8)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{enquiry.business_name || "N/A"}</div>
                    <div className="text-sm text-gray-500">{enquiry.customer_name} · {enquiry.mobile}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{enquiry.order_type}</div>
                    <div className="text-sm text-gray-500">{enquiry.expected_quantity || "Not specified"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(enquiry.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{enquiry.total_amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${enquiry.status === 'New' ? 'bg-blue-100 text-blue-800' : 
                        enquiry.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        enquiry.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}
                    >
                      {enquiry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <select
                      value={enquiry.status}
                      onChange={(e) => updateStatus(enquiry.id, e.target.value)}
                      className="ml-4 text-sm border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold"
                    >
                      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button className="ml-4 text-gold hover:text-yellow-600">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-gray-500">No wholesale enquiries found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

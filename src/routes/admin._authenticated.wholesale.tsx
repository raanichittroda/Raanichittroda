import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, Clock, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/admin/_authenticated/wholesale")({
  component: WholesaleEnquiries,
});

const statuses = ["New", "Contacted", "Quotation Sent", "Confirmed", "Completed", "Cancelled"];

function WholesaleEnquiries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected enquiry details slide-over state
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [selectedEnquiryItems, setSelectedEnquiryItems] = useState<any[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);

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
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
    await supabase.from("orders").update({ status: newStatus }).eq("id", id);
  };

  const openEnquiryDetails = async (enquiry: any) => {
    setSelectedEnquiry(enquiry);
    setLoadingItems(true);
    const { data, error } = await supabase
      .from("order_items")
      .select("*, products(image)")
      .eq("order_id", enquiry.id);

    if (!error && data) {
      setSelectedEnquiryItems(data.map((item: any) => ({
        ...item,
        image: item.products?.image || "/placeholder.jpg"
      })));
    }
    setLoadingItems(false);
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
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold sm:text-sm focus:outline-none"
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
                    {formatINR(enquiry.total_amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {enquiry.status === "New" && <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">New</span>}
                    {(enquiry.status === "Contacted" || enquiry.status === "Quotation Sent" || enquiry.status === "Confirmed") && <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700"><Clock className="w-3 h-3" /> {enquiry.status}</span>}
                    {enquiry.status === "Completed" && <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700"><CheckCircle className="w-3 h-3" /> Completed</span>}
                    {enquiry.status === "Cancelled" && <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700"><XCircle className="w-3 h-3" /> Cancelled</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end gap-3">
                    <select
                      value={enquiry.status}
                      onChange={(e) => updateStatus(enquiry.id, e.target.value)}
                      className="text-xs border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold px-2 py-1 bg-white focus:outline-none"
                    >
                      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button 
                      onClick={() => openEnquiryDetails(enquiry)}
                      className="text-gold hover:text-yellow-600"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && !loading && (
            <div className="p-12 text-center text-gray-500">No wholesale enquiries found.</div>
          )}
        </div>
      </div>

      {/* Modal Details Slide-Over */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedEnquiry(null)}></div>

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Enquiry Details</h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                          onClick={() => setSelectedEnquiry(null)}
                        >
                          <span className="sr-only">Close panel</span>
                          <span className="text-xl">×</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">ID: {selectedEnquiry.id}</p>
                  </div>
                  
                  <div className="relative mt-6 flex-1 px-4 sm:px-6 border-t border-gray-200 pt-6 space-y-6">
                    {/* Status */}
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</h3>
                      <div className="mt-2 flex items-center gap-3">
                        <select
                          value={selectedEnquiry.status}
                          onChange={(e) => updateStatus(selectedEnquiry.id, e.target.value)}
                          className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold px-3 py-1.5 bg-white focus:outline-none"
                        >
                          {statuses.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer Details</h3>
                      <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 text-sm">
                        <div>
                          <dt className="text-gray-500">Name</dt>
                          <dd className="font-medium text-gray-900">{selectedEnquiry.customer_name}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Mobile</dt>
                          <dd className="font-medium text-gray-900">{selectedEnquiry.mobile}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-gray-500">Email</dt>
                          <dd className="font-medium text-gray-900 truncate">{selectedEnquiry.email}</dd>
                        </div>
                        {selectedEnquiry.business_name && (
                          <div>
                            <dt className="text-gray-500">Business Name</dt>
                            <dd className="font-medium text-gray-900">{selectedEnquiry.business_name}</dd>
                          </div>
                        )}
                        {selectedEnquiry.gst_number && (
                          <div>
                            <dt className="text-gray-500">GST Number</dt>
                            <dd className="font-medium text-gray-900">{selectedEnquiry.gst_number}</dd>
                          </div>
                        )}
                      </dl>
                    </div>

                    {/* Shipping Info */}
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Shipping Address</h3>
                      <p className="mt-2 text-sm text-gray-900 font-medium">{selectedEnquiry.address}</p>
                      <p className="text-sm text-gray-900">{selectedEnquiry.city}, {selectedEnquiry.state}</p>
                    </div>

                    {/* Items List */}
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Requested Items</h3>
                      <div className="mt-2 divide-y divide-gray-200">
                        {loadingItems ? (
                          <p className="text-sm text-gray-500 py-4">Loading items...</p>
                        ) : selectedEnquiryItems.length === 0 ? (
                          <p className="text-sm text-gray-500 py-4">No items found.</p>
                        ) : (
                          selectedEnquiryItems.map((item) => (
                            <div key={item.id} className="py-4 flex gap-4 text-sm">
                              <img src={item.image} alt={item.product_name} className="h-16 w-12 object-cover rounded bg-gray-50" />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 truncate">{item.product_name}</h4>
                                <p className="text-xs text-gray-500">ID: {item.product_id}</p>
                                <p className="text-xs text-gray-500 mt-1">Qty {item.quantity} × {formatINR(item.price)}</p>
                              </div>
                              <span className="font-medium text-gray-900">{formatINR(item.price * item.quantity)}</span>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="border-t border-gray-200 pt-4 flex justify-between items-baseline">
                        <span className="text-sm font-medium text-gray-500">Total Amount</span>
                        <span className="text-2xl font-bold text-gray-900">{formatINR(selectedEnquiry.total_amount)}</span>
                      </div>
                    </div>

                    {/* Expected Quantity */}
                    {selectedEnquiry.expected_quantity && (
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Expected Quantity</h3>
                        <p className="mt-2 text-sm text-gray-900 font-medium">{selectedEnquiry.expected_quantity}</p>
                      </div>
                    )}

                    {/* Notes */}
                    {selectedEnquiry.note && (
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Special Instructions</h3>
                        <p className="mt-2 text-sm text-gray-700 bg-gray-50 p-3 rounded italic">"{selectedEnquiry.note}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

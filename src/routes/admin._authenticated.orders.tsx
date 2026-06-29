import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Download, Search, CheckCircle, Clock, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/admin/_authenticated/orders")({
  component: OrdersCMS,
});

function OrdersCMS() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Selected order details slide-over state
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [selectedOrderItems, setSelectedOrderItems] = useState<any[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("order_type", "Retail Order")
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  const updateOrderStatus = async (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    await supabase.from("orders").update({ status: newStatus }).eq("id", id);
  };

  const openOrderDetails = async (order: any) => {
    setSelectedOrder(order);
    setLoadingItems(true);
    const { data, error } = await supabase
      .from("order_items")
      .select("*, products(image)")
      .eq("order_id", order.id);

    if (!error && data) {
      setSelectedOrderItems(data.map((item: any) => ({
        ...item,
        image: item.products?.image || "/placeholder.jpg"
      })));
    }
    setLoadingItems(false);
  };

  const filtered = orders.filter(o => {
    const matchesSearch = o.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      o.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Order Management (Retail)</h1>
          <p className="text-sm text-gray-500 mt-1">Track WhatsApp inquiries and converted retail orders.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by ID or customer..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md text-sm px-3 py-2 bg-white focus:ring-1 focus:ring-gray-900 focus:border-gray-900 focus:outline-none"
          >
            <option>All Status</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Quotation Sent</option>
            <option>Confirmed</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">Loading orders...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">No orders found.</td>
                </tr>
              ) : filtered.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id.slice(0, 8)}...</td>
                  <td className="px-6 py-4 text-gray-900">{order.customer_name}</td>
                  <td className="px-6 py-4 text-gray-500">{order.order_type}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-gray-900">{formatINR(order.total_amount)}</td>
                  <td className="px-6 py-4">
                    {order.status === "New" && <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">New</span>}
                    {(order.status === "Contacted" || order.status === "Quotation Sent" || order.status === "Confirmed") && <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700"><Clock className="w-3 h-3" /> {order.status}</span>}
                    {order.status === "Completed" && <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700"><CheckCircle className="w-3 h-3" /> Completed</span>}
                    {order.status === "Cancelled" && <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700"><XCircle className="w-3 h-3" /> Cancelled</span>}
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="text-xs border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold px-2 py-1 bg-white focus:outline-none"
                    >
                      {["New", "Contacted", "Quotation Sent", "Confirmed", "Completed", "Cancelled"].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button 
                      onClick={() => openOrderDetails(order)}
                      className="text-gold hover:text-yellow-600 font-medium text-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Details Slide-Over */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedOrder(null)}></div>

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Order Details</h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                          onClick={() => setSelectedOrder(null)}
                        >
                          <span className="sr-only">Close panel</span>
                          <span className="text-xl">×</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">ID: {selectedOrder.id}</p>
                  </div>
                  
                  <div className="relative mt-6 flex-1 px-4 sm:px-6 border-t border-gray-200 pt-6 space-y-6">
                    {/* Status */}
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</h3>
                      <div className="mt-2 flex items-center gap-3">
                        <select
                          value={selectedOrder.status}
                          onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                          className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold px-3 py-1.5 bg-white focus:outline-none"
                        >
                          {["New", "Contacted", "Quotation Sent", "Confirmed", "Completed", "Cancelled"].map(s => (
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
                          <dd className="font-medium text-gray-900">{selectedOrder.customer_name}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Mobile</dt>
                          <dd className="font-medium text-gray-900">{selectedOrder.mobile}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-gray-500">Email</dt>
                          <dd className="font-medium text-gray-900 truncate">{selectedOrder.email}</dd>
                        </div>
                        {selectedOrder.business_name && (
                          <div>
                            <dt className="text-gray-500">Business Name</dt>
                            <dd className="font-medium text-gray-900">{selectedOrder.business_name}</dd>
                          </div>
                        )}
                        {selectedOrder.gst_number && (
                          <div>
                            <dt className="text-gray-500">GST Number</dt>
                            <dd className="font-medium text-gray-900">{selectedOrder.gst_number}</dd>
                          </div>
                        )}
                      </dl>
                    </div>

                    {/* Shipping Info */}
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Shipping Address</h3>
                      <p className="mt-2 text-sm text-gray-900 font-medium">{selectedOrder.address}</p>
                      <p className="text-sm text-gray-900">{selectedOrder.city}, {selectedOrder.state}</p>
                    </div>

                    {/* Items List */}
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ordered Items</h3>
                      <div className="mt-2 divide-y divide-gray-200">
                        {loadingItems ? (
                          <p className="text-sm text-gray-500 py-4">Loading items...</p>
                        ) : selectedOrderItems.length === 0 ? (
                          <p className="text-sm text-gray-500 py-4">No items found.</p>
                        ) : (
                          selectedOrderItems.map((item) => (
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
                        <span className="text-2xl font-bold text-gray-900">{formatINR(selectedOrder.total_amount)}</span>
                      </div>
                    </div>

                    {/* Notes */}
                    {selectedOrder.note && (
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Special Instructions</h3>
                        <p className="mt-2 text-sm text-gray-700 bg-gray-50 p-3 rounded italic">"{selectedOrder.note}"</p>
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

import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { Search, User, Phone, MapPin, ClipboardList, Briefcase, DollarSign, Eye, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/admin/_authenticated/customers")({
  component: CustomersCMS,
});

interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  businessName?: string;
  gstNumber?: string;
  cities: string[];
  states: string[];
  addresses: string[];
  totalSpend: number;
  totalOrdersCount: number;
  totalEnquiriesCount: number;
  lastActive: string;
  history: any[];
}

function CustomersCMS() {
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "retail" | "wholesale">("all");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    // Fetch all orders & enquiries to aggregate customer profiles dynamically
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      // Group by mobile number (ignoring spaces & country code prefix if possible, or exact match)
      const customerMap = new Map<string, any[]>();
      data.forEach((row) => {
        const key = row.mobile.replace(/\s+/g, "").trim();
        if (!customerMap.has(key)) {
          customerMap.set(key, []);
        }
        customerMap.get(key)!.push(row);
      });

      const profiles: CustomerProfile[] = [];
      customerMap.forEach((rows, mobileKey) => {
        const latestRow = rows[0]; // Already sorted by created_at desc
        const name = latestRow.customer_name;
        const email = latestRow.email;
        const businessName = rows.find(r => r.business_name)?.business_name;
        const gstNumber = rows.find(r => r.gst_number)?.gst_number;
        
        const cities = Array.from(new Set(rows.map(r => r.city).filter(Boolean)));
        const states = Array.from(new Set(rows.map(r => r.state).filter(Boolean)));
        const addresses = Array.from(new Set(rows.map(r => r.address).filter(Boolean)));

        const retailOrders = rows.filter(r => r.order_type === "Retail Order");
        const wholesaleEnquiries = rows.filter(r => r.order_type === "Wholesale Enquiry");

        const totalSpend = retailOrders.reduce((sum, r) => sum + Number(r.total_amount || 0), 0);

        profiles.push({
          id: mobileKey,
          name,
          email,
          mobile: latestRow.mobile,
          businessName,
          gstNumber,
          cities,
          states,
          addresses,
          totalSpend,
          totalOrdersCount: retailOrders.length,
          totalEnquiriesCount: wholesaleEnquiries.length,
          lastActive: new Date(latestRow.created_at).toLocaleDateString(),
          history: rows
        });
      });

      setCustomers(profiles);
    }
    setLoading(false);
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      // Search Match
      const q = searchTerm.toLowerCase();
      const matchesSearch = 
        c.name.toLowerCase().includes(q) ||
        c.mobile.includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.businessName && c.businessName.toLowerCase().includes(q)) ||
        c.cities.some(city => city.toLowerCase().includes(q));

      // Tab Match
      if (activeTab === "retail") {
        return matchesSearch && c.totalOrdersCount > 0;
      }
      if (activeTab === "wholesale") {
        return matchesSearch && c.totalEnquiriesCount > 0;
      }
      return matchesSearch;
    });
  }, [customers, searchTerm, activeTab]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-gray-900">Customers CRM</h1>
          <p className="text-sm text-gray-500">View and manage clients derived from retail orders and wholesale queries.</p>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex border-b border-gray-200">
          {(["all", "retail", "wholesale"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 uppercase tracking-wider ${
                activeTab === tab
                  ? "border-amber-600 text-amber-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "all" ? "All Profiles" : tab === "retail" ? "Retail Customers" : "Wholesale Clients"}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, mobile, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md focus:border-amber-600 focus:outline-none focus:ring-0 text-sm"
          />
        </div>
      </div>

      {/* Main Table List */}
      {loading ? (
        <div className="py-20 text-center text-gray-500">Loading customer profiles...</div>
      ) : filteredCustomers.length > 0 ? (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-3 font-semibold">Client Name</th>
                <th className="px-6 py-3 font-semibold">Contact</th>
                <th className="px-6 py-3 font-semibold">Locations</th>
                <th className="px-6 py-3 font-semibold">Type / Stats</th>
                <th className="px-6 py-3 font-semibold">Total Spend</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">{c.name}</div>
                    {c.businessName && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <Briefcase className="w-3 h-3 text-amber-600" /> {c.businessName}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{c.mobile}</div>
                    <div className="text-xs text-gray-500">{c.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-xs text-gray-700">
                      <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>{c.cities.join(", ")}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {c.totalOrdersCount > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {c.totalOrdersCount} Retail Orders
                        </span>
                      )}
                      {c.totalEnquiriesCount > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                          {c.totalEnquiriesCount} Wholesale Enquiries
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                    {c.totalSpend > 0 ? formatINR(c.totalSpend) : "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => setSelectedCustomer(c)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-800 transition"
                    >
                      <Eye className="w-4 h-4" /> View History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-gray-200 rounded-lg text-gray-500 bg-white">
          No customer records found.
        </div>
      )}

      {/* Details Slide-Over Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/45 transition-opacity" onClick={() => setSelectedCustomer(null)} />
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="w-screen max-w-lg bg-white shadow-2xl flex flex-col">
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold font-display text-gray-900">{selectedCustomer.name}</h3>
                  <p className="text-xs text-gray-500">Customer History Profile</p>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Contact Card */}
                <div className="bg-gray-50 p-4 border border-gray-100 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Phone className="w-4 h-4 text-amber-600" />
                    <span>{selectedCustomer.mobile}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <User className="w-4 h-4 text-amber-600" />
                    <span>{selectedCustomer.email}</span>
                  </div>
                  {selectedCustomer.businessName && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Briefcase className="w-4 h-4 text-amber-600" />
                      <span>{selectedCustomer.businessName} (GST: {selectedCustomer.gstNumber || "N/A"})</span>
                    </div>
                  )}
                </div>

                {/* Addresses Card */}
                <div>
                  <h4 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-2">Registered Addresses</h4>
                  <div className="space-y-2">
                    {selectedCustomer.addresses.map((addr, index) => (
                      <div key={index} className="flex gap-2 text-sm text-gray-600 bg-white p-3 border border-gray-200 rounded">
                        <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{addr}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* History Timeline */}
                <div>
                  <h4 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-3">Order & Enquiries Timeline</h4>
                  <div className="space-y-4">
                    {selectedCustomer.history.map((row) => (
                      <div key={row.id} className="relative pl-6 border-l-2 border-amber-600/35">
                        <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-amber-600 rounded-full" />
                        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                              row.order_type === 'Retail Order' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                            }`}>
                              {row.order_type}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(row.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-sm font-semibold text-gray-900">
                            {row.order_type === 'Retail Order' ? `Amount: ${formatINR(row.total_amount)}` : `Expected Qty: ${row.expected_quantity || 'N/A'}`}
                          </div>
                          {row.note && (
                            <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                              Note: {row.note}
                            </p>
                          )}
                          <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                            <span>Status: {row.status}</span>
                            <span>ID: ...{row.id.slice(-6)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
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

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/adminAuth";
import { Package, Users, Activity, BarChart, TrendingUp, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/admin/_authenticated/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { user } = useAdminAuth();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    totalProducts: 0,
    wholesaleEnquiries: 0,
    retailOrders: 0,
    monthlyGrowth: "+0%"
  });
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
  const [popularProducts, setPopularProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Get total products
      const { count: prodCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      // 2. Get wholesale/bulk count
      const { count: wholesaleCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .in("order_type", ["Wholesale", "Bulk", "Wholesale Order", "Bulk Order"]);

      // 3. Get retail count
      const { count: retailCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .in("order_type", ["Retail", "Retail Order"]);

      // Calculate monthly growth (past 30 days vs 30 days before that)
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString();

      const { count: currentMonthCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .gte("created_at", thirtyDaysAgo);

      const { count: prevMonthCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .gte("created_at", sixtyDaysAgo)
        .lt("created_at", thirtyDaysAgo);

      let growthStr = "+0%";
      if (prevMonthCount && prevMonthCount > 0) {
        const growth = ((currentMonthCount - prevMonthCount) / prevMonthCount) * 100;
        growthStr = (growth >= 0 ? "+" : "") + growth.toFixed(1) + "%";
      } else if (currentMonthCount && currentMonthCount > 0) {
        growthStr = "+" + currentMonthCount * 100 + "%";
      }

      setStats({
        totalProducts: prodCount || 0,
        wholesaleEnquiries: wholesaleCount || 0,
        retailOrders: retailCount || 0,
        monthlyGrowth: growthStr
      });

      // 4. Get recent 5 enquiries/orders
      const { data: recentData } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (recentData) setRecentEnquiries(recentData);

      // 5. Get popular products
      const { data: itemsData } = await supabase
        .from("order_items")
        .select("product_id, quantity");

      if (itemsData && itemsData.length > 0) {
        const counts: Record<string, number> = {};
        itemsData.forEach(item => {
          counts[item.product_id] = (counts[item.product_id] || 0) + item.quantity;
        });
        
        const sortedIds = Object.keys(counts)
          .sort((a, b) => counts[b] - counts[a])
          .slice(0, 5);

        if (sortedIds.length > 0) {
          const { data: products } = await supabase
            .from("products")
            .select("id, name, image, retail_price")
            .in("id", sortedIds);
          
          if (products) {
            const mapped = sortedIds.map(id => {
              const prod = products.find(p => p.id === id);
              return prod ? { ...prod, salesCount: counts[id] } : null;
            }).filter(Boolean);
            setPopularProducts(mapped);
          }
        }
      } else {
        const { data: fallbackProducts } = await supabase
          .from("products")
          .select("id, name, image, retail_price")
          .order("created_at", { ascending: false })
          .limit(5);
        if (fallbackProducts) {
          setPopularProducts(fallbackProducts.map(p => ({ ...p, salesCount: 0 })));
        }
      }
    } catch (err) {
      console.error("Failed to load dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Analytics Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, {user?.user_metadata?.name || "Admin User"}.</p>
        </div>
        <button 
          onClick={fetchDashboardData}
          disabled={loading}
          className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded shadow-sm hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { t: "Total Products", v: stats.totalProducts.toString(), i: Package, c: "text-blue-600 bg-blue-100" },
          { t: "Wholesale Enquiries", v: stats.wholesaleEnquiries.toString(), i: Users, c: "text-green-600 bg-green-100" },
          { t: "Retail Orders", v: stats.retailOrders.toString(), i: Activity, c: "text-purple-600 bg-purple-100" },
          { t: "Monthly Growth", v: stats.monthlyGrowth, i: TrendingUp, c: "text-orange-600 bg-orange-100" },
        ].map((s) => (
          <div key={s.t} className="overflow-hidden rounded-lg bg-white shadow-sm border border-gray-200">
            <div className="p-5 flex items-center gap-4">
              <div className={`p-3 rounded-full ${s.c}`}>
                <s.i className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 truncate">{s.t}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {loading ? "..." : s.v}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Enquiries */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart className="h-5 w-5 text-gray-400" /> Recent Enquiries
          </h2>
          <ul className="divide-y divide-gray-200">
            {loading ? (
              <li className="py-4 text-center text-sm text-gray-500">Loading recent enquiries...</li>
            ) : recentEnquiries.map((enquiry) => (
              <li 
                key={enquiry.id} 
                className="py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 px-2 rounded transition-colors"
                onClick={() => navigate({ to: enquiry.order_type.includes("Wholesale") || enquiry.order_type.includes("Bulk") ? "/admin/wholesale" : "/admin/orders" })}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {enquiry.customer_name} {enquiry.business_name ? `(${enquiry.business_name})` : ""}
                  </p>
                  <p className="text-xs text-gray-500">
                    {enquiry.order_type} · {new Date(enquiry.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                    ${enquiry.status === "New" ? "bg-blue-100 text-blue-800" : 
                      enquiry.status === "Completed" ? "bg-green-100 text-green-800" :
                      enquiry.status === "Cancelled" ? "bg-red-100 text-red-800" :
                      "bg-yellow-100 text-yellow-800"}`}
                  >
                    {enquiry.status}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {formatINR(enquiry.total_amount)}
                  </span>
                </div>
              </li>
            ))}
            {!loading && recentEnquiries.length === 0 && (
              <li className="py-4 text-center text-sm text-gray-500">No recent enquiries.</li>
            )}
          </ul>
        </div>

        {/* Popular Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-gray-400" /> Popular Products
          </h2>
          <ul className="divide-y divide-gray-200">
            {loading ? (
              <li className="py-4 text-center text-sm text-gray-500">Loading popular products...</li>
            ) : popularProducts.map((product) => (
              <li key={product.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={product.image} alt={product.name} className="h-10 w-10 object-cover rounded bg-gray-100" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{formatINR(product.retail_price)}</p>
                  {product.salesCount > 0 && (
                    <p className="text-xs text-gray-500">{product.salesCount} pieces ordered</p>
                  )}
                </div>
              </li>
            ))}
            {!loading && popularProducts.length === 0 && (
              <li className="py-4 text-center text-sm text-gray-500">No products found.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

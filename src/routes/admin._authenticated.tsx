import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAdminAuth } from "@/lib/adminAuth";
import { LayoutDashboard, ShoppingBag, FolderTree, ClipboardList, Settings, Image as ImageIcon, LayoutTemplate, LogOut, User } from "lucide-react";

export const Route = createFileRoute("/admin/_authenticated")({
  component: AdminLayout,
});

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: ShoppingBag },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Wholesale Enquiries", href: "/admin/wholesale", icon: ClipboardList },
  { label: "Retail Orders", href: "/admin/orders", icon: ClipboardList },
  { label: "Customers", href: "/admin/customers", icon: User },
  { label: "Homepage CMS", href: "/admin/homepage", icon: LayoutTemplate },
  { label: "Media Library", href: "/admin/media", icon: ImageIcon },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Profile", href: "/admin/profile", icon: User },
];

function AdminLayout() {
  const { user, isLoading, logout } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate({ to: "/admin/login" });
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="flex shrink-0 items-center gap-2 border-b border-gray-800 bg-gray-900 px-6 py-4">
          <h1 className="text-xl font-bold tracking-wider text-gray-900 text-white">RAANI CHITTRODA ADMIN</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                navigate({ to: item.href });
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <item.icon className="w-5 h-5 opacity-75" />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <img src={user.user_metadata?.avatar || "https://ui-avatars.com/api/?name=Admin&background=random"} alt="Admin" className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.user_metadata?.name || "Admin User"}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

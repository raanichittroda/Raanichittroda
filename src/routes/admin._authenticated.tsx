import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAdminAuth } from "@/lib/adminAuth";
import { LayoutDashboard, ShoppingBag, FolderTree, ClipboardList, Settings, Image as ImageIcon, LayoutTemplate, LogOut, User, Star, Menu, X } from "lucide-react";

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
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Homepage CMS", href: "/admin/homepage", icon: LayoutTemplate },
  { label: "Media Library", href: "/admin/media", icon: ImageIcon },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Profile", href: "/admin/profile", icon: User },
];

function AdminLayout() {
  const { user, isLoading, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate({ to: "/admin/login" });
    }
  }, [user, isLoading, navigate]);

  const handleNavClick = (href: string) => {
    setSidebarOpen(false);
    navigate({ to: href });
  };

  if (isLoading || !user) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar Drawer for Mobile */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" 
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white pb-4 shadow-xl transition-transform duration-300">
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-gray-800 bg-gray-900 px-6 py-4">
            <h1 className="text-xl font-bold tracking-wider text-white">RAANI CHITTRODA</h1>
            <button 
              type="button" 
              className="text-white hover:text-gray-200 focus:outline-none"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
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
        </div>
      </div>

      {/* Desktop Static Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-shrink-0 bg-white border-r border-gray-200 flex-col">
        <div className="flex shrink-0 items-center gap-2 border-b border-gray-800 bg-gray-900 px-6 py-4">
          <h1 className="text-xl font-bold tracking-wider text-white uppercase">RAANI CHITTRODA ADMIN</h1>
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header for mobile */}
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-6 lg:hidden">
          <button 
            type="button" 
            className="text-gray-500 hover:text-gray-600 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-semibold tracking-wider text-gray-900 uppercase">
            RAANI CHITTRODA
          </span>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-4 sm:p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

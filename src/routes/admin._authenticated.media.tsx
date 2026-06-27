import { createFileRoute } from "@tanstack/react-router";
import { Upload, Search, Filter } from "lucide-react";

export const Route = createFileRoute("/admin/_authenticated/media")({
  component: MediaLibraryCMS,
});

function MediaLibraryCMS() {
  const mockImages: string[] = [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Media Library</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all your product and website images.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
          <Upload className="w-4 h-4" />
          Upload Files
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search media..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mockImages.map((src, i) => (
            <div key={i} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <img src={src} alt={`Media ${i}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="text-white text-xs font-medium px-3 py-1.5 border border-white rounded hover:bg-white/20 transition-colors">Select</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

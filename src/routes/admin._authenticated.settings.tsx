import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Save, Upload, Loader2, Image as ImageIcon, Globe, Shield } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { uploadMediaFile } from "@/lib/mediaUpload";

export const Route = createFileRoute("/admin/_authenticated/settings")({
  component: SettingsCMS,
});

export interface GlobalSettings {
  storeName: string;
  phone: string;
  whatsapp: string;
  address: string;
  email: string;
  instagram: string;
  facebook: string;
  logoUrl?: string;
  faviconUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

function SettingsCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);

  const [settings, setSettings] = useState<GlobalSettings>({
    storeName: "RAANI CHITTRODA",
    phone: "+91 97850 90816",
    whatsapp: "919785090816",
    address: "50 Vasundra Nagar, Pal Balaji, Jodhpur, Rajasthan, India",
    email: "hello@raanichittroda.in",
    instagram: "https://www.instagram.com/raanichittroda",
    facebook: "https://www.facebook.com/raanichittroda",
    logoUrl: "",
    faviconUrl: "",
    seoTitle: "Raani Chittroda — Gold & Silver Jewellery Manufacturer, Wholesaler & Retailer",
    seoDescription: "Raani Chittroda crafts heirloom-grade gold and 925 sterling silver jewellery — rakhis, murtis, necklaces, chains, bracelets, coins and gift collections.",
    seoKeywords: "925 silver rakhi, silver jewellery, silver murti, gold jewellery manufacturer, wholesale silver india",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("settings").select("value").eq("key", "global_settings").single();
    if (data && data.value) {
      setSettings(prev => ({ ...prev, ...(data.value as any) }));
    } else if (error && error.code !== "PGRST116") {
      console.error("Failed to load settings", error);
    }
    setLoading(false);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const url = await uploadMediaFile(file, "branding");
      setSettings(prev => ({ ...prev, logoUrl: url }));
    } catch (err: any) {
      alert("Failed to upload logo: " + err.message);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFavicon(true);
    try {
      const url = await uploadMediaFile(file, "branding");
      setSettings(prev => ({ ...prev, faviconUrl: url }));
    } catch (err: any) {
      alert("Failed to upload favicon: " + err.message);
    } finally {
      setUploadingFavicon(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("settings").upsert({
      key: "global_settings",
      value: settings,
      updated_at: new Date().toISOString()
    });
    setSaving(false);
    
    if (error) {
      alert("Failed to save settings: " + error.message);
    } else {
      alert("Website Branding, Logo & Settings saved successfully!");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading website settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Website Branding & Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage website Logo, Favicon icon, Store info, and SEO tags.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* BRANDING SECTION: LOGO & FAVICON */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-600" /> Website Branding (Logo & Favicon)
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Upload your custom store logo for website header corner and URL favicon icon.</p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LOGO UPLOAD */}
            <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50/50">
              <label className="block text-sm font-semibold text-gray-800">Website Corner Logo</label>
              
              <div className="flex items-center gap-4">
                <div className="h-16 w-32 rounded border border-gray-300 bg-gray-900 flex items-center justify-center p-2 overflow-hidden shrink-0">
                  {settings.logoUrl ? (
                    <img src={settings.logoUrl} alt="Store Logo" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-[10px] text-gray-400 font-mono">No Logo Uploaded</span>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={uploadingLogo}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer disabled:cursor-not-allowed"
                    />
                    <button
                      type="button"
                      disabled={uploadingLogo}
                      className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded text-xs font-semibold hover:bg-amber-100 disabled:opacity-50"
                    >
                      {uploadingLogo ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5 text-amber-600" />}
                      {uploadingLogo ? "Uploading Logo..." : settings.logoUrl ? "Change Logo" : "Upload Logo File"}
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400">PNG or WebP with transparent background recommended.</p>
                </div>
              </div>

              <input
                type="text"
                placeholder="Or enter Logo image URL..."
                value={settings.logoUrl || ""}
                onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                className="w-full text-xs p-2 border border-gray-200 rounded focus:ring-1 focus:ring-gray-900"
              />
            </div>

            {/* FAVICON UPLOAD */}
            <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50/50">
              <label className="block text-sm font-semibold text-gray-800">Browser Tab Favicon Icon</label>
              
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded border border-gray-300 bg-white flex items-center justify-center p-2 overflow-hidden shrink-0 shadow-inner">
                  {settings.faviconUrl ? (
                    <img src={settings.faviconUrl} alt="Favicon" className="h-8 w-8 object-contain" />
                  ) : (
                    <span className="text-[10px] text-gray-400 font-mono text-center">32x32</span>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,.ico"
                      onChange={handleFaviconUpload}
                      disabled={uploadingFavicon}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer disabled:cursor-not-allowed"
                    />
                    <button
                      type="button"
                      disabled={uploadingFavicon}
                      className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded text-xs font-semibold hover:bg-amber-100 disabled:opacity-50"
                    >
                      {uploadingFavicon ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5 text-amber-600" />}
                      {uploadingFavicon ? "Uploading Icon..." : settings.faviconUrl ? "Change Favicon" : "Upload Favicon Icon"}
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400">Square icon visible on browser URL tab bar.</p>
                </div>
              </div>

              <input
                type="text"
                placeholder="Or enter Favicon Icon URL..."
                value={settings.faviconUrl || ""}
                onChange={(e) => setSettings({ ...settings, faviconUrl: e.target.value })}
                className="w-full text-xs p-2 border border-gray-200 rounded focus:ring-1 focus:ring-gray-900"
              />
            </div>
          </div>
        </div>

        {/* GENERAL STORE INFO */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-base font-semibold text-gray-900">General Information</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Store Name</label>
              <input type="text" value={settings.storeName || ""} onChange={(e) => setSettings({ ...settings, storeName: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="text" value={settings.phone || ""} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">WhatsApp Number (e.g. 919785090816)</label>
              <input type="text" value={settings.whatsapp || ""} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="text" value={settings.email || ""} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Instagram Link</label>
              <input type="text" value={settings.instagram || ""} onChange={(e) => setSettings({ ...settings, instagram: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Facebook Link</label>
              <input type="text" value={settings.facebook || ""} onChange={(e) => setSettings({ ...settings, facebook: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Store Address</label>
              <textarea rows={3} value={settings.address || ""} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
            </div>
          </div>
        </div>

        {/* SEO SECTION */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-base font-semibold text-gray-900">Search Engine Optimization (SEO)</h2>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">SEO Meta Title</label>
              <input type="text" value={settings.seoTitle || ""} onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
              <p className="mt-1 text-xs text-gray-500">Keep it between 50-60 characters for best Google results.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">SEO Meta Description</label>
              <textarea rows={3} value={settings.seoDescription || ""} onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
              <p className="mt-1 text-xs text-gray-500">Keep it between 150-160 characters. Summarize store offerings.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">SEO Keywords (Comma Separated)</label>
              <input type="text" value={settings.seoKeywords || ""} onChange={(e) => setSettings({ ...settings, seoKeywords: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving || uploadingLogo || uploadingFavicon} className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving Settings..." : "Save Website Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}

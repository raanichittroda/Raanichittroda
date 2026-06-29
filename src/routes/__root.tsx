import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "../lib/cart";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Raani Chittroda — Gold & Silver Jewellery Manufacturer, Wholesaler & Retailer" },
      { name: "description", content: "Raani Chittroda crafts heirloom-grade gold and silver jewellery — rakhis, murtis, necklaces, chains, bracelets, coins and gift collections." },
      { name: "author", content: "Raani Chittroda" },
      { property: "og:title", content: "Raani Chittroda — Gold & Silver Jewellery Manufacturer, Wholesaler & Retailer" },
      { property: "og:description", content: "Premium Gold & Silver Jewellery for Every Occasion." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "theme-color", content: "#111111" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Jost:wght@300;400;500;600&display=swap" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "manifest", href: "/manifest.json" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const canonicalUrl = `https://raanichittroda.netlify.app${router.state.location.pathname === "/" ? "" : router.state.location.pathname}`;

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Raani Chittroda",
          "url": "https://raanichittroda.netlify.app",
          "logo": "https://raanichittroda.netlify.app/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-97850-90816",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": "en"
          },
          "sameAs": [
            "https://www.instagram.com/raanichittroda",
            "https://www.facebook.com/raanichittroda"
          ]
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Raani Chittroda",
          "url": "https://raanichittroda.netlify.app",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://raanichittroda.netlify.app/collections?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { FloatingWhatsApp } from "../components/FloatingWhatsApp";

import { useLocation } from "@tanstack/react-router";
import { AdminAuthProvider } from "../lib/adminAuth";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <CartProvider>
          {!isAdminRoute && <SiteHeader />}
          <main className={isAdminRoute ? "" : "min-h-screen"}>
            <Outlet />
          </main>
          {!isAdminRoute && <SiteFooter />}
          {!isAdminRoute && <FloatingWhatsApp />}
        </CartProvider>
      </AdminAuthProvider>
    </QueryClientProvider>
  );
}

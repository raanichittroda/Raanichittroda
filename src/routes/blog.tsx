import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  component: BlogLayout,
});

function BlogLayout() {
  return (
    <div className="bg-background pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Outlet />
      </div>
    </div>
  );
}

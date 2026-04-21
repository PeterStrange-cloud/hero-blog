import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { PageLoading } from "./components/LoadingSpinner";
import HomePage from "./pages/Home";
const ArticlePage = lazy(() => import("./pages/Article"));
const AdminPage = lazy(() => import("./pages/Admin"));
const AdminBootstrapPage = lazy(() => import("./pages/AdminBootstrap"));
const AdminNewPage = lazy(() => import("./pages/AdminNew"));
const AdminEditPage = lazy(() => import("./pages/AdminEdit"));
const AdminSettingsPage = lazy(() => import("./pages/AdminSettings"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const AdminInvitesPage = lazy(() => import("./pages/AdminInvites"));

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoading />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const articleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/article/$id",
  component: ArticlePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const adminBootstrapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/bootstrap",
  component: AdminBootstrapPage,
});

const adminNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/new",
  component: AdminNewPage,
});

const adminEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/edit/$id",
  component: AdminEditPage,
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/settings",
  component: AdminSettingsPage,
});

const adminInvitesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/invites",
  component: AdminInvitesPage,
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  articleRoute,
  adminRoute,
  adminBootstrapRoute,
  adminNewRoute,
  adminEditRoute,
  adminSettingsRoute,
  adminInvitesRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

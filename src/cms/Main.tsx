import { createRouter, RouterProvider, createRootRoute, createRoute, Outlet, Navigate, useLocation } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import CMSSideBar from "./components/Sidebar";
import Login from "./routes/login";
import Register from "./routes/register";
import Dashboard from "./routes/dashboard";
import Projects from "./routes/projects";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Root Layout - conditionally shows sidebar based on route
const RootLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  // If on auth page, show without sidebar
  if (isAuthPage) {
    return (
      <div className="min-h-screen">
        <Outlet />
      </div>
    );
  }
  
  // Show with sidebar for authenticated pages
  return (
    <div className="flex min-h-screen bg-gray-50">
      <CMSSideBar />
      <div className="flex-1 ml-64">
        <Outlet />
      </div>
    </div>
  );
}

// Create root route
const rootRoute = createRootRoute({
  component: RootLayout
})

// Create all routes - paths are relative to basepath
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    console.log('Index route - Token:', token);
    return <Navigate to={token ? "/dashboard" : "/login"} />;
  },
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
})

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects',
  component: Projects,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
})

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
})

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  projectsRoute,
  loginRoute,
  registerRoute,
])

// Create router with history mode and basepath
const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
  basepath: '/cms',
})

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const CMSApp = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
};

export default CMSApp;


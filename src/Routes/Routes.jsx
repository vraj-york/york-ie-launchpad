import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as RouterRoutes,
} from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import ProjectDetails from "@/pages/Project/ProjectDetails";
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Project/Projects";
import CreateProject from "@/pages/Project/CreateProject";
import IntegrationsSettingsPage from "@/pages/Integrations/IntegrationsSettingsPage";
import { ClientLink } from "@/pages/ClientLink";
import ReleaseRoadmapPage from "@/pages/ReleaseRoadmap";

const privateRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/projects", element: <Projects /> },
  { path: "/projects/new", element: <CreateProject /> },
  { path: "/projects/details/:projectId", element: <ProjectDetails /> },
  { path: "/projects/roadmap/:projectId", element: <ReleaseRoadmapPage /> },
  { path: "/settings/integrations", element: <IntegrationsSettingsPage /> },
];

/**
 * Auth and OAuth callback routes are not used in the static demo; send users to the dashboard.
 */
const demoRedirect = <Navigate to="/dashboard" replace />;

export const Routes = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <RouterRoutes>
        <Route path="/login" element={demoRedirect} />
        <Route path="/auth/callback" element={demoRedirect} />
        <Route path="/integrations/callback" element={demoRedirect} />

        <Route element={<MainLayout />}>
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route path="/projects/:projectSlug" element={<ClientLink />} />
        <Route path="/iframe-preview/*" element={<></>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

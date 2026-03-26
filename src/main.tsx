import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import { CorporationsDirectoryPage } from "./pages/CorporationsDirectoryPage.tsx";
import { CorporationProfileOverviewPage } from "./pages/CorporationProfileOverviewPage.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/corporations" element={<CorporationsDirectoryPage />} />
      <Route
        path="/corporations/:corporationId"
        element={<CorporationProfileOverviewPage />}
      />
    </Routes>
  </BrowserRouter>,
);

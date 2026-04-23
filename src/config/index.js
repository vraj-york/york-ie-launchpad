/**
 * Vite app config. The static Launchpad demo does not require a real API, Hub, or profile-pic key.
 * Optional env vars (see `.env.example`) override defaults for custom deployments.
 */
const defaultOrigin = import.meta.env.DEV
  ? `http://localhost:5173`
  : (typeof window !== "undefined" ? window.location.origin : "");

const config = {
  API_URL: import.meta.env.VITE_API_URL || defaultOrigin,
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || defaultOrigin,
  HUB_API_URL: (import.meta.env.VITE_HUB_API_URL || "").replace(/\/$/, ""),
  HUB_OAUTH_REDIRECT_URL: (
    import.meta.env.VITE_HUB_OAUTH_REDIRECT_URL ||
    `${(import.meta.env.VITE_FRONTEND_URL || defaultOrigin).replace(/\/$/, "")}/auth/callback`
  ).replace(/\/$/, ""),
  HUB_PROFILE_PIC_API_KEY: import.meta.env.VITE_HUB_PROFILE_PIC_API_KEY,
  NODE_ENV: import.meta.env.VITE_MODE || "development",
  isProduction: import.meta.env.VITE_MODE === "production",
};

export default config;

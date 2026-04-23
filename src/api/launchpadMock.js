/**
 * In-memory API for the static Launchpad demo. No network calls.
 */

const delay = (ms = 8) => new Promise((r) => setTimeout(r, ms));

const SVG_DATA_DEMO = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 40'><text x='8' y='26' font-size='14' fill='teal'>Demo</text></svg>",
)}`;

let idSeq = 10000;

const STORAGE_KEYS = ["token", "access_token", "user", "cognito_refresh_token"];
const LEGACY_LOCAL_STORAGE_KEYS = [
  "authToken",
  "persist:auth",
  "hasCompletedTour",
  "meetings",
];

const roadmapStore = new Map();
const changelogs = new Map();
const chatBySlugRelease = new Map();

function chatKey(slug, releaseId) {
  return `${String(slug).trim()}:${Number(releaseId)}`;
}

function makeVersion(overrides = {}) {
  const id = overrides.id ?? ++idSeq;
  return {
    id,
    version: overrides.version ?? "1.0.0",
    isActive: overrides.isActive !== undefined ? overrides.isActive : true,
    buildUrl: overrides.buildUrl ?? "https://example.com",
    releaseId: overrides.releaseId != null ? Number(overrides.releaseId) : 1001,
    roadmapItems: Array.isArray(overrides.roadmapItems) ? overrides.roadmapItems : [],
    ...overrides,
  };
}

function makeRelease(overrides = {}) {
  const id = overrides.id ?? 1001;
  const v = makeVersion({ ...overrides.versions?.[0], releaseId: id, id: 101 });
  return {
    id,
    projectId: overrides.projectId ?? 1,
    name: overrides.name ?? "1.0.0",
    status: overrides.status ?? "active",
    description: overrides.description ?? "First release (demo).",
    releaseDate: overrides.releaseDate ?? "2025-12-01",
    startDate: overrides.startDate ?? "2025-10-15",
    actualReleaseDate: overrides.actualReleaseDate ?? null,
    actualReleaseNotes: overrides.actualReleaseNotes ?? "",
    isMvp: overrides.isMvp !== undefined ? overrides.isMvp : true,
    clientReleaseNote: overrides.clientReleaseNote ?? "Welcome to the client link demo.",
    clientReviewAiSummary: overrides.clientReviewAiSummary ?? "• Check navigation\n• Check hero",
    showClientReviewSummary: overrides.showClientReviewSummary !== undefined ? overrides.showClientReviewSummary : true,
    clientReviewAiGenerationContext: overrides.clientReviewAiGenerationContext ?? null,
    lockedBy: overrides.lockedBy ?? null,
    skipReason: overrides.skipReason ?? null,
    versions: overrides.versions?.length ? overrides.versions : [v],
    ...overrides,
  };
}

function seedState() {
  const release1 = makeRelease({ id: 1001, projectId: 1, name: "1.0.0" });
  const release2 = makeRelease({
    id: 1002,
    projectId: 1,
    name: "1.0.1",
    status: "draft",
    versions: [makeVersion({ id: 102, version: "1.0.1", isActive: false, releaseId: 1002, buildUrl: "https://example.com" })],
  });

  const project1 = {
    id: 1,
    name: "Acme Redesign",
    slug: "demo-acme",
    status: "Active",
    description: "Static demo data — this workspace is not connected to a live API.",
    projectId: "hub-5001",
    fromScratch: false,
    scratchAgentStatus: null,
    scratchVersionStatus: null,
    githubUsername: "acme",
    githubToken: null,
    jiraBaseUrl: null,
    jiraUsername: null,
    jiraProjectKey: "AC",
    jiraApiToken: null,
    gitRepoPath: "https://github.com/acme/platform",
    developmentRepoUrl: "https://github.com/acme/development",
    useOAuthGithub: true,
    useOAuthJira: false,
    assignedUserEmails: "demo@example.com",
    stakeholderEmails: "stakeholder@example.com",
    createdBy: { id: 1, name: "Demo User", email: "demo@example.com" },
    createdById: 1,
    versions: [release1.versions[0]],
    releases: [release1, release2],
  };

  const project2 = {
    id: 2,
    name: "Beta Corp Portal",
    slug: "beta-corp",
    status: "Development",
    description: "Second demo project with mock data.",
    projectId: "hub-5002",
    fromScratch: false,
    scratchAgentStatus: null,
    scratchVersionStatus: null,
    assignedUserEmails: "demo@example.com",
    stakeholderEmails: null,
    createdBy: { id: 1, name: "Demo User", email: "demo@example.com" },
    createdById: 1,
    gitRepoPath: "https://github.com/betacorp/web",
    developmentRepoUrl: "https://github.com/betacorp/dev",
    versions: [makeVersion({ id: 201, version: "2.0.0", releaseId: 2001 })],
    releases: [
      makeRelease({
        id: 2001,
        projectId: 2,
        name: "2.0.0",
        status: "active",
        versions: [makeVersion({ id: 201, version: "2.0.0", isActive: true, releaseId: 2001 })],
      }),
    ],
  };

  return {
    projects: [project1, project2],
  };
}

const state = seedState();

function findProjectById(id) {
  return state.projects.find((p) => String(p.id) === String(id));
}

function publicPayloadFromProject(p) {
  if (!p) return null;
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    versions: p.versions,
    releases: p.releases,
  };
}

function ensureRoadmapEntries(projectId) {
  if (!roadmapStore.has(String(projectId))) {
    roadmapStore.set(String(projectId), []);
  }
  return roadmapStore.get(String(projectId));
}

// --- auth storage (no network) ---

export function clearAuthStorageOnly() {
  [...STORAGE_KEYS, ...LEGACY_LOCAL_STORAGE_KEYS].forEach((k) =>
    localStorage.removeItem(k),
  );
}

export function clearLegacyLocalStorageKeys() {
  LEGACY_LOCAL_STORAGE_KEYS.forEach((k) => localStorage.removeItem(k));
}

export async function hubLogout() {
  await delay(0);
}

export async function refreshAppToken() {
  return null;
}

export async function tryProactiveRefresh() {
  return false;
}

let refreshCheckTimerId = null;

export function startTokenRefreshTimer() {
  if (refreshCheckTimerId != null) clearInterval(refreshCheckTimerId);
  refreshCheckTimerId = setInterval(() => {
    if (!localStorage.getItem("cognito_refresh_token")) {
      clearInterval(refreshCheckTimerId);
      refreshCheckTimerId = null;
    }
  }, 60_000);
}

export function stopTokenRefreshTimer() {
  if (refreshCheckTimerId != null) {
    clearInterval(refreshCheckTimerId);
    refreshCheckTimerId = null;
  }
}

export const figmaComplete = async () => ({ ok: true });

export const fetchManagers = async () => {
  await delay();
  return [
    { id: 1, name: "Demo Manager", email: "manager@example.com" },
  ];
};

const integrationsDemo = {
  github: { connections: [{ id: "gh-conn-1", login: "acme" }] },
  bitbucket: { connections: [] },
  jira: { connections: [{ id: "jira-conn-1", name: "Acme Jira" }] },
  figma: { connections: [] },
};

function clone(x) {
  return typeof structuredClone === "function"
    ? structuredClone(x)
    : JSON.parse(JSON.stringify(x));
}

export const fetchIntegrationsStatus = async () => {
  await delay();
  return clone(integrationsDemo);
};

export const fetchCursorIntegrationStatus = async () => {
  await delay();
  return { hasGithubPat: false, cloudAgent: { connected: false } };
};

export const syncCursorGithubPatFromOAuth = async () => ({ ok: true });
export const saveCursorGithubPatManual = async () => ({ ok: true });

const oauthHashUrl = () =>
  typeof window !== "undefined"
    ? `${window.location.origin}${window.location.pathname}#demo-oauth-disabled`
    : "#demo-oauth-disabled";

export const getGithubOAuthAuthorizeUrl = async () => {
  await delay();
  return oauthHashUrl();
};
export const getJiraOAuthAuthorizeUrl = async () => {
  await delay();
  return oauthHashUrl();
};
export const getBitbucketOAuthAuthorizeUrl = async () => {
  await delay();
  return oauthHashUrl();
};
export const getFigmaOAuthAuthorizeUrl = async () => {
  await delay();
  return oauthHashUrl();
};

export const disconnectGithubIntegration = async () => {};
export const disconnectBitbucketIntegration = async () => {};
export const disconnectJiraIntegration = async () => {};
export const disconnectFigmaIntegration = async () => {};

export const fetchGithubReposPage = async () => {
  await delay();
  return {
    repos: [{ fullName: "acme/platform" }, { fullName: "acme/development" }],
    hasMore: false,
  };
};

export const fetchBitbucketReposPage = async () => {
  await delay();
  return { repos: [], hasMore: false };
};

export const fetchJiraProjectsForConnection = async () => {
  await delay();
  return {
    jiraBaseUrl: "https://acme.atlassian.net",
    projects: [{ key: "AC", name: "Acme" }],
  };
};

export const fetchCreatorIntegrationConnections = async (projectId) => {
  await delay();
  void projectId;
  return clone(integrationsDemo);
};

export const createProject = async (projectData) => {
  await delay();
  const id = ++idSeq;
  const name = String(projectData?.name || "New project").trim() || "New project";
  const slug = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 40) || `project-${id}`;
  const r0 = makeRelease({ id: id + 1000, projectId: id, name: "1.0.0" });
  const p = {
    id,
    name,
    slug,
    status: "Active",
    description: projectData?.description ?? "",
    projectId: String(projectData?.projectId ?? ""),
    fromScratch: Boolean(projectData?.isScratch),
    scratchAgentStatus: null,
    scratchVersionStatus: null,
    createdBy: { id: 1, name: "Demo User", email: "demo@example.com" },
    createdById: 1,
    assignedUserEmails: projectData?.assignedUserEmails ?? "demo@example.com",
    stakeholderEmails: projectData?.stakeholderEmails ?? null,
    gitRepoPath: projectData?.gitRepoPath || "",
    developmentRepoUrl: projectData?.developmentRepoUrl || "",
    versions: [r0.versions[0]],
    releases: [r0],
  };
  state.projects.push(p);
  if (projectData?.isScratch) {
    p.fromScratch = true;
    p.scratchAgentStatus = "QUEUED";
    return { id, scratchAgentStarted: true, fromScratch: true };
  }
  return { id, scratchAgentStarted: false, fromScratch: false };
};

export const fetchProjects = async () => {
  await delay();
  return state.projects.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    status: p.status,
    versions: p.versions,
  }));
};

function mergeProjectView(p) {
  if (!p) return null;
  const rel = p.releases;
  return { ...p, releases: Array.isArray(rel) ? rel : [] };
}

export const fetchProjectById = async (projectId) => {
  await delay();
  const p = findProjectById(projectId);
  if (!p) throw { error: "Project not found" };
  return mergeProjectView(p);
};

export const fetchProjectBySlug = async (slug) => {
  await delay();
  const p = state.projects.find(
    (x) => String(x.slug).toLowerCase() === String(slug).trim().toLowerCase(),
  );
  if (!p) throw { error: "Project not found" };
  return mergeProjectView(p);
};

export const postMigrateFrontendAgent = async () => ({
  id: "run-demo-1",
  message: "Demo: agent would start here",
});

const catalogFolders = [
  { folderName: "typescript", displayName: "TypeScript" },
  { folderName: "react", displayName: "React" },
];

export const fetchCursorRulesCatalog = async (projectId) => {
  await delay();
  void projectId;
  return { folders: catalogFolders };
};

let customRules = [{ folderName: "acme-standards", body: "Example rule body" }];

export const fetchProjectCustomCursorRules = async (projectId) => {
  await delay();
  void projectId;
  return { rules: customRules };
};

export const createProjectCustomCursorRule = async (projectId, { folderName, body }) => {
  await delay();
  void projectId;
  const f = String(folderName || "").trim();
  const idx = customRules.findIndex((r) => r.folderName === f);
  if (idx >= 0) customRules[idx] = { ...customRules[idx], body };
  else customRules = [...customRules, { folderName: f, body: body || "" }];
  return { ok: true };
};

export const importCursorRulesFolders = async (projectId, folders) => {
  await delay();
  void projectId;
  return { skipped: true, filesWritten: 0, developmentRepoUrl: "https://github.com/acme/development" };
};

export const startProjectScratchAgent = async (projectId, prompt) => {
  await delay();
  const p = findProjectById(projectId);
  if (p) {
    p.scratchAgentStatus = "QUEUED";
  }
  void prompt;
  return { ok: true };
};

export const fetchReleases = async (projectId) => {
  await delay();
  const p = findProjectById(projectId);
  if (!p) throw { error: "Project not found" };
  return clone(p.releases || []);
};

export const createRelease = async (releaseData) => {
  await delay();
  const projectId = releaseData?.projectId;
  const p = findProjectById(projectId);
  if (!p) throw { error: "Project not found" };
  const id = ++idSeq;
  const rel = makeRelease({ id, projectId, name: releaseData?.name, ...releaseData });
  p.releases = [...(p.releases || []), rel];
  return rel;
};

export const toggleReleaseLock = async (releaseId) => {
  await delay();
  for (const p of state.projects) {
    const r = (p.releases || []).find((x) => String(x.id) === String(releaseId));
    if (r) {
      r.status = "locked";
      return r;
    }
  }
  return { ok: true };
};

export const publicLockRelease = async (releaseId) => {
  await delay();
  return toggleReleaseLock(releaseId);
};

export const clientLinkSendFollowup = async (slug, releaseId, text) => {
  await delay(20);
  const key = chatKey(slug, releaseId);
  const list = chatBySlugRelease.get(key) || [];
  const id = list.length + 1;
  const t = String(text || "").trim() || "[demo] (empty message)";
  const userRow = {
    id,
    role: "user",
    text: t,
    appliedCommitSha: "demo" + id,
    isMerged: true,
    mergedAt: new Date().toISOString(),
  };
  chatBySlugRelease.set(key, [...list, userRow]);
  return { ok: true, messages: [userRow] };
};

export const clientLinkAiPreviewSvg = async () => {
  await delay(10);
  return { ok: true, dataUrl: SVG_DATA_DEMO, error: null };
};

export const clientLinkFetchAgentStatus = async () => {
  await delay(5);
  return {
    status: "FINISHED",
    activity: "Demo: no cloud agent",
    mergeConfirmationPending: false,
    awaitingLaunchpadConfirmation: false,
    deferLaunchpadMerge: false,
  };
};

export const clientLinkFetchExecutionSummary = async () => {
  await delay(5);
  return { pendingMergeConfirmation: false, text: "Demo execution summary" };
};

export const clientLinkFetchChatMessages = async (slug, releaseId) => {
  await delay(5);
  const key = chatKey(slug, releaseId);
  const list = chatBySlugRelease.get(key) || [];
  return { messages: list };
};

export const clientLinkRevertMerge = async () => {
  await delay(10);
  return { ok: true };
};

export const clientLinkRefreshLiveBuild = async () => {
  await delay(15);
  return { ok: true, buildUrl: "https://example.com" };
};

export const uploadToRelease = async () => {
  await delay(20);
  return { ok: true, version: { version: "1.0.0-demo" } };
};

export const revertActiveReleaseToBaseline = async (projectId) => {
  await delay(10);
  const p = findProjectById(projectId);
  return { version: p?.versions?.[0] ?? { version: "1.0.0" } };
};

export const generateJiraTickets = async () => {
  await delay(10);
  return { count: 0, message: "Demo: Jira is not connected" };
};

export const updateProject = async (projectId, projectData) => {
  await delay();
  const p = findProjectById(projectId);
  if (!p) throw { error: "Project not found" };
  Object.assign(p, projectData);
  return mergeProjectView(p);
};

export async function exchangeHubAuthCode() {
  await delay(10);
  const user = { id: 1, name: "Demo User", email: "demo@example.com" };
  localStorage.setItem("token", "demo-token");
  localStorage.setItem("user", JSON.stringify(user));
  return { token: "demo-token", user };
}

export const activateReleaseVersions = async (projectId, versionId) => {
  await delay(10);
  const p = findProjectById(projectId);
  if (p) {
    for (const v of p.versions || []) v.isActive = false;
    const v = (p.versions || []).find((x) => String(x.id) === String(versionId));
    if (v) v.isActive = true;
  }
  return { ok: true };
};

export const switchProjectVersion = async (projectId, versionId) => {
  await delay(10);
  const p = findProjectById(projectId);
  const v = p?.versions?.find((x) => String(x.id) === String(versionId));
  return { buildUrl: v?.buildUrl || "https://example.com" };
};

export const fetchPublicProjectBySlug = async (slug) => {
  await delay(10);
  const p = state.projects.find(
    (x) => String(x.slug) === String(slug).trim(),
  );
  if (!p) throw { error: "Not found" };
  return publicPayloadFromProject(mergeProjectView(p));
};

export const getProjectDataPublically = fetchPublicProjectBySlug;

export async function fetchHubProfilePicSignedUrl() {
  return null;
}

export const fetchExternalHubProjects = async () => {
  await delay();
  return [
    { id: "hub-ext-1", title: "External CRM Rollout" },
    { id: "hub-ext-2", title: "Partner Portal" },
  ];
};

export const updateReleaseStatus = async (releaseId, status, reasonOrOptions = "") => {
  await delay();
  const reason =
    typeof reasonOrOptions === "string"
      ? reasonOrOptions
      : (reasonOrOptions && reasonOrOptions.reason) || "";
  for (const p of state.projects) {
    const r = (p.releases || []).find((x) => String(x.id) === String(releaseId));
    if (r) {
      r.status = status;
      if (reason) r.statusReason = reason;
      return r;
    }
  }
  return { ok: true };
};

export const patchRelease = async (releaseId, payload) => {
  await delay();
  for (const p of state.projects) {
    const r = (p.releases || []).find((x) => String(x.id) === String(releaseId));
    if (r) {
      Object.assign(r, payload);
      return r;
    }
  }
  return { ok: true };
};

export const fetchReleaseChangelog = async (releaseId) => {
  await delay();
  const k = String(releaseId);
  if (!changelogs.has(k)) {
    changelogs.set(k, [
      {
        at: new Date().toISOString(),
        actor: "demo@example.com",
        field: "status",
        from: "draft",
        to: "active",
      },
    ]);
  }
  return changelogs.get(k) || [];
};

export const regenerateReleaseReviewSummary = async (releaseId) => {
  await delay(15);
  for (const p of state.projects) {
    const r = (p.releases || []).find((x) => String(x.id) === String(releaseId));
    if (r) {
      r.clientReviewAiSummary = "• Demo checklist line 1\n• Demo checklist line 2";
      return { release: r };
    }
  }
  return { ok: true };
};

/** Roadmap items shown on release management (previously missing from API). */
export const getRoadmapItemsByProjectId = async (projectId) => {
  await delay(8);
  return ensureRoadmapEntries(projectId);
};

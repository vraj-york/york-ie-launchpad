// All test constants live here. Never hardcode these values inside spec files.

/** This app is a client-only demo — no real login. Keys kept for fixture compatibility. */
export const TEST_USERS = {
  validUser: { email: 'sarah.kim@firmname.com', password: 'n/a' },
  adminUser: { email: 'sarah.kim@firmname.com', password: 'n/a' },
  invalidUser: { email: 'notauser@example.com', password: 'wrongpassword' },
};

export const INVALID_INPUTS = {
  emails: ['notanemail', '@nodomain.com', 'no@', 'spaces @test.com', ''],
  passwords: ['123', 'ab', '', ' '],
  longString: 'a'.repeat(256),
  sqlInjection: "' OR 1=1; --",
  xssPayload: '<script>alert("xss")</script>',
  specialChars: '!@#$%^&*()_+{}|:<>?',
  whitespaceOnly: ' ',
};

export const ROUTES = {
  home: '/',
  projects: '/projects',
  clients: '/clients',
  templates: '/templates',
  tasks: '/tasks',
  planning: '/planning',
  notifications: '/notifications',
  help: '/help',
  aiNotetaker: '/ai-notetaker',
  aiNotetakerSettings: '/ai-notetaker/settings',
  aiNotetakerReview: (id: string) => `/ai-notetaker/review/${id}`,
  aiNotetakerMeeting: (id: string) => `/ai-notetaker/meeting/${id}`,
  aiAgents: '/ai-agents',
} as const;

export const SAMPLE_MEETING_IDS = {
  suggestionsReady: 'm1',
  reviewed: 'm2',
  invalid: 'does-not-exist',
} as const;

export const MOCK_PROJECT_NAME = 'Q1 2024 Tax Return';
export const MOCK_CLIENT_NAME = 'Baker Dental Group';
export const MOCK_TEMPLATE_NAME = 'Monthly Bookkeeping';
export const MOCK_TASK_NAME = 'Prepare federal return';

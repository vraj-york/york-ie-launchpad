// =============================================================================
// MASTER TEST RUNNER — automation-tests/index.ts
// Run all tests: npm run test:auto
// Run one folder: npx playwright test automation-tests/[folder]/
// View report: npm run test:auto:report
//
// Playwright auto-discovers *.spec.ts under automation-tests/.
// Imports below document the suite (optional for discovery).
// =============================================================================

// App navigation
import './app-navigation/navigation.happy-path.spec';
import './app-navigation/navigation.edge-cases.spec';
import './app-navigation/navigation.error-states.spec';

// Projects
import './projects/projects.happy-path.spec';
import './projects/projects.edge-cases.spec';
import './projects/projects.error-states.spec';

// Clients
import './clients/clients.happy-path.spec';
import './clients/clients.edge-cases.spec';
import './clients/clients.error-states.spec';

// Templates
import './templates/templates.happy-path.spec';
import './templates/templates.edge-cases.spec';
import './templates/templates.error-states.spec';

// Tasks
import './tasks/tasks.happy-path.spec';
import './tasks/tasks.edge-cases.spec';
import './tasks/tasks.error-states.spec';

// Planning
import './planning/planning.happy-path.spec';
import './planning/planning.edge-cases.spec';
import './planning/planning.error-states.spec';

// Notifications
import './notifications/notifications.happy-path.spec';
import './notifications/notifications.edge-cases.spec';
import './notifications/notifications.error-states.spec';

// Help & Support
import './help-support/help-support.happy-path.spec';
import './help-support/help-support.edge-cases.spec';
import './help-support/help-support.error-states.spec';

// AI Notetaker
import './ai-notetaker/ai-notetaker.happy-path.spec';
import './ai-notetaker/ai-notetaker.edge-cases.spec';
import './ai-notetaker/ai-notetaker.error-states.spec';

// AI Agents
import './ai-agents/ai-agents.happy-path.spec';
import './ai-agents/ai-agents.edge-cases.spec';
import './ai-agents/ai-agents.error-states.spec';

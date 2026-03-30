import { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Card } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { SuperAdminLayout } from '../components/layout/SuperAdminLayout';
import { ExportReportButton } from '../components/common/ExportReportButton';
import { SuperAdminPersonaDisplay } from '../components/common/SuperAdminPersonaDisplay';
import {
  fetchDashboardData,
  selectDashboardData,
  selectDashboardLoading,
  selectIsDashboardEmpty,
} from '../store/slices/dashboardSlice';
import {
  selectCurrentPersonaType,
  selectActiveThemePreference,
} from '../store/slices/authSlice';
import { setActiveSidebarItem } from '../store/slices/uiSlice';
import { DashboardMetricCard } from '../components/dashboard/DashboardMetricCard';
import { LineChart } from '../components/dashboard/LineChart';
import { mockTimeAggregationOptions } from '../data/mockTimeAggregationOptions';

const PLATFORM_METRIC_KEYS = [
  { key: 'activeUsers', title: 'Active Users' },
  { key: 'activeCompanies', title: 'Active Companies' },
  { key: 'activeTeams', title: 'Active Teams' },
  { key: 'loginSessions', title: 'Login Sessions' },
  { key: 'biSpyCoachingSessions', title: 'BiSPy AI Coaching Sessions' },
  { key: 'bspAssessmentCompliance', title: 'BSP Assessment Compliance' },
  { key: 'sessionDuration', title: 'Session Duration' },
  { key: 'peakConcurrentUsers', title: 'Peak Concurrent Users' },
  { key: 'avgDailyActiveUsers', title: 'Avg. Daily Active Users' },
];

function themePreferenceToDisplay(preference) {
  if (preference === 'dark') return 'Dark Theme';
  return 'Light Theme';
}

export function DashboardPage() {
  const dispatch = useDispatch();
  const dashboardData = useSelector(selectDashboardData);
  const dashboardLoading = useSelector(selectDashboardLoading);
  const isEmptyState = useSelector(selectIsDashboardEmpty);
  const personaType = useSelector(selectCurrentPersonaType);
  const themePreference = useSelector(selectActiveThemePreference);
  const [chartAggregation, setChartAggregation] = useState(
    () => mockTimeAggregationOptions[0]?.value ?? 'monthly'
  );
  const handleChartAggregationChange = useCallback((value) => {
    setChartAggregation(value);
  }, []);

  useEffect(() => {
    dispatch(setActiveSidebarItem('dashboard'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const handleExportReport = () => {
    if (!isEmptyState) {
      // Placeholder: trigger export (e.g. CSV/PDF)
    }
  };

  return (
    <SuperAdminLayout>
      <Box component="main" role="main" sx={{ py: 0, px: 0 }}>
        <Box sx={{ mb: 3 }}>
          <SuperAdminPersonaDisplay
            personaType={personaType ?? 'Super Admin Persona'}
            themePreference={themePreferenceToDisplay(themePreference)}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                fontWeight: 600,
                fontSize: 16,
                color: 'rgba(47, 65, 74, 1)',
                mb: 0.5,
              }}
            >
              Dashboard Overview
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                fontWeight: 400,
                fontSize: 14,
                color: 'rgba(56, 89, 102, 1)',
              }}
            >
              Monitor and manage your entire platform
            </Typography>
          </Box>
          <ExportReportButton
            onClick={handleExportReport}
            disabled={isEmptyState}
            aria-label="Export dashboard report"
          />
        </Box>

        <Card
          sx={{
            background: 'rgba(255, 255, 255, 1)',
            borderRadius: 2,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
            minHeight: 320,
            display: 'flex',
            flexDirection: 'column',
            alignItems: dashboardLoading || isEmptyState ? 'center' : 'stretch',
            justifyContent: dashboardLoading || isEmptyState ? 'center' : 'flex-start',
          }}
        >
          {dashboardLoading ? (
            <Typography
              sx={{
                fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                fontWeight: 400,
                fontSize: 14,
                color: 'rgba(56, 89, 102, 1)',
              }}
            >
              Loading...
            </Typography>
          ) : isEmptyState ? (
            <Box
              role="status"
              aria-live="polite"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                py: 6,
                px: 3,
              }}
            >
              <Typography
                component="p"
                sx={{
                  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                  fontWeight: 600,
                  fontSize: 20,
                  color: 'rgba(47, 65, 74, 1)',
                  textAlign: 'center',
                }}
              >
                No metrics available
              </Typography>
              <Typography
                component="p"
                sx={{
                  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                  fontWeight: 500,
                  fontSize: 14,
                  color: 'rgba(73, 130, 145, 1)',
                  textAlign: 'center',
                }}
              >
                Metrics will appear here once data is generated.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
              {dashboardData && (
                <>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                      gap: 2,
                    }}
                  >
                    {PLATFORM_METRIC_KEYS.map(({ key, title }) => {
                      const m = dashboardData.metrics?.[key];
                      if (!m) return null;
                      return (
                        <DashboardMetricCard
                          key={key}
                          titleId={`platform-dashboard-metric-${key}`}
                          title={title}
                          value={m.value}
                          description={m.description}
                          badgeLabel={m.badgeLabel}
                          badgeType={m.badgeType}
                        />
                      );
                    })}
                  </Box>
                  <LineChart
                    data={dashboardData.chart ?? []}
                    timeAggregationOptions={mockTimeAggregationOptions.map((o) => ({
                      value: o.value,
                      label: o.label,
                    }))}
                    selectedTimeAggregation={chartAggregation}
                    onTimeAggregationChange={handleChartAggregationChange}
                    chartTitle="Login Activity"
                  />
                </>
              )}
            </Box>
          )}
        </Card>
      </Box>
    </SuperAdminLayout>
  );
}

import { Link } from 'react-router-dom'
import dashboardCopy from '../assets/dashboard-page.json'
import './DashboardPage.css'

export function DashboardPage() {
  const { breadcrumbLabel, pageHeading } = dashboardCopy

  return (
    <div className="dashboard-shell">
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-header__crumb-wrap">
            <nav aria-label="Breadcrumb" className="dashboard-breadcrumb-nav">
              <ol className="dashboard-breadcrumb-list">
                <li className="dashboard-breadcrumb-item">
                  <span className="truncate text-sm font-medium text-text-foreground capitalize">
                    {breadcrumbLabel}
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </header>
        <div className="dashboard-body">
          <h1 className="dashboard-page-title">{pageHeading}</h1>
          <p className="dashboard-page-sub">
            <Link to="/">← Back to home</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

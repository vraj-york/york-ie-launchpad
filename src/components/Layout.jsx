import { NavLink, useLocation } from 'react-router-dom'
import {
  IconHome,
  IconSearch,
  IconCompass,
  IconReels,
  IconPaperPlane,
} from './Icons'
import './Layout.css'

const navClass = ({ isActive }) =>
  `sidebar-link${isActive ? ' sidebar-link--active' : ''}`

export default function Layout({ children }) {
  const location = useLocation()
  const homeActive = location.pathname === '/'

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Main">
        <div className="sidebar-brand">
          <span className="sidebar-logo" aria-hidden>
            Gram
          </span>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" className={navClass} end>
            <IconHome filled={homeActive} />
            <span>Home</span>
          </NavLink>
          <button type="button" className="sidebar-link sidebar-link--btn">
            <IconSearch />
            <span>Search</span>
          </button>
          <NavLink to="/explore" className={navClass}>
            <IconCompass />
            <span>Explore</span>
          </NavLink>
          <NavLink to="/reels" className={navClass}>
            <IconReels />
            <span>Reels</span>
          </NavLink>
          <button type="button" className="sidebar-link sidebar-link--btn">
            <IconPaperPlane />
            <span>Messages</span>
          </button>
          <NavLink to="/profile" className={navClass}>
            <span className="sidebar-avatar-wrap">
              <img src="https://picsum.photos/seed/me/96/96" alt="" width={28} height={28} className="sidebar-avatar" />
            </span>
            <span>Profile</span>
          </NavLink>
        </nav>
      </aside>

      <main className="app-main">{children}</main>

      <nav className="mobile-nav" aria-label="Mobile">
        <NavLink to="/" className={navClass} end>
          <IconHome filled={homeActive} size={26} />
          <span className="sr-only">Home</span>
        </NavLink>
        <NavLink to="/explore" className={navClass}>
          <IconCompass size={26} />
          <span className="sr-only">Explore</span>
        </NavLink>
        <NavLink to="/reels" className={navClass}>
          <IconReels size={26} />
          <span className="sr-only">Reels</span>
        </NavLink>
        <button type="button" className="sidebar-link mobile-nav-btn">
          <IconPaperPlane size={26} />
          <span className="sr-only">Messages</span>
        </button>
        <NavLink to="/profile" className={navClass}>
          <img src="https://picsum.photos/seed/me/96/96" alt="" width={26} height={26} className="mobile-nav-avatar" />
          <span className="sr-only">Profile</span>
        </NavLink>
      </nav>
    </div>
  )
}

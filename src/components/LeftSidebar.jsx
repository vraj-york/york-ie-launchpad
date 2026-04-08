import './Sidebar.css'
import {
  FriendsIcon,
  VideoIcon,
  StoreIcon,
  GroupsIcon,
  GamingIcon,
} from './Icons'

const shortcuts = [
  { label: 'College Friends', color: '#1876f2' },
  { label: 'Meme Hub', color: '#e41e3f' },
  { label: 'Design Inspiration', color: '#f7b928' },
]

export function LeftSidebar() {
  return (
    <aside className="fb-sidebar fb-sidebar--left" aria-label="Shortcuts and navigation">
      <nav>
        <ul className="fb-sidebar-list">
          <li>
            <a href="#" className="fb-sidebar-link">
              <span className="fb-avatar fb-avatar--md">A</span>
              <span className="fb-sidebar-link__text">Anna Johnson</span>
            </a>
          </li>
          <li>
            <a href="#" className="fb-sidebar-link">
              <span className="fb-sidebar-icon-wrap">
                <FriendsIcon />
              </span>
              <span className="fb-sidebar-link__text">Friends</span>
            </a>
          </li>
          <li>
            <a href="#" className="fb-sidebar-link">
              <span className="fb-sidebar-icon-wrap fb-sidebar-icon-wrap--gray">
                <VideoIcon />
              </span>
              <span className="fb-sidebar-link__text">Most recent</span>
            </a>
          </li>
          <li>
            <a href="#" className="fb-sidebar-link">
              <span className="fb-sidebar-icon-wrap fb-sidebar-icon-wrap--gray">
                <GroupsIcon />
              </span>
              <span className="fb-sidebar-link__text">Groups</span>
            </a>
          </li>
          <li>
            <a href="#" className="fb-sidebar-link">
              <span className="fb-sidebar-icon-wrap fb-sidebar-icon-wrap--gray">
                <StoreIcon />
              </span>
              <span className="fb-sidebar-link__text">Marketplace</span>
            </a>
          </li>
          <li>
            <a href="#" className="fb-sidebar-link">
              <span className="fb-sidebar-icon-wrap fb-sidebar-icon-wrap--gray">
                <VideoIcon />
              </span>
              <span className="fb-sidebar-link__text">Watch</span>
            </a>
          </li>
          <li>
            <a href="#" className="fb-sidebar-link">
              <span className="fb-sidebar-icon-wrap fb-sidebar-icon-wrap--gray">
                <GamingIcon />
              </span>
              <span className="fb-sidebar-link__text">Gaming Video</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="fb-sidebar-section">
        <div className="fb-sidebar-heading">
          <span>Your shortcuts</span>
        </div>
        <ul className="fb-sidebar-list">
          {shortcuts.map((s) => (
            <li key={s.label}>
              <a href="#" className="fb-sidebar-link">
                <span
                  className="fb-shortcut-icon"
                  style={{ background: s.color }}
                  aria-hidden
                />
                <span className="fb-sidebar-link__text">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="fb-sidebar-foot">
        <p>
          <a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Advertising</a> ·{' '}
          <a href="#">Ad Choices</a>
        </p>
        <p>Facebook replica · UI demo only</p>
      </footer>
    </aside>
  )
}

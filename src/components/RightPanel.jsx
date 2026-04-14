import { currentUser, suggestions } from '../data/mockData'
import './RightPanel.css'

export default function RightPanel() {
  return (
    <aside className="right-panel" aria-label="Suggestions">
      <div className="right-profile">
        <img src={currentUser.avatar} alt="" width={44} height={44} className="right-profile-avatar" />
        <div className="right-profile-text">
          <span className="right-profile-user">{currentUser.username}</span>
          <span className="right-profile-name">{currentUser.fullName}</span>
        </div>
        <button type="button" className="right-link">
          Switch
        </button>
      </div>

      <div className="right-suggestions-head">
        <span className="right-suggestions-title">Suggestions for you</span>
        <button type="button" className="right-link right-link--muted">
          See all
        </button>
      </div>

      <ul className="right-suggestion-list">
        {suggestions.map((u) => (
          <li key={u.username} className="right-suggestion">
            <img src={u.avatar} alt="" width={36} height={36} className="right-suggestion-avatar" />
            <div className="right-suggestion-text">
              <span className="right-suggestion-user">{u.username}</span>
              <span className="right-suggestion-meta">{u.relation}</span>
            </div>
            <button type="button" className="right-follow">
              Follow
            </button>
          </li>
        ))}
      </ul>

      <footer className="right-footer">
        <p className="right-footer-links">
          About · Help · API · Jobs · Privacy · Terms · Locations
        </p>
        <p className="right-footer-copy">© 2026 Gram Lookalike</p>
      </footer>
    </aside>
  )
}

import './Sidebar.css'
import { VideoCallIcon, SearchSmallIcon } from './Icons'

const contacts = [
  { name: 'Sarah Miller', online: true },
  { name: 'James Chen', online: true },
  { name: 'Priya Patel', online: false },
  { name: 'Marcus Webb', online: true },
  { name: 'Elena Rossi', online: false },
]

const birthdays = [{ name: 'Alex Thompson' }]

const pages = [
  { label: 'Pages', sub: '9 notifications' },
  { label: 'Friend requests', sub: '' },
]

export function RightSidebar() {
  return (
    <aside className="fb-sidebar fb-sidebar--right" aria-label="Contacts and extras">
      <div className="fb-sponsored">
        <h3 className="fb-sidebar-heading fb-sidebar-heading--row">Sponsored</h3>
        <a href="#" className="fb-sponsored-item">
          <div className="fb-sponsored-thumb" />
          <div>
            <div className="fb-sponsored-title">Summer Sale — up to 40% off</div>
            <div className="fb-sponsored-domain">shop.example.com</div>
          </div>
        </a>
        <a href="#" className="fb-sponsored-item">
          <div className="fb-sponsored-thumb fb-sponsored-thumb--alt" />
          <div>
            <div className="fb-sponsored-title">Plan your next trip</div>
            <div className="fb-sponsored-domain">travel.demo</div>
          </div>
        </a>
      </div>

      <div className="fb-sidebar-section">
        <h3 className="fb-sidebar-heading fb-sidebar-heading--row">
          Contacts
          <span className="fb-contact-actions">
            <button type="button" title="New room" aria-label="New room">
              <VideoCallIcon />
            </button>
            <button type="button" title="Search contacts" aria-label="Search contacts">
              <SearchSmallIcon />
            </button>
          </span>
        </h3>
        <ul className="fb-sidebar-list fb-contact-list">
          {contacts.map((c) => (
            <li key={c.name}>
              <a href="#" className="fb-sidebar-link">
                <span className="fb-contact-avatar">
                  {c.name
                    .split(' ')
                    .map((p) => p[0])
                    .join('')}
                  {c.online && <span className="fb-online-dot" title="Online" />}
                </span>
                <span className="fb-sidebar-link__text">{c.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="fb-sidebar-section">
        <h3 className="fb-sidebar-heading">Group chats</h3>
        <ul className="fb-sidebar-list">
          {pages.map((p) => (
            <li key={p.label}>
              <a href="#" className="fb-sidebar-link">
                <span className="fb-avatar fb-avatar--md fb-avatar--muted">{p.label[0]}</span>
                <span>
                  <span className="fb-sidebar-link__text">{p.label}</span>
                  {p.sub && <span className="fb-sidebar-sub">{p.sub}</span>}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="fb-birthdays">
        <h3 className="fb-sidebar-heading">Birthdays</h3>
        <p className="fb-birthday-text">
          <strong>{birthdays[0].name}</strong> has a birthday today.
        </p>
      </div>
    </aside>
  )
}

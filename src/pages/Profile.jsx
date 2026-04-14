import { IconGrid } from '../components/Icons'
import { currentUser, posts } from '../data/mockData'
import './Profile.css'

export default function Profile() {
  return (
    <div className="page profile">
      <header className="profile-header">
        <div className="profile-avatar-wrap">
          <img src={currentUser.avatar} alt="" width={150} height={150} className="profile-avatar" />
        </div>
        <div className="profile-info">
          <div className="profile-row profile-row--title">
            <h1 className="profile-username">{currentUser.username}</h1>
            <button type="button" className="profile-btn profile-btn--primary">
              Edit profile
            </button>
            <button type="button" className="profile-btn">
              View archive
            </button>
          </div>
          <ul className="profile-stats">
            <li>
              <strong>24</strong> posts
            </li>
            <li>
              <strong>1,842</strong> followers
            </li>
            <li>
              <strong>512</strong> following
            </li>
          </ul>
          <div className="profile-bio">
            <p className="profile-name">{currentUser.fullName}</p>
            <p className="profile-tagline">Building things · Photos · Coffee</p>
            <a href="#" className="profile-link">
              link.example.com
            </a>
          </div>
        </div>
      </header>

      <div className="profile-tabs">
        <span className="profile-tab profile-tab--active">
          <IconGrid size={14} />
          Posts
        </span>
      </div>

      <div className="profile-grid">
        {posts.map((p) => (
          <button key={p.id} type="button" className="profile-tile">
            <img src={p.image} alt="" loading="lazy" />
          </button>
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <button key={`extra-${i}`} type="button" className="profile-tile">
            <img src={`https://picsum.photos/seed/pg${i}/600/600`} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  )
}

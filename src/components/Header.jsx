import './Header.css'
import {
  SearchIcon,
  HomeFilled,
  VideoIcon,
  StoreIcon,
  GroupsIcon,
  GamingIcon,
  GridIcon,
  MessengerIcon,
  BellIcon,
  ArrowDownIcon,
  FacebookLogo,
} from './Icons'

export function Header() {
  return (
    <header className="fb-header" role="banner">
      <div className="fb-header__left">
        <a href="#" className="fb-header__logo" aria-label="Facebook home">
          <FacebookLogo />
        </a>
        <label className="fb-search">
          <SearchIcon />
          <input type="search" placeholder="Search Facebook" className="fb-search__input" />
        </label>
      </div>

      <nav className="fb-header__nav" aria-label="Primary">
        <ul className="fb-header__nav-list">
          <li>
            <a href="#" className="fb-nav-chip fb-nav-chip--active" aria-current="page" title="Home">
              <HomeFilled />
            </a>
          </li>
          <li>
            <a href="#" className="fb-nav-chip" title="Watch">
              <VideoIcon />
            </a>
          </li>
          <li>
            <a href="#" className="fb-nav-chip" title="Marketplace">
              <StoreIcon />
            </a>
          </li>
          <li>
            <a href="#" className="fb-nav-chip" title="Groups">
              <GroupsIcon />
            </a>
          </li>
          <li>
            <a href="#" className="fb-nav-chip" title="Gaming">
              <GamingIcon />
            </a>
          </li>
        </ul>
      </nav>

      <div className="fb-header__right">
        <div className="fb-header__profile">
          <button type="button" className="fb-profile-btn">
            <span className="fb-avatar fb-avatar--sm">A</span>
            <span className="fb-profile-btn__name">Anna</span>
          </button>
        </div>
        <button type="button" className="fb-icon-btn" title="Menu" aria-label="Menu">
          <GridIcon />
        </button>
        <button type="button" className="fb-icon-btn" title="Messenger" aria-label="Messenger">
          <MessengerIcon />
        </button>
        <button type="button" className="fb-icon-btn" title="Notifications" aria-label="Notifications">
          <BellIcon />
        </button>
        <button type="button" className="fb-icon-btn fb-icon-btn--round" title="Account" aria-label="Account">
          <span className="fb-avatar fb-avatar--xs">A</span>
          <ArrowDownIcon />
        </button>
      </div>
    </header>
  )
}
